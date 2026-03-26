import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTuXw8v8H5Z8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q",
  authDomain: "oprpg.firebaseapp.com",
  projectId: "em-busca-do-one-piece-rpg",
  storageBucket: "em-busca-do-one-piece-rpg.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
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
