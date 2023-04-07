/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { months } from "../data/months";
import { createMpr } from "../firebase/mpr/createMpr";
// import { createMpr } from "../firebase/mpr/createMpr";
import { uploadMprPhoto } from "../firebase/mpr/uploadMprPhoto";
import s from "../styles/components/AddHours.module.scss";
import { InputType } from "../types/input.type";
import { User } from "../types/user.type";
import { toDate } from "../utils/toDate";
import { InputBase } from "./InputBase";

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
      // const photoUrl = await uploadMprPhoto(newFile);
      // console.log({ photoUrl });
      console.log("upload photo");
      // setUploadPhotoUrl(photoUrl);
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

    if (!totalHours) {
      return console.log("add hours");
    }

    if (!apprenticeSignature) {
      return console.log("sign the mpr");
    }

    if (!user.supervisorId) {
      return console.log("apprentices must be supervised");
    }

    console.log("user", user);

    const date = new Date(year, month - 1);

    createMpr({
      userId: user.id,
      username: user.name,
      date,
      photoUrl: `exampleUrl.com`,
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
    // TODO: clear form
  };

  return (
    <form className={s.addHours} onSubmit={uploadMPR}>
      <div>
        {!uploadPhotoUrl && (
          <input
            type="file"
            name="mprPhoto"
            accept="image/*"
            // required
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
              onChange={(e) => setMonth(parseInt(e.target.value))}
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
          <label>
            Year:
            <input
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
