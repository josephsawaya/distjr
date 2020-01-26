<template>
  <div id="main">
    <form v-on:submit.prevent="signinFunction()">

<h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

       <div class ="container">
      <div id = "nickname">
        <label for ="Nickname">Nickname:</label>
        <input v-model= "nickname" type="text" placeholder="Enter Nickname" name = "Nickname" required />
      </div>
      <div id="email">
        <label for ="email">Email:</label>
        <input v-model="username" type="text" placeholder="Enter Email" name = "Email" required/>
      </div>
      <div id="password">
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter Password" name = "Password" required />
      </div>
      <div id = "confirm">
        <label>Confirm Password:</label>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" name = "Confirm Password" required/>
      </div>
      <div class="clearfix">
        <button type="submit" class="signupbtn">Sign Up</button>
      </div>
      <div id="link">
        <router-link :to="{ name: 'Login' }">Already have a login?</router-link>
      </div>
    </div>
    </form>
    <router-link :to="{ name: 'Login' }">Already have a login?</router-link>
  </div>
</template>

<script>

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
var db = firebase.firestore();
// import db from "../main.js" 
export default {
  name: "Login",
  data(){
    return{
      nickname:'',
      username:'',
      password:'',
      confirmPassword:''
    }
  },
  methods:{
    signinFunction(){
        if(this.confirmPassword != this.password){
            alert("Passwords do not match!");
        } 

        else {
            
            alert("function running");
            firebase.auth().createUserWithEmailAndPassword(this.username,this.password)
            .then(data => {
                alert(data.user.uid + "Successful!");
                
                writeUserData(data.user.uid, this.username, this.nickname);
            })
            .catch(err => {
                alert(err);

            })
        }
    },

  }
};

function writeUserData(uid, Email, nickname){
        alert("using: " + uid + " , " + Email + " , " + nickname);
        
        db.collection("users").doc(uid).set({
            username: Email,
            name: nickname,
            distractions: []  
        });
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

.main {
  padding: 16px;
}

.signupbtn {
  float: left;
  width: 20%;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.clearfix{
  text-align: center;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 20px 40%;
  border: none;
  cursor: pointer;
  width: 20px;
  opacity: 0.9;
}

button:hover {
  opacity: 0.8;
}


.container{
  display:flex;
  flex-direction: column;
}

#nickname,#password,#email,#confirm,#link{
  margin:auto;
  width:30%
}

#link{
  text-align: center;
}
</style>
