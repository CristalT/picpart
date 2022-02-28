import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, limit, getDocs, orderBy, startAfter } from 'firebase/firestore';
import firebaseConfig from './environment/firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();

const store = (path, doc) => {
  return addDoc(collection(db, `data/fmr/${path}`), doc);
};

const get = async (path, orderByField = null, pageLimitDoc = null) => {
  const queryConstraints = [limit(10)];
  if (orderByField) queryConstraints.push(orderBy(orderByField));
  if (pageLimitDoc) queryConstraints.push(startAfter(pageLimitDoc));
  const firstPage = query(collection(db, `data/fmr/${path}`), ...queryConstraints);
  const documentSnapshots = await getDocs(firstPage);
  const data = [];
  documentSnapshots.forEach((doc) => {
    const item = doc.data()
    item.id = doc.id;
    data.push(item);
  });
  return {
    data,
    meta: {
      last: documentSnapshots.docs[documentSnapshots.docs.length - 1],
    }
  }
}

export default ({ store, get });
