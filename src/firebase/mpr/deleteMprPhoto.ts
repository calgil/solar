import { deleteObject, getStorage, ref } from "firebase/storage";
import { toast } from "react-toastify";

const storage = getStorage();

export const deleteFile = (fileName: string, folder: string) => {
  const imgRef = ref(storage, `${folder}/${fileName}`);

  deleteObject(imgRef)
    .then(() => {
      toast.success("Photo Deleted");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Could not delete Photo");
      throw new Error("Error deleting photo");
    });
};
