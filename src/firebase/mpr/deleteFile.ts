import { deleteObject, getStorage, ref } from "firebase/storage";
import { toast } from "react-toastify";

const storage = getStorage();

export const deleteFile = (filePath: string | undefined) => {
  if (!filePath) {
    return;
  }
  const imgRef = ref(storage, filePath);
  console.log({ filePath });

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
