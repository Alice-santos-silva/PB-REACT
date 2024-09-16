import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA42aQE50wcAlOP4KlvRtV0LsEH62fGjbM",
  authDomain: "projeto-alice-2.firebaseapp.com",
  projectId: "projeto-alice-2",
  storageBucket: "projeto-alice-2.appspot.com",
  messagingSenderId: "418951647393",
  appId: "1:418951647393:web:333dc6f7b978f9382060e0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };