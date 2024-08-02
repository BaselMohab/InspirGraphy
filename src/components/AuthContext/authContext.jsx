import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from '../../config/firebase.config';
import { sendPasswordResetEmail, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then(data => {
            setCurrentUser(data.user);
            setIsAuth(true);
            localStorage.setItem('TOKENS', JSON.stringify({...data.user.stsTokenManager}));
        });
    };



    const signout = () => {
        return signOut(auth).then(() => {
            setCurrentUser(null);
            setIsAuth(false);
            localStorage.removeItem('TOKENS');
        });
    };

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider).then(result => {
            setCurrentUser(result.user);
            setIsAuth(true);
            localStorage.setItem('TOKENS', JSON.stringify({...result.user.stsTokenManager}));
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsAuth(!!user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signUp,
        forgetPassword,
        signout,
        signInWithGoogle,
        isAuth,
        setIsAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
