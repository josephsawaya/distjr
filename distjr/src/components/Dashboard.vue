<template>
    <div>
        <div>
            <button>Add New Distraction</button>
        </div>

        <div>

            <div>
                <div v-if="empty"> Add new distractions</div>
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
// import db from "../main.js"

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
    }
}

</script>
<style>

</style>