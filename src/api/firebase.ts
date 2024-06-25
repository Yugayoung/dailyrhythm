import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { RhythmItem } from '../components/AddRhythm';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      photoURL: user.photoURL ?? '',
      uid: user.uid,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function handleGoogleLogout(): Promise<void> {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export function handleGoogleAuthStateChange(
  callback: (user: User | null) => void
) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function addNewRhythm(uid: string, rhythm: RhythmItem) {
  const id = uuid();
  set(ref(database, `rhythm/${uid}/${id}`), {
    ...rhythm,
    id: id,
    status: 'active',
  });
}
