<template>
  <div id="main">
    <form v-on:submit.prevent="loginFunction()">


    <div class="Username">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>
    </div>

    <div class="password">
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required> 
    </div>

    <div class="Submit">
      <button type="submit">Login</button>
    

    <router-link :to="{ name: 'SignUp' }">Click here to sign up!</router-link>
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
.Username {
  text-align: center;
  display:flex;
  margin-bottom: 10px;
}

.password {
  text-align: center;
  display: flex;
  margin-top: 10px;
}
.password label{
  margin: auto 10px auto auto;
}
.Username label{
  margin: auto 10px auto auto;
}
.Submit {
  text-align: center;
}

input[type=text], input[type=password] {
  width: 30%;
  padding: 12px 20px;
  margin: auto 35% auto 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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
