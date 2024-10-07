export const setDataInStorage = (): void => {};

// Convert a Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Save Blob to localStorage
export const saveImageBlobToLocalStorage = async (
  blob: Blob,
  key: string
): Promise<void> => {
  try {
    const base64Data = await blobToBase64(blob);
    if (typeof base64Data === "string") {
      localStorage.setItem(key, base64Data);
    } else {
      throw new Error("Failed to convert blob to base64 string");
    }
  } catch (error) {
    console.error("Failed to save blob to localStorage:", error);
  }
};

// Convert Base64 to Blob
function base64ToBlob(base64: string): Blob {
  const binary = atob(base64.split(",")[1]); // Split the base64 string to remove the prefix
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" }); // or 'image/png' depending on the image type
}

// Retrieve Blob from localStorage
export function retrieveImageBlobFromLocalStorage(key: string): Blob | null {
  const base64Data = localStorage.getItem(key);
  console.log(base64Data);
  if (!base64Data) {
    return null;
  }
  return base64ToBlob(base64Data);
}

export const removeImageFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
