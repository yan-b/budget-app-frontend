<template>
  <div class="Home">
    <h1 class="display-3">Welcome to the Budget-App!</h1>
    <br>
    <h3 align="left">Easily manage your finances from everywhere...</h3>
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
            <p class="card-text"> <strong><h5> <div text="Test #numbers.formatDecimal(wealth, 1, POINT, 2, COMMA)} + ' €'"></div></h5></strong> </p>
            <a href="/accounts" class="btn btn-primary">Account Overview</a>
          </div>
      </div>
    </div>
    <div class="col-5">
      <div class="card" style="width: 25rem;height: 25rem;">
        <img src="../assets/accounts.png" class="card-img-top" style="height: 13rem;" alt="Accounts">
        <div class="card-body">
          <h5 class="card-title">Your number of budget accounts:</h5>
          <p class="card-text"> <strong> <h5>"Testtext"></h5> </strong> </p>
          <a href="/newAccount" class="btn btn-primary">Open new Account</a>
        </div>
      </div>
  </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
