/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
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

  const [psHours, setPsHours] = useState<number | string>("");
  const [resHours, setResHours] = useState<number | string>("");
  const [bosHours, setBosHours] = useState<number | string>("");
  const [otherHours, setOtherHours] = useState<number | string>("");

  //   const [mprPhoto, setMprPhoto] = useState<File | null>(null);
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
      onChange: (e) => setPsHours(e.target.value),
      autoComplete: "off",
    },
    {
      id: "RES",
      labelText: "Renewable Energy Systems",
      type: "number",
      name: "RES",
      value: resHours,
      placeholder: "0",
      onChange: (e) => setResHours(e.target.value),
      autoComplete: "off",
    },
    {
      id: "BOS",
      labelText: "Balance of Systems",
      type: "number",
      name: "BOS",
      value: bosHours,
      placeholder: "0",
      onChange: (e) => setBosHours(e.target.value),
      autoComplete: "off",
    },
    {
      id: "Other",
      labelText: "Other",
      type: "number",
      name: "Other",
      value: otherHours,
      placeholder: "0",
      onChange: (e) => setOtherHours(e.target.value),
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

  const uploadMPR = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!+month) {
      return console.log("enter month");
    }

    // console.log("upload mpr", psHours, bosHours, resHours, otherHours);
    console.log("upload");
  };

  return (
    <form className={s.addHours} onSubmit={uploadMPR}>
      <div>
        <input
          type="file"
          name="mprPhoto"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        {uploadPhotoUrl && (
          <div className={s.uploadContainer}>
            <img src={uploadPhotoUrl} alt="user selected photo" />
          </div>
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
        <input className={s.submitBtn} type="submit" value="Upload" />
      </div>
    </form>
  );
};
