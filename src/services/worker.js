import { retrieveImageBlobFromLocalStorage } from "./localStorageService";

self.onmessage = (event) => {
  const blob = localStorage.getItem("profile_picutre");
  self.postMessage("Blob Load Complete");
};
