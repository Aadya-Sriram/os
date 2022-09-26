

const firebaseConfig = {
    apiKey: "AIzaSyDBxLOgKpmpLSIY86OYQ_-CkELZ4193zF8",
    authDomain: "auth-86809.firebaseapp.com",
    projectId: "auth-86809",
    storageBucket: "auth-86809.appspot.com",
    messagingSenderId: "215176193976",
    appId: "1:215176193976:web:f35d3cb2c9d95fffb0914d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    swal('Error !! kindly check password or email')
    return
    // Don't continue running the code
  }
  

 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
  
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    swal('User Created!!,')
  })
  .catch(function(error) {
    // Firebase will use this to swal of its errors
    var error_code = error.code
    var error_message = error.message

    swal(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    swal('Error !! kindly check password or email')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
   /* swal('User Logged In!!')&&*/ ref()
function ref(){
  



  location.href = "main.html";


}
  })
  .catch(function(error) {
   
    var error_code = error.code
    var error_message = error.message

    swal(error_message)
  })
}





function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
    
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}