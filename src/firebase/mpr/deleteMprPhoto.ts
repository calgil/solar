import { deleteObject, getStorage, ref } from "firebase/storage";
import { toast } from "react-toastify";

const storage = getStorage();

export const deleteMprPhoto = (fileName: string) => {
  console.log("delete function");
  const imgRef = ref(storage, `mprs/${fileName}`);

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
