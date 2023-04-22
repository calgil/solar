/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { months } from "../data/months";
import { createMpr } from "../firebase/mpr/createMpr";
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
  closeModal: () => void;
  supervisor?: boolean;
  apprentices?: User[];
};

export const AddHours = ({
  user,
  closeModal,
  supervisor,
  apprentices,
}: AddHoursProps) => {
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

  const [selectedApprentice, setSelectedApprentice] = useState<User | string>(
    ""
  );
  const [supervisorSignature, setSupervisorSignature] = useState(false);

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

  const handleApprenticeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const apprentice = apprentices?.find((app) => app.id === e.target.value);
      if (apprentice) {
        setSelectedApprentice(apprentice);
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setPhotoError(false);
      setMonth(+e.target.value);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!month || !year) {
      return setPhotoError(true);
    }

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

    if (!+month || !uploadPhotoUrl || !totalHours) {
      return console.log("missing data");
    }

    if (!supervisor && !apprenticeSignature) {
      return console.log("apprentice post hours, missing signature");
    }
    if (supervisor && !supervisorSignature) {
      return console.log("supervisor post hours, missing sup signature");
    }

    if (!supervisor && !user.supervisorId) {
      return console.log("apprentices must be supervised");
    }

    if (supervisor && typeof selectedApprentice === "string") {
      return;
    }

    console.log("submit mpr");

    const date = new Date(year, month - 1);

    if (supervisor && typeof selectedApprentice !== "string") {
      createMpr({
        userId: selectedApprentice.id,
        apprenticeName: selectedApprentice.name,
        date,
        photoUrl: uploadPhotoUrl,
        psHours,
        oresHours,
        bosHours,
        otherHours,
        totalHours,
        apprenticeSignature: true,
        supervisorSignature,
        supervisorId: user.id,
      });
      return closeModal();
    }

    if (!user.supervisorId) {
      return console.log("no supervisor");
    }

    createMpr({
      userId: user.id,
      apprenticeName: user.name,
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

    closeModal();
  };

  const apprenticeClass = cx({
    label: true,
    invalid: supervisor && !selectedApprentice && isSubmitted,
  });

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

  const supervisorSignatureClass = cx({
    label: true,
    checkbox: true,
    invalid: supervisor && !supervisorSignature && isSubmitted,
  });

  return (
    <form onSubmit={uploadMPR}>
      <div className={s.addHours}>
        <div className={s.leftCol}>
          {supervisor && (
            <label className={apprenticeClass}>
              Apprentice
              <select
                className={s.input}
                name="apprentice"
                id="apprentice"
                onChange={handleApprenticeChange}
              >
                <option value="">Choose an apprentice</option>
                {apprentices?.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className={s.dateContainer}>
            <label className={monthClass}>
              Month
              <select
                className={cx(s.input, s.date)}
                name="month"
                id="month"
                onChange={handleMonthChange}
                autoFocus={!supervisor}
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
                  value={input.value}
                />
              </label>
            ))}
          </div>
          {!supervisor && (
            <label className={signatureClass}>
              <input
                type="checkbox"
                onChange={() => setApprenticeSignature(!apprenticeSignature)}
              />
              <span>Apprentice has signed</span>
            </label>
          )}
        </div>
      </div>
      {supervisor && (
        <label className={supervisorSignatureClass}>
          <input
            type="checkbox"
            onChange={() => setSupervisorSignature(!supervisorSignature)}
          />
          <span className={s.supervisorApproval}>
            This is true to the best of my knowledge as a member Training Agent
            of the LRT Apprenticeship Program administered by the RE-JATC
          </span>
        </label>
      )}
      <div className={s.submitContainer}>
        <input className={s.submitBtn} type="submit" value="Upload" />
      </div>
    </form>
  );
};
