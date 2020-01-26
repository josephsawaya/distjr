<template>
  <div id="main">
    <form v-on:submit.prevent="loginFunction()">
<h1>Log in</h1>
    <p>Please log in.</p>
    <hr>
    <div id= "container">
    <div class="email">
      <label for="email">Username:</label>
      <input v-model="username" type="text" placeholder="Enter Username" name="uname" required>
    </div>

    <div class="password">
      <label for="psw">Password:</label>
      <input v-model="password" type="password" placeholder="Enter Password" name="psw" required> 
    </div>

    <div class="Submit">
      <button type="submit">Login</button>
      <router-link :to="{ name: 'SignUp' }">Click here to sign up!</router-link>
    </div>
    </div>
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
      firebase.auth().signInWithEmailAndPassword(this.username,this.password)
      .then(() => {
        this.$router.push('Dashboard')
        })
      .catch(err => {
        alert(err);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}


.container{
  display:flex;
}
.email {
  display:flex;
  flex-direction: column;
  margin-bottom: 10px;
  width:30%;
  margin: auto auto 20px auto;
}

.password {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  margin:20px auto auto auto;
  width:30%;
}

.Submit {
  text-align: center;
}

input[type=text], input[type=password]{
  padding: 12px 20px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}


button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 20px 40%;
  border: none;
  cursor: pointer;
  width: 20%;
}

button:hover {
  opacity: 0.8;
}

</style>
