// Script adapted from https://www.javatpoint.com/confirm-password-validation-in-javascript
function verifyPassword() {

    var p1 = document.getElementById("p1").value;  
    var p2 = document.getElementById("p2").value;  

    //check empty password field  
    if(p1 == "") {  
       document.getElementById("message").innerHTML = "You'll need a password - they're, uh, kind of important";  
       return false;  
    }  

    //check passwords match  
    if(p1 != p2) {  
        document.getElementById("message").innerHTML = "Passwords don't match - just check you typed what you meant to";  
        return false;  
    }  
     
     
   //minimum password length validation  
    if(p1.length < 8) {  
       document.getElementById("message").innerHTML = "Password has to be at least 8 characters (have you seen that graph of how quickly hackers can brute force passwords? Mental!!)";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(p1.length > 15) {  
       document.getElementById("message").innerHTML = "Password can't exceed 15 characters (in case you forget it)";  
       return false;  
    } 

  }  