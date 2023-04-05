import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config";

export const uploadMprPhoto = (file: File) => {
  const mprRef = ref(storage, "mprs/" + file.name);

  return uploadBytes(mprRef, file)
    .then(async () => {
      console.log("uploaded");
      const downloadURL = await getDownloadURL(mprRef);
      console.log("url", downloadURL);
      return downloadURL;
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
};
