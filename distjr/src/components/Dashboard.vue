<template>
    <div>
        <div>
            <button class="open-button" v-on:click='openForm()'>Add New Distraction</button>
        </div>

        <div>

            <div>
                <div v-if="empty"> Add new distractions</div>
            </div>
        </div>

        <div class="form-popup" id="myForm">
            <form v-on:submit.prevent='addDistraction(distractionName)' action="/action_page.php" class="form-container">
                <input v-model='distractionName' type="text" placeholder="What's your new distraction?" name="distraction" required>
                <button type="submit" class="btn">Ok</button>
                <button type="button" class="btn cancel" v-on:click='closeForm()'>cancel</button>
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


export default {
    name: "Dashboard",
    data() {
        return {
            distractions: [],
            empty: false
        }
    },
    mounted(){
        db.collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
            if(doc.data() == null){
                this.empty = true;
            }
            else{
                alert(doc.data())
            }
        })
    },

    methods:{
        addDistraction(distractionName){
            db.collection("users").doc(firebase.auth().currentUser.uid).update({
                distractions: firebase.firestore.FieldValue.arrayUnion(distractionName)
            });
            db.collection("users").doc(firebase.auth().currentUser.uid).collection(distractionName).doc("stats").set({
                 number: 0
            });
            
        },

        openForm() {
            document.getElementById("myForm").style.display = "block";
        },


        closeForm() {
            document.getElementById("myForm").style.display = "none";
        }
    }
}


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