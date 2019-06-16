import firebase from 'firebase'
import Rebase from 're-base'

var config = {
    apiKey: "AIzaSyDOy_NACflHCzt2VfPRJ4glwOqQjAF1qKY",
    authDomain: "happydrink-ed21d.firebaseapp.com",
    databaseURL: "https://happydrink-ed21d.firebaseio.com",
    projectId: "happydrink-ed21d",
    storageBucket: "happydrink-ed21d.appspot.com",
    messagingSenderId: "992413819893"
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { base }