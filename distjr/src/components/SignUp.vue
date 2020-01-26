<template>
  <div id="main">
    <form v-on:submit.prevent="signinFunction()">
      <label>
        Nickname:
      </label>
      <input v-model="nickname" type="text">
      <label>
        Email:
      </label>
      <input v-model="username" type="text">
      <label>
        Password:
      </label>
      <input v-model="password" type="password">
      <label>
        Confirm Password:
      </label>
      <input v-model="confirmPassword" type="password">
      <input type="submit" value="Submit">
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

</style>
