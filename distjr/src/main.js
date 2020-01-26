import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Firebase App (the core Firebase SDK) is always required and must be listed first
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase'

// Add the Firebase services that you want to use
require("firebase/auth");
require("firebase/firestore");

firebase.database.enableLogging(true);

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAwSZ1sr9MwO_g6cqv64lFi2PkA3qosOs",
  authDomain: "distjr-78824.firebaseapp.com",
  databaseURL: "https://distjr-78824.firebaseio.com",
  projectId: "distjr-78824",
  storageBucket: "distjr-78824.appspot.com",
  messagingSenderId: "471497377403",
  appId: "1:471497377403:web:a4c3f1aa8f498b92c744de",
  measurementId: "G-YH36LX1VBM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export var db = firebase.firestore();

let app;
firebase.auth().onAuthStateChanged(async user => {
if (!app) {
    //wait to get user
    // eslint-disable-next-line no-redeclare
    var user = await firebase.auth().currentUser;

    //start app
    app = new Vue({
      router,
      created() {
        //redirect if user not logged in
        if (!user) {
          this.$router.push("/");
        }
        else{
          this.$router.push("/dashboard")
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});