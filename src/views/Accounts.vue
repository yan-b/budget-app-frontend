<template>
  <h1>Account Overview</h1>
  <table class="table table-striped">
    <thead>
    <tr align="left">
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Balance</th>
      <th class="col col-lg-1">Options</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="account in accounts" :key="account.id">
        <td scope="row" align="left">{{ account.accountName }}</td>
        <td scope="row" align="left">{{ account.accountType }}</td>
        <td scope="row" align="left">{{ account.accountBalance }}</td>
        <td scope="row" align="left">XssXX</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Accounts',
  data () {
    return {
      accounts: []
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch('http://localhost:8080/api/v1/getAccounts', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(account => {
        this.accounts.push(account)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
