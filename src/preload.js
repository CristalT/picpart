import { contextBridge } from 'electron'
import Picture from '@/models/picture';

const picture = new Picture;

const getPictures = () => {
  return picture.get();
}

const storePicture = () => {
  return picture.store();
}

contextBridge.exposeInMainWorld('api', {
  getPictures,
  storePicture,
});