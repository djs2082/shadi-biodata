const dbName = 'ShadiBioData';
const storeName = 'profile_pictures';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = () => {
      reject('Database Error');
    };

    request.onsuccess = () => {
      console.log('dfasddjklsfjdklsj');
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        console.log('i am here');
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });
};

export const addImageToDB = async (id, blob) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const createdAt = new Date();
  store.put({ id, blob, createdAt: createdAt.toISOString() });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log('JLKJ');
      localStorage.setItem('profile_picture_id', id);
      resolve('Image Stored Successfully');
    };
    transaction.onerror = () => {
      reject('Failed to store image');
    };
  });
};

export const getImageFromDB = async () => {
  const id = localStorage.getItem('profile_picture_id');
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result ? request.result.blob : null);
    };
    request.onerror = () => {
      reject('Failed to retrieve image');
    };
  });
};

export const deleteImageFromDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.delete(localStorage.getItem('profile_picture_id'));
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log('Record Deleted successfulley');
      localStorage.removeItem('profile_picture_id');
      resolve('Record Deleted successfully');
    };
    request.onerror = (error) => {
      console.error('Failed to delete record:', request.error);
      reject('Failed to delete record: ' + request.error);
    };
  });
};
