<template>
  <div id="main">
    <form v-on:submit.prevent="loginFunction()">
      <label>
        Email:
      </label>
      <input v-model="username" type="text">
      <label>
        Password
      </label>
      <input v-model="password" type="password">
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

export default {
  name: "Login",
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    loginFunction(){
      alert("function running");
      firebase.auth().createUserWithEmailAndPassword(this.username,this.password)
      .then(data => {
        alert(data);
        setTimeout(5000);
      })
      .catch(err => {
        alert(err);
        setTimeout(5000);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
