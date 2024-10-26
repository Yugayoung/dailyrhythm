import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  onIdTokenChanged,
} from 'firebase/auth';
import { RhythmItem } from '../components/AddRhythm';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

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

provider.addScope('email');
provider.addScope('profile');

const EXPIRY_DURATION = 3600000;

let tokenExpiryTimeout: NodeJS.Timeout | null = null;

export function startTokenExpiryTimer() {
  if (tokenExpiryTimeout) clearTimeout(tokenExpiryTimeout);

  tokenExpiryTimeout = setTimeout(() => {
    signOut(auth)
      .then(() => {
        alert('세션이 만료되어 로그아웃되었습니다.');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  }, EXPIRY_DURATION);
}

function stopTokenExpiryTimer() {
  if (tokenExpiryTimeout) clearTimeout(tokenExpiryTimeout);
}

export function handleGoogleAuthStateChange(
  callback: (user: User | null) => void
) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
    if (user) {
      startTokenExpiryTimer(); // 로그인 시 타이머 시작
      onIdTokenChanged(auth, (updatedUser) => {
        if (!updatedUser) {
          stopTokenExpiryTimer(); // 사용자가 로그아웃하면 타이머 중지
        } else {
          startTokenExpiryTimer(); // 토큰 갱신 시 타이머 재설정
        }
      });
    } else {
      stopTokenExpiryTimer(); // 사용자가 로그아웃하면 타이머 중지
    }
  });
}

export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    startTokenExpiryTimer();
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
    stopTokenExpiryTimer();
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function firebaseAddNewRhythm(uid: string, rhythm: RhythmItem) {
  const id = uuid();
  const startDate = dayjs(rhythm.startDate);
  const endDate = dayjs(rhythm.endDate);
  const status: { [date: string]: string } = {};

  for (
    let date = startDate;
    date.isBefore(endDate) || date.isSame(endDate);
    date = date.add(1, 'day')
  ) {
    status[date.format('YYYY-MM-DD')] = 'active';
  }

  const newRhythm = {
    ...rhythm,
    id: id,
    status,
  };

  set(ref(database, `rhythms/${uid}/${id}`), newRhythm);
}

export async function getRhythm(uid: string): Promise<RhythmItem[]> {
  const snapshot = await get(ref(database, `rhythms/${uid}`));
  const items = snapshot.val() || {};

  return Object.values(items) as RhythmItem[];
}

export async function firebaseRemoveRhythm(uid: string, rhythm: RhythmItem) {
  return remove(ref(database, `rhythms/${uid}/${rhythm.id}`));
}

export async function firebaseUpdateRhythm(uid: string, rhythm: RhythmItem) {
  const rhythmRef = ref(database, `rhythms/${uid}/${rhythm.id}`);
  const startDate = dayjs(rhythm.startDate);
  const endDate = dayjs(rhythm.endDate);
  const status: { [date: string]: string } = {};

  for (
    let date = startDate;
    date.isBefore(endDate) || date.isSame(endDate);
    date = date.add(1, 'day')
  ) {
    status[date.format('YYYY-MM-DD')] =
      rhythm.status[date.format('YYYY-MM-DD')] || 'active';
  }

  const updatedRhythm = {
    ...rhythm,
    status,
  };

  await set(rhythmRef, updatedRhythm);
}
