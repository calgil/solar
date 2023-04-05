/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { createMpr } from "../firebase/mpr/createMpr";
// import { createMpr } from "../firebase/mpr/createMpr";
import { uploadMprPhoto } from "../firebase/mpr/uploadMprPhoto";
import s from "../styles/components/AddHours.module.scss";
import { InputType } from "../types/input.type";
import { User } from "../types/user.type";
import { InputBase } from "./InputBase";

type Month = {
  id: number;
  name: string;
};

type AddHoursProps = {
  user: User;
};

export const AddHours = ({ user }: AddHoursProps) => {
  const [month, setMonth] = useState<number | string>("");
  const [year, setYear] = useState<number | string>(new Date().getFullYear());
  const date = `${month}-${year}`;

  const [psHours, setPsHours] = useState(0);
  const [resHours, setResHours] = useState(0);
  const [bosHours, setBosHours] = useState(0);
  const [otherHours, setOtherHours] = useState(0);
  const totalHours = [psHours, resHours, bosHours, otherHours].reduce(
    (acc, val) => acc + val,
    0
  );

  const [apprenticeSignature, setApprenticeSignature] = useState(false);

  const [uploadPhotoUrl, setUploadPhotoUrl] = useState<string | null>(null);

  const months: Month[] = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

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
      id: "RES",
      labelText: "Renewable Energy Systems",
      type: "number",
      name: "RES",
      value: resHours,
      placeholder: "0",
      onChange: (e) => setResHours(Number(e.target.value)),
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return console.log("add photo");
    }
    const newFileName = `${
      user.name
    }--${month}-${year}.${selectedFile.type.slice(-3)}`;
    const newFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
    });
    console.log({ newFile });
    try {
      const photoUrl = await uploadMprPhoto(newFile);
      console.log({ photoUrl });
      setUploadPhotoUrl(photoUrl);
    } catch (err) {
      console.error(err);
      setUploadPhotoUrl(null);
    }
  };

  const deletePhoto = () => {
    setUploadPhotoUrl(null);
    // delete photo from bucket
  };

  const uploadMPR = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!+month) {
      return console.log("enter month");
    }

    if (!uploadPhotoUrl) {
      return console.log("upload photo");
    }

    if (!totalHours) {
      return console.log("add hours");
    }

    if (!apprenticeSignature) {
      return console.log("sign the mpr");
    }

    createMpr({
      userId: user.id,
      username: user.name,
      date: date,
      photoUrl: uploadPhotoUrl,
      psHours,
      resHours,
      bosHours,
      otherHours,
      totalHours,
      apprenticeSignature,
      supervisorSignature: false,
    });

    console.log("upload");
  };

  return (
    <form className={s.addHours} onSubmit={uploadMPR}>
      <div>
        {!uploadPhotoUrl && (
          <input
            type="file"
            name="mprPhoto"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
        )}
        {uploadPhotoUrl && (
          <>
            <div className={s.uploadContainer}>
              <img src={uploadPhotoUrl} alt="user selected photo" />
            </div>
            <button onClick={deletePhoto}>Remove File</button>
          </>
        )}
      </div>
      <div className={s.rightCol}>
        <div className={s.dateContainer}>
          <label>
            Month:
            <select
              name="month"
              id="month"
              onChange={(e) => setMonth(e.target.value)}
              autoFocus
            >
              <option value="">-Choose a month</option>
              {months.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Year:
            <input
              type="number"
              name="year"
              min="2023"
              max="2060"
              step="1"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div className={s.hours}>
          {hoursInputs.map((input) => (
            <InputBase key={input.id} input={input} />
          ))}
        </div>
        <label>
          Apprentice has signed
          <input
            type="checkbox"
            onChange={() => setApprenticeSignature(!apprenticeSignature)}
          />
        </label>
        <input className={s.submitBtn} type="submit" value="Upload" />
      </div>
    </form>
  );
};
