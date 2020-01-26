<template>
  <div>
    <div>
      <button>Add New Distraction</button>
    </div>

    <div>
      <div v-for="(distraction,index) in distractions" v-bind:key="index">
        <div v-on:click="plus">{{ distraction }}</div>
        <div v-for="(value,second) in values" v-bind:key="second">
          <div v-if="index == second" v-on:click="minus">{{ value }}</div>
        </div>
      </div>
      <div></div>
    </div>
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
  name: "Dashboard",
  data() {
    return {
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
    }
  }
};
</script>
<style>
</style>


