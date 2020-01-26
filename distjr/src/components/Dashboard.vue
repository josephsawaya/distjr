<template>
  <div>
    <div>
        <button class="open-button" v-on:click='openForm()'>Add New Distraction</button>
    </div>

    <div>
      <div v-for="(distraction,index) in distractions" v-bind:key="index">
        <div v-on:click="plus">{{ distraction }}</div>
        <div v-for="(value,second) in values" v-bind:key="second">
          <div v-if="index == second" v-on:click="minus">{{ value }}</div>
        </div>
      </div>
      <div></div>

        <div class="form-popup" id="myForm">
            <form v-on:submit.prevent='addDistraction(distractionName)' action="/action_page.php" class="form-container">
                <input v-model='distractionName' type="text" placeholder="What's your new distraction?" name="distraction" required>
                <button type="submit" class="btn">Ok</button>
                <button type="button" class="btn cancel" v-on:click='closeForm()'>cancel</button>
            </form>
        </div>
    </div>
  </div>
</template>


<script>
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
var db = firebase.firestore();
// import db from "../main.js";


export default {
  name: "Dashboard",
  data() {
    return {
        distractionName: '',
      values: [],
      distractions: [],
      bruh: 0
    };
  },

  mounted() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.distractions = doc.data().distractions;
      })
      .then(() => {
        this.distractions.forEach(element => {
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(element)
            .doc("stats")
            .get()
            .then(doc => {
              // eslint-disable-next-line no-console
              this.values.push(doc.data().number);
            });
        });
      });
  },

  methods: {
    plus(e) {
      // eslint-disable-next-line no-console
      console.log(e.target.innerText);
      let temp = 0;
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(e.target.innerText)
        .doc("stats")
        .get()
        .then(doc => {
          temp = doc.data().number;
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(e.target.innerText)
            .doc("stats")
            .update({
              number: temp + 1
            });
        });
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => {
          this.distractions = doc.data().distractions;
        })
        .then(() => {
          this.values = [];
          this.distractions.forEach(element => {
            db.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection(element)
              .doc("stats")
              .get()
              .then(doc => {
                // eslint-disable-next-line no-console
                this.values.push(doc.data().number);
              });
          });
          this.$forceUpdate();
        });
    },
    minus(e) {
      // eslint-disable-next-line no-console
      console.log(e.target.innerText);
      let temp = 0;
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(this.distractions[this.values.indexOf(parseInt(e.target.innerText))])
        .doc("stats")
        .get()
        .then(doc => {
          temp = doc.data().number;
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(this.distractions[this.values.indexOf(parseInt(e.target.innerText))])
            .doc("stats")
            .update({
              number: temp - 1
            });
        });
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => {
          this.distractions = doc.data().distractions;
        })
        .then(() => {
          this.values = [];
          this.distractions.forEach(element => {
            db.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection(element)
              .doc("stats")
              .get()
              .then(doc => {
                // eslint-disable-next-line no-console
                this.values.push(doc.data().number);
              });
          });
          this.$forceUpdate();
        });
    },

    addDistraction(distractionName){
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
            distractions: firebase.firestore.FieldValue.arrayUnion(distractionName)
        });
        db.collection("users").doc(firebase.auth().currentUser.uid).collection(distractionName).doc("stats").set({
                number: 0
        });
         db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => {
          this.distractions = doc.data().distractions;
        })
        .then(() => {
          this.values = [];
          this.distractions.forEach(element => {
            db.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection(element)
              .doc("stats")
              .get()
              .then(doc => {
                // eslint-disable-next-line no-console
                this.values.push(doc.data().number);
              });
          });
          this.$forceUpdate();
        });
        this.closeForm();
    },

    openForm() {
        document.getElementById("myForm").style.display = "block";
    },


    closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
  }
};
    

</script>
<style>
    .form-popup {
    display: none;
        position: fixed;
        bottom: 0;
        right: 15px;
        border: 3px solid #f1f1f1;
        z-index: 9;
    }

    
</style>
