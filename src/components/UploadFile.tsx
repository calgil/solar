/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/UploadFile.module.scss";
import classNames from "classnames/bind";
import fileSearch from "../assets/fileSearch.png";
import { generateFileName } from "../utils/generateFileName";
import { uploadPhoto } from "../firebase/mpr/uploadPhoto";
import { deleteFile } from "../firebase/mpr/deleteFile";

const cx = classNames.bind(s);

type UploadFileProps = {
  isSubmitted: boolean;
  photoUrl: string | undefined;
  photoPath: string | undefined;
  apprenticeName?: string;
  month: number;
  year: number;
  onPhotoChange: (url: string | null, folder: string, fileName: string) => void;
  folder: string;
  showDelete?: boolean;
};

export const UploadFile = ({
  isSubmitted,
  photoUrl,
  photoPath,
  apprenticeName,
  month,
  year,
  onPhotoChange,
  folder,
  showDelete,
}: UploadFileProps) => {
  console.log({ apprenticeName });

  const currentMonth = new Date().getMonth() + 1;
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState<string | undefined>(
    photoUrl
  );
  const [apprenticeError, setApprenticeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!apprenticeName) {
      return setApprenticeError(true);
    }

    setApprenticeError(false);
    if (!month || !year) {
      return setDateError(true);
    }
    setDateError(false);
    const date = new Date(year, month - 1);

    const file = new File(
      [selectedFile],
      generateFileName(apprenticeName, date, selectedFile.type, folder),
      { type: selectedFile.type }
    );
    setFileName(file.name);

    if (!file) {
      return;
    }

    try {
      const photoUrl = await uploadPhoto(file, folder);
      setUploadPhotoUrl(photoUrl);
      onPhotoChange(photoUrl, folder, file.name);
    } catch (error) {
      console.error(error);
      setUploadPhotoUrl(undefined);
      onPhotoChange(null, "", "");
    }
  };

  const deletePhoto = () => {
    setUploadPhotoUrl(undefined);
    deleteFile(photoPath);
  };

  const photoClass = cx({
    fileContainer: true,
    invalid: !uploadPhotoUrl && isSubmitted,
  });
  return (
    <>
      <div className={photoClass}>
        <label className={s.inputContainer}>
          <div className={s.filePreview}>
            <img
              src={uploadPhotoUrl ? uploadPhotoUrl : fileSearch}
              alt="file preview"
            />
          </div>
          <div className={s.uploadText}>
            {!uploadPhotoUrl && (
              <span>
                Drag and drop or
                <span className={s.green}> upload file</span>
              </span>
            )}
          </div>
          <input
            className={s.fileInput}
            type="file"
            name="mprPhoto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {uploadPhotoUrl && (
        <div className={s.deleteContainer}>
          {showDelete && (
            <button className={s.deleteBtn} onClick={deletePhoto}>
              Delete Photo
            </button>
          )}
          <a
            className={s.photoLink}
            href={uploadPhotoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Photo
          </a>
        </div>
      )}
      {!month ||
        ((dateError || apprenticeError) && (
          <p className={s.error}>
            Please choose valid {apprenticeName ? "" : "apprentice "}
            {new Date(year, month + 1) >
            new Date(new Date().getFullYear(), currentMonth)
              ? apprenticeName
                ? "date "
                : "or date "
              : ""}
            before uploading photo
          </p>
        ))}
      {isSubmitted && !uploadPhotoUrl && (
        <p className={s.error}>Please upload photo</p>
      )}
    </>
  );
};
