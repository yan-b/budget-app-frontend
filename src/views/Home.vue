<template>
  <div class="Home">
    <h1 class="display-3">Welcome to the Budget-App!</h1>
    <br>
    <h3 align="left">Manage your finances from everywhere...</h3>
    <br>
    <br>
  </div>
  <div class="container">
  <div class="row justify-content-evenly">
    <div class="col-5">
      <div class="card" style="width: 25rem;height: 25rem;">
        <img src="../assets/wealth.png" class="card-img-top" style="height: 13rem;" alt="Wealth">
          <div class="card-body">
            <h5 class="card-title">Your total assets:</h5>
            <p></p>
            <h5 class="card-text">{{ total }}</h5>
            <p></p>
            <a href="/accounts" class="btn btn-primary">Account Overview</a>
          </div>
      </div>
    </div>
    <div class="col-5">
      <div class="card" style="width: 25rem;height: 25rem;">
        <img src="../assets/accounts.png" class="card-img-top" style="height: 13rem;" alt="Accounts">
        <div class="card-body">
          <h5 class="card-title">Your number of budget accounts:</h5>
          <p></p>
          <h5 class="card-text">{{ accounts.length }}</h5>
          <p></p>
          <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#account-create-offcanvas" aria-controls="#account-create-form">Create account</button>
        </div>
      </div>
  </div>
  </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="account-create-offcanvas" aria-labelledby="offcanvas-label">
    <div class="offcanvas-header">
      <h5 id="offcanvas-label">New Account</h5>
      <button type="button" id="close-offcanvas" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="text-start needs-validation" id="account-create-form" novalidate>
        <div class="mb-3">
          <label for="account-name" class="form-label">Account name:</label>
          <input type="text" class="form-control" id="account-name" v-model="accountName" required>
          <div class="invalid-feedback">
            Please provide a valid name for your account.
          </div>
        </div>
        <div class="mb-3">
          <label for="account-type" class="form-label">Initial Balance:</label>
          <input type="text" class="form-control" id="account-type" v-model="accountBalance" required>
          <div class="invalid-feedback">
            Please enter a valid balance (e.g. 28.19 or 28,19).
          </div>
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Account type</label>
          <select id="type" class="form-select" v-model="accountType" required>
            <option value="" selected disabled>Choose...</option>
            <option value="GIROKONTO">Girokonto</option>
            <option value="SPARKONTO">Sparkonto</option>
          </select>
          <div class="invalid-feedback">
            Please select an account type.
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
          <button class="btn btn-primary me-3" type="submit" @click="createAccount">Create</button>
          <button class="btn btn-danger" type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      home: [],
      accounts: [],
      userId: '',
      accountName: '',
      accountType: '',
      accountBalance: '',
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
  emits: ['created'],
  methods: {
    async createAccount () {
      const valid = this.validate
      if (valid) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/newAccount'
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const account = JSON.stringify({
          userId: '111',
          accountName: this.accountName,
          accountType: this.accountType,
          accountBalance: this.accountBalance
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
  computed: {
    total: function () {
      if (!this.accounts) {
        return 0
      }
      let sum = 0
      this.accounts.forEach(e => {
        sum += e.accountBalance
      })
      return sum.toFixed(2)
    }
  }
}

</script>
