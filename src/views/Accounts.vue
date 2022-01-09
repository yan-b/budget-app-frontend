<template>
  <h1>Account Overview</h1>
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#entry-create-offcanvas" aria-controls="#entry-create-form">Create entry</button>
  <table class="table table-striped">
    <thead>
    <tr align="left">
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Balance2</th>
      <th class="col col-lg-1">Options</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="account in accounts" :key="account.id">
        <td scope="row" align="left"><a v-bind:href="'/entries/' + account.accountId">{{ account.accountName }}</a></td>
        <td scope="row" align="left">{{ account.accountType }}</td>
        <td scope="row" align="left">{{ account.accountBalance }}</td>
        <td scope="row" align="left"><div class="btn"><img src="../assets/trash.png" v-on:click="deleteAccount(account.accountId)" width="28" height="28"></div> <div class="btn"><img src="../assets/settings.png" v-on:click="updateAccount(account.accountId)" width="28" height="28"></div></td>
      </tr>
    </tbody>
  </table>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="entry-create-offcanvas" aria-labelledby="offcanvas-label">
    <div class="offcanvas-header">
      <h5 id="offcanvas-label">New Account</h5>
      <button type="button" id="close-offcanvas" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="text-start needs-validation" id="entry-create-form" novalidate>
        <div class="mb-3">
          <label for="entry-description" class="form-label">Entry description:</label>
          <input type="text" class="form-control" id="entry-description" v-model="entryDescription" required>
          <div class="invalid-feedback">
            Please provide a valid description for your entry.
          </div>
        </div>
        <div class="mb-3">
          <label for="entry-type" class="form-label">Entry type:</label>
          <select class="form-select" id="entry-type" v-model="entryType" required>
            <option value="" selected disabled>Choose...</option>
            <option value="BELASTUNG">Belastung</option>
            <option value="GUTSCHRIFT">Gutschrift</option>
          </select>
          <div class="invalid-feedback">
            Please enter a valid balance (e.g. 28.19 or 28,19).
          </div>
        </div>
        <div class="mb-3">
          <label for="entry-amount" class="form-label">Entry amount:</label>
          <input type="text" class="form-control" id="entry-amount" v-model="entryAmount" required>
          <div class="invalid-feedback">
            Please enter a valid amount (e.g. 28.19 or 28,19).
          </div>
        </div>
        <div class="mb-3">
          <label for="entry-date" class="form-label">Entry date:</label>
          <input type="text" class="form-control" id="entry-date" v-model="entryDate" required>
          <div class="invalid-feedback">
            Please enter a valid date (e.g. 18.06.2020).
          </div>
        </div>
        <div v-if="this.serverValidationMessages">
          <ul>
            <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <button class="btn btn-primary me-3" type="submit" @click="createEntry">Create</button>
          <button class="btn btn-danger" type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accounts',
  data () {
    return {
      accounts: [],
      aid: '',
      desc: '',
      type: '',
      amount: '',
      serverValidationMessages: []
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/getAccounts'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(account => {
        this.accounts.push(account)
      }))
      .catch(error => console.log('error', error))
  },
  methods: {
    async createAccount () {
      const valid = this.validate
      if (valid) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/newEntry'
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const account = JSON.stringify({
          aid: this.aid,
          desc: this.desc,
          type: this.type,
          amount: this.amount
        })
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: account,
          redirect: 'follow'
        }
        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    }
  },
  async handleResponse (response) {
    if (response.ok) {
      return process.env.VUE_APP_BACKEND_BASE_URL + '/accounts'
    } else if (response.status === 400) {
      response = await response.json()
      response.errors.forEach(error => {
        this.serverValidationMessages.push(error.defaultMessage)
      })
    } else {
      this.serverValidationMessages.push('Unknown error occurred')
    }
  },
  validate () {
    let valid = true
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            valid = false
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    return valid
  },
  deleteAccount (accountId) {
    if (accountId) {
      fetch(process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/deleteAccount/' + accountId, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(res => console.log(res))
    }
    this.$router.go(0)
  }
}
</script>
