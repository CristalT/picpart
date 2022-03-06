import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, limit, getDocs, orderBy, startAfter, doc, getDoc, where } from 'firebase/firestore';
import firebaseConfig from './environment/firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();
const BASE_URL = 'data/fmr';

const store = (path, doc) => {
  return addDoc(collection(db, `${BASE_URL}/${path}`), doc);
};

const get = async (path, { orderByField, pageLimitDoc, search } = {}) => {
  const queryConstraints = [limit(10)];
  if (orderByField) queryConstraints.push(orderBy(orderByField));
  if (pageLimitDoc) queryConstraints.push(startAfter(pageLimitDoc));
  if (search) {
    queryConstraints.push(where(search.field, '>=', search.terms))
    queryConstraints.push(where(search.field, '<=', search.terms + '~'))
  }
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

  if (!docSnap.exists()) {
    throw new Error('No such document');
  }

  return docSnap.data();
};

export default { store, get, find };
