import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './environment/firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();

const add = (path, doc) => {
  return addDoc(collection(db, `data/fmr/${path}`), doc);
};

export { add };
