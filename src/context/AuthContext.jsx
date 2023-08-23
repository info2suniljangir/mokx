
import React, { useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail, 
 updatePassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    

    const signUp = async  (email, password, name) => {
          await createUserWithEmailAndPassword(auth, email, password);
          updateProfile(auth.currentUser, {
            displayName: name, 
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
      };

    const login = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password);
      }

    const signout = () => {
          return auth.signOut();
    }

    const resetPassword = (email) => {
      try {
        return sendPasswordResetEmail(auth, email)
        
      } catch (error) {
        console.log("Error password sending email")
        console.log(error)
      }
    }

    const changeEmail = (email) => {
        updateEmail(currentUser, email)
        }

    const changePassword = (password) => {
      updatePassword(currentUser, password)   
    }

    //Apple and Facebook login have the same logic
    const signInWithGoogle = () => {
      var provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;

    }, [currentUser])

    
    const value = {
        currentUser,
        login,
        signUp,
        signout,
        resetPassword,
        changeEmail,
        changePassword,
        signInWithGoogle,
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
};


AuthProvider.propTypes = {
  children: PropTypes.node
};


