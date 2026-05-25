import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signUp(email, password, displayName) {
        const userLogin = await createUserWithEmailAndPassword(auth, email, password);
        const user = userLogin.user;

        await updateProfile(user, {
            displayName: displayName
        });

        const userRef = doc(db, 'users', user.email);
        await setDoc(userRef, {
            displayName: displayName,
            Favorites: []
        });
    }

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.email);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        displayName: currentUser.displayName || '',
                        Favorites: []
                    });
                }
            }
            setUser(currentUser);
            setLoading(false);
            localStorage.setItem('isLoggedIn', !!currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, login, logout, googleLogin, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}

