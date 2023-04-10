import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config";

export const uploadMprPhoto = (file: File) => {
  const mprRef = ref(storage, "mprs/" + file.name);

  return uploadBytes(mprRef, file)
    .then(async () => {
      const downloadURL = await getDownloadURL(mprRef);
      return downloadURL;
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
};
