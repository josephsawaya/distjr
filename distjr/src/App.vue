<template>
  <div id="app">
    <div class="imgcontainer">
    <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}
</style>
