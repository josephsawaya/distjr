<template>
  <div>
    <div>
      <button class="open-button" v-on:click="openForm()">Add New Distraction</button>
    </div>
    <div>
      <button class="signout" v-on:click="signout()">Signout</button>
    </div>

    <div class="container">
        
      <div class="distraction" v-for="(distraction,index) in distractions" v-bind:key="index">
        <div class="button-container">
            <div v-bind:id="index" class="delete" v-on:click="delete_distraction">X </div>
            <div class="add-note" v-on:click="add">N </div>
        </div>
        <div v-bind:id="index" class="bruh1" v-on:click="plus">{{ distraction.key }}</div>
        <div v-bind:id="index" class="bruh2" v-on:click="minus">{{ distraction.value }}</div>
      </div>
      
    </div>

    <div v-bind:id="index" class="distractionNotes" v-for="(distraction,index) in distractions" v-bind:key="index" >
        <div  class="noteForm">
        <form
            v-on:submit.prevent="addNote(note)"
            action="/action_page.php"
            class="form-container">
            <input
            v-model="note"
            type="text"
            placeholder="What do you think about this distraction?"
            name="distraction"
            required
            />
            <button type="submit" class="btn">Ok</button>
            <button type="button" class="btn cancel" v-on:click="closeFormNote()">Cancel</button>
        </form>
        </div>
    </div>

    <div class="form-popup" id="myForm">
      <form
        v-on:submit.prevent="addDistraction(distractionName)"
        action="/action_page.php"
        class="form-container"
      >
        <input
          v-model="distractionName"
          type="text"
          placeholder="What's your new distraction?"
          name="distraction"
          required
        />
        <button type="submit" class="btn">Ok</button>
        <button type="button" class="btn cancel" v-on:click="closeForm()">Cancel</button>
      </form>
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
import Distraction from "../main.js";

export default {
  name: "Dashboard",
  data() {
    return {
        targetIndex: 0,
        distractionID: 0,
        note: "",
      distractionName: "",
      distractions: [],
      list: []
    };
  },

  mounted() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.list = doc.data().distractions;
      })
      .then(() => {
        this.list.forEach(element => {
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(element)
            .doc("stats")
            .get()
            .then(doc => {
              // eslint-disable-next-line no-console
              this.distractions.push(
                new Distraction(element, doc.data().number)
              );
            });
        });
      });
  },

  methods: {

      delete_distraction(e){
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(e.target.innerText).doc("stats").delete().then(()=>{
                this.distractions.pop(e.target.getAttribute("id"));
            }).catch(function(error) {
                // eslint-disable-next-line no-console
                console.error("Error removing document: ", error);
            }).then(()=>{
                this.$forceUpdate();
            });
      },

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
            }).then(()=>{
                this.distractions[e.target.getAttribute("id")].value++;
            })
        });
    },
    minus(e) {
      // eslint-disable-next-line no-console
      console.log(this.distractions[e.target.getAttribute("id")].key);
      let temp = 0;
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(this.distractions[e.target.getAttribute("id")].key)
        .doc("stats")
        .get()
        .then(doc => {
          temp = doc.data().number;
          if (temp === 0) {
            return;
          }
            db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(this.distractions[e.target.getAttribute("id")].key)
            .doc("stats")
            .update({
              number: temp - 1
            })
            this.distractions[e.target.getAttribute("id")].value--; 
        });
    },

    addDistraction(distractionName) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          distractions: firebase.firestore.FieldValue.arrayUnion(
            distractionName
          )
        }).then(()=>{
            db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection(distractionName)
            .doc("stats")
            .set({
            number: 0,
            note: ""
            })
        })
        this.distractions.push(new Distraction(distractionName,0));
        this.$forceUpdate();
        this.closeForm();
    },

    openForm() {
      document.getElementById("myForm").style.display = "block";
    },

    closeForm() {
      document.getElementById("myForm").style.display = "none";
    },


    signout(){
        firebase.auth().signOut().then(()=>{
            this.$router.push('/')
        })
    },


    add(e){
        this.targetIndex = this.distractions[e.target.getAttribute("id")].value;
        alert(e.target.getAttribute("id"));
        alert(this.distractions[e.target.getAttribute("id")].value);
    },


    addNote(noteToAdd){
        db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(this.distractions[this.targetIndex].key)
        .doc("stats")
        .update({
            note: noteToAdd
        })
    }
  }
};
</script>
<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 240px;
  border-radius: 10px;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  border-radius: 10px;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}


.distractionNotes {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.noteForm {
    margin: 3vh 3vw;
  height: 15vh;
  border-radius: 10px;
  display: flex;
  text-align: center;
  flex: 0 0 25vw;
  border: lightgray thin solid;
}
/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type="text"] {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: rgb(100, 100, 100);
  color: white;
  padding: 30px 50px 30px 50px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 50%;
  margin-bottom: 20px;
  opacity: 0.5;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: rgb(100, 100, 100);
  opacity: 0.3;
}

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
  opacity: 0.8;
}

.container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.distraction {
  margin: 3vh 3vw;
  height: 15vh;
  border-radius: 10px;
  display: flex;
  text-align: center;
  flex: 0 0 25vw;
  border: lightgray thin solid;
}
.bruh1 {
  width: 50%;
  transition: 1s;
  border-radius: 10px 0 0 10px;
  padding: 13% 0;
}
.bruh2 {
  width: 50%;
  border-radius: 0 10px 10px 0;
  transition: 1s;
  padding: 13% 0;
}

.bruh-container {
  display: flex;
}

.bruh1:hover {
  background-color: aquamarine;
}

.bruh2:hover {
  background-color: salmon;
}
</style>
// eslint-disable-next-line no-console