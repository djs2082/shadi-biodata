import { logger } from '../utils/logger';

const dbName = 'ShadiBioData';
const storeName = 'profile_pictures';

interface ProfilePictureRecord {
  id: string;
  blob: Blob;
  createdAt: string;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = () => {
      reject(new Error('Database Error'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });
};

export const addImageToDB = async (id: string, blob: Blob): Promise<string> => {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const createdAt = new Date();
  store.put({ id, blob, createdAt: createdAt.toISOString() });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      localStorage.setItem('profile_picture_id', id);
      resolve('Image Stored Successfully');
    };
    transaction.onerror = () => {
      reject(new Error('Failed to store image'));
    };
  });
};

export const getImageFromDB = async (): Promise<Blob | null> => {
  const id = localStorage.getItem('profile_picture_id');
  if (!id) {
    return null;
  }

  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result as ProfilePictureRecord | undefined;
      resolve(result ? result.blob : null);
    };
    request.onerror = () => {
      reject(new Error('Failed to retrieve image'));
    };
  });
};

export const deleteImageFromDB = async (): Promise<string> => {
  const id = localStorage.getItem('profile_picture_id');
  if (!id) {
    return 'No image to delete';
  }

  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      localStorage.removeItem('profile_picture_id');
      resolve('Record Deleted successfully');
    };
    request.onerror = () => {
      logger.error('Failed to delete record:', request.error);
      reject(new Error('Failed to delete record: ' + request.error));
    };
  });
};
