<template>
  <h1>Entries</h1>
  <h3>Account: {{ accountName.toString() }}</h3>
  <table class="table table-striped">
    <thead>
    <tr align="left">
      <th scope="col">Description</th>
      <th scope="col">Type</th>
      <th scope="col">Date</th>
      <th class="col col-lg-1">Amount</th>
      <th class="col col-lg-1">Options</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in entries" :key="entry.id">
      <td scope="row" align="left">{{ entry.entryDescription }}</td>
      <td scope="row" align="left">{{ entry.entryType }}</td>
      <td scope="row" align="left">{{ entry.entryDate }}</td>
      <td scope="row" align="left">{{ entry.entryAmount }}</td>
      <td scope="row" align="left"><div class="btn"><img src="../assets/trash.png" v-on:click="deleteEntry(entry.accountEntryId)" width="28" height="28"></div> <div class="btn"><img src="../assets/settings.png" v-on:click="updateEntry(entry.accountEntryId)" width="28" height="28"></div></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Entries',
  data () {
    return {
      entries: [],
      accountName: []
    }
  },
  mounted () {
    const endpointEntries = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/getAccountEntries/' + this.$route.params.id
    const endpointAccount = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/getAccount/' + this.$route.params.id
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpointEntries, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(entry => {
        this.entries.push(entry)
      }))
      .catch(error => console.log('error', error))

    fetch(endpointAccount, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.accountName.push(result.accountName)
      })
      .catch(error => console.log('error', error))
  },
  methods: {
    deleteEntry (entryId) {
      if (entryId) {
        fetch(process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/deleteEntry/' + entryId, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(res => console.log(res))
      }
      this.$router.go(0)
    }
  }
}
</script>
