/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { months } from "../data/months";
import { createMpr } from "../firebase/mpr/createMpr";
// import { createMpr } from "../firebase/mpr/createMpr";
import { uploadMprPhoto } from "../firebase/mpr/uploadMprPhoto";
import s from "../styles/components/AddHours.module.scss";
import { InputType } from "../types/input.type";
import { User } from "../types/user.type";
import fileSearch from "../assets/fileSearch.png";
import { generateFileName } from "../utils/generateFileName";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type AddHoursProps = {
  user: User;
};

export const AddHours = ({ user }: AddHoursProps) => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(+new Date().getFullYear());

  const [psHours, setPsHours] = useState(0);
  const [oresHours, setOresHours] = useState(0);
  const [bosHours, setBosHours] = useState(0);
  const [otherHours, setOtherHours] = useState(0);
  const totalHours = [psHours, oresHours, bosHours, otherHours].reduce(
    (acc, val) => acc + val,
    0
  );

  const [apprenticeSignature, setApprenticeSignature] = useState(false);
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const hoursInputs: InputType[] = [
    {
      id: "PS",
      labelText: "Photovalic Systems",
      type: "number",
      name: "PS",
      value: psHours,
      placeholder: "0",
      onChange: (e) => setPsHours(Number(e.target.value)),
      autoComplete: "off",
    },
    {
      id: "ORES",
      labelText: "Other Renewable Energy Systems",
      type: "number",
      name: "ORES",
      value: oresHours,
      placeholder: "0",
      onChange: (e) => setOresHours(Number(e.target.value)),
      autoComplete: "off",
    },
    {
      id: "BOS",
      labelText: "Balance of Systems",
      type: "number",
      name: "BOS",
      value: bosHours,
      placeholder: "0",
      onChange: (e) => setBosHours(Number(e.target.value)),
      autoComplete: "off",
    },
    {
      id: "Other",
      labelText: "Other",
      type: "number",
      name: "Other",
      value: otherHours,
      placeholder: "0",
      onChange: (e) => setOtherHours(Number(e.target.value)),
      autoComplete: "off",
    },
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setPhotoError(false);
      setMonth(+e.target.value);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("new file!");

    if (!selectedFile) {
      return console.log("add photo");
    }

    if (!month || !year) {
      console.log("add date");
      return setPhotoError(true);
    }

    console.log("new file! 2");

    setPhotoError(false);
    const date = new Date(year, month - 1);

    const newFileName = generateFileName(user.name, date, selectedFile.type);

    const newFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
    });
    try {
      const photoUrl = await uploadMprPhoto(newFile);
      setUploadPhotoUrl(photoUrl);
      console.log("new file! 3");
    } catch (err) {
      console.error(err);
      setUploadPhotoUrl(null);
      console.log("error! catch");
    }
  };

  const deletePhoto = () => {
    setUploadPhotoUrl(null);
    // delete photo from bucket
  };

  const uploadMPR = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!+month) {
      return console.log("enter month");
    }

    if (!uploadPhotoUrl) {
      return console.log("add photo");
    }

    if (!totalHours) {
      return console.log("add hours");
    }

    if (!apprenticeSignature) {
      return console.log("sign the mpr");
    }

    if (!user.supervisorId) {
      return console.log("apprentices must be supervised");
    }

    const date = new Date(year, month - 1);

    createMpr({
      userId: user.id,
      username: user.name,
      date,
      photoUrl: uploadPhotoUrl,
      psHours,
      oresHours,
      bosHours,
      otherHours,
      totalHours,
      apprenticeSignature,
      supervisorSignature: false,
      supervisorId: user.supervisorId,
    });

    console.log("upload");
    // TODO: clear form close modal
  };

  const monthClass = cx({
    label: true,
    invalid: (!month && isSubmitted) || photoError,
  });

  const yearClass = cx({
    label: true,
    invalid: !year && isSubmitted,
  });

  const photoClass = cx({
    fileContainer: true,
    invalid: !uploadPhotoUrl && isSubmitted,
  });

  const hoursClass = cx({
    hours: true,
    invalid: !totalHours && isSubmitted,
  });

  const signatureClass = cx({
    label: true,
    checkbox: true,
    invalid: !apprenticeSignature && isSubmitted,
  });

  return (
    <form className={s.addHours} onSubmit={uploadMPR}>
      <div className={s.leftCol}>
        <div className={s.dateContainer}>
          <label className={monthClass}>
            Month
            <select
              className={cx(s.input, s.date)}
              name="month"
              id="month"
              onChange={handleMonthChange}
              autoFocus
            >
              <option value="">-Choose a month</option>
              {months.map((month) => (
                <option key={month.id} value={+month.id}>
                  {month.name}
                </option>
              ))}
            </select>
          </label>
          <label className={yearClass}>
            Year
            <input
              className={cx(s.input, s.date)}
              type="number"
              name="year"
              min="2020"
              max="2060"
              step="1"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div className={photoClass}>
          <label className={s.inputContainer}>
            <div className={s.filePreview}>
              <img
                src={uploadPhotoUrl ? uploadPhotoUrl : fileSearch}
                alt="file upload"
              />
            </div>
            <span className={s.uploadText}>
              Drag and drop or <span className={s.green}>upload file</span>
            </span>
            <input
              className={s.fileInput}
              type="file"
              name="mprPhoto"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!month}
            />
          </label>
        </div>
        {!month && (
          <p className={s.error}>
            Please choose month/year before uploading photo
          </p>
        )}
        {isSubmitted && !uploadPhotoUrl && (
          <p className={s.error}>Please upload photo</p>
        )}
      </div>
      <div className={s.rightCol}>
        <div className={hoursClass}>
          {isSubmitted && !totalHours && (
            <p className={s.error}>Please add hours</p>
          )}
          {hoursInputs.map((input) => (
            <label key={input.id} className={s.label}>
              {input.labelText}
              <input
                className={s.input}
                name={input.name}
                placeholder={input.placeholder}
                onChange={input.onChange}
              />
            </label>
          ))}
        </div>

        <label className={signatureClass}>
          <input
            type="checkbox"
            onChange={() => setApprenticeSignature(!apprenticeSignature)}
          />
          <span>Apprentice has signed</span>
        </label>
        <div className={s.submitContainer}>
          <input className={s.submitBtn} type="submit" value="Upload" />
        </div>
      </div>
    </form>
  );
};
