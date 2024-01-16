<template>
  <div class="view-container">
    <div class="col-2">
      <div class="col-1-2">
        <h1>
          Ой...
        </h1>
        <p>Кажется, вы обратились к странице, которой не существует. Пожалуйста, вернитесь <router-link style="text-decoration: underline;" :to="{name: 'home'}">домой</router-link></p>
      </div>
      <div class="col-1-2">
        <img width="300" height="300" src="/images/404.webp">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-container {
  margin: auto;
}
  .col-2 {
    display: flex;
    justify-content: space-around;
    gap: 30px;
  }

  .col-1-2 {
    flex: 1 1 33%;

    & h1 {
      text-align: right;
      margin-bottom: 20px;
    }

    & p {
      text-align: right;
      line-height: 1.7;
    }

  }

</style>
