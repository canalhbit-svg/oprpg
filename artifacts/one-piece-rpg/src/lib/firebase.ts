import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, User, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxjtiYx-8lilp-qzonChWLcyBmUmC2lao",
  authDomain: "em-busca-do-one-piece-rpg.firebaseapp.com",
  projectId: "em-busca-do-one-piece-rpg",
  storageBucket: "em-busca-do-one-piece-rpg.firebasestorage.app",
  messagingSenderId: "889152756445",
  appId: "1:889152756445:web:e5b8f0c6262a07f3f51934",
  measurementId: "G-8PZBSVP0BL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const MASTER_EMAIL = 'canalhbit@gmail.com';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
};

export const isMaster = (user: User | null) => {
  return user?.email === MASTER_EMAIL;
};

export { GoogleAuthProvider, signInWithPopup };