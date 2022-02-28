import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, limit, getDocs, orderBy, startAfter, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from './environment/firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();
const BASE_URL = 'data/fmr';

const store = (path, doc) => {
  return addDoc(collection(db, `${BASE_URL}/${path}`), doc);
};

const get = async (path, orderByField = null, pageLimitDoc = null) => {
  const queryConstraints = [limit(10)];
  if (orderByField) queryConstraints.push(orderBy(orderByField));
  if (pageLimitDoc) queryConstraints.push(startAfter(pageLimitDoc));
  const firstPage = query(collection(db, `${BASE_URL}/${path}`), ...queryConstraints);
  const documentSnapshots = await getDocs(firstPage);
  const data = [];
  documentSnapshots.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    data.push(item);
  });
  return {
    data,
    meta: {
      last: documentSnapshots.docs[documentSnapshots.docs.length - 1],
    },
  };
};

const find = async (path, id) => {
  const docRef = doc(db, `${BASE_URL}/${path}`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('No such document');
  }
};

export default { store, get, find };
