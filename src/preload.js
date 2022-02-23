import { contextBridge } from 'electron'
import { pictureRepo } from './app/repositories';

const getPictures = () => {
  return pictureRepo.get();
}

contextBridge.exposeInMainWorld('db', {
  getPictures,
});