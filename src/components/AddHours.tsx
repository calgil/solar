/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { months } from "../data/months";
import { createMpr } from "../firebase/mpr/createMpr";
import s from "../styles/components/AddHours.module.scss";
import { InputType } from "../types/input.type";
import { User } from "../types/user.type";
import classNames from "classnames/bind";
import { MprType } from "../types/mpr.type";
import { updateMpr } from "../firebase/mpr/updateMpr";
import { UploadFile } from "./UploadFile";
import { getUserById } from "../fetch/auth/getUserById";
import { displayDate } from "../utils/displayDate";
import { capitalizeName } from "../utils/capitalizeName";
import { deleteRecord } from "../firebase/training/deleteRecord";
import { deleteFile } from "../firebase/mpr/deleteFile";

const cx = classNames.bind(s);

type AddHoursProps = {
  user: User;
  closeModal: () => void;
  supervisor?: boolean;
  apprentices?: User[];
  mpr?: MprType;
};

export const AddHours = ({
  user,
  closeModal,
  supervisor,
  apprentices,
  mpr,
}: AddHoursProps) => {
  console.log("render");

  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(
    mpr ? mpr.date.toDate().getMonth() + 1 : currentMonth - 1
  );

  const [year, setYear] = useState(
    mpr?.date.toDate().getFullYear() || +new Date().getFullYear()
  );

  const [pvHours, setPvHours] = useState(mpr?.pvHours || 0);
  const [otherREHours, setOtherREHours] = useState(mpr?.otherREHours || 0);
  const [bosHours, setBosHours] = useState(mpr?.bosHours || 0);
  const [otherHours, setOtherHours] = useState(mpr?.otherHours || 0);
  const totalHours = [pvHours, otherREHours, bosHours, otherHours].reduce(
    (acc, val) => acc + val,
    0
  );
  const [apprenticeSignature, setApprenticeSignature] = useState(
    mpr?.apprenticeSignature || false
  );
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState<string | null>(
    mpr?.photoUrl || null
  );
  const [photoPath, setPhotoPath] = useState("");

  const [selectedApprentice, setSelectedApprentice] = useState<User | null>(
    null
  );
  const [supervisorSignature, setSupervisorSignature] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photoDateError, setPhotoDateError] = useState(false);
  const [photoApprenticeError, setPhotoApprenticeError] = useState(false);

  const [supervisorData, setSupervisorData] = useState<User | null>(null);

  const hoursInputs: InputType[] = [
    {
      id: "PS",
      labelText: "Photovalic Systems",
      type: "number",
      name: "PS",
      value: pvHours,
      placeholder: "0",
      onChange: (e) => setPvHours(Number(e.target.value)),
      autoComplete: "off",
    },
    {
      id: "ORES",
      labelText: "Other Renewable Energy Systems",
      type: "number",
      name: "ORES",
      value: otherREHours,
      placeholder: "0",
      onChange: (e) => setOtherREHours(Number(e.target.value)),
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
      if (photoApprenticeError) {
        setPhotoApprenticeError(false);
      }
      const apprentice = apprentices?.find((app) => app.id === e.target.value);
      if (apprentice) {
        setSelectedApprentice(apprentice);
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      if (photoDateError) {
        setPhotoDateError(false);
      }
      setMonth(+e.target.value);
    }
  };

  const handlePhotoChange = (
    url: string | null,
    folder: string,
    fileName: string
  ) => {
    setUploadPhotoUrl(url);
    setPhotoPath(`${folder}/${fileName}`);
  };

  const handleDeleteMpr = () => {
    window.confirm(
      "Are you sure you want to delete the MPR? This action is irreversible"
    );
    if (!mpr) {
      return;
    }
    deleteRecord("mprs", mpr.id);
    deleteFile(mpr.photoPath);
  };

  const uploadMPR = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitted(true);

    if (!+month || !uploadPhotoUrl || !totalHours) {
      return;
    }

    if (!supervisor && !apprenticeSignature) {
      console.log("no apprentice signature");

      return;
    }
    if (supervisor && !supervisorSignature) {
      console.log("no supervisor signature");

      return;
    }

    if (!supervisor && !user.supervisorId) {
      return;
    }

    const date = new Date(year, month - 1);

    if (date > new Date()) {
      return;
    }

    if (mpr) {
      updateMpr(mpr.id, {
        apprenticeId: mpr.apprenticeId,
        apprenticeName: mpr.apprenticeName,
        date,
        dateApproved: new Date(),
        photoUrl: uploadPhotoUrl,
        photoPath,
        pvHours: pvHours,
        otherREHours,
        bosHours,
        otherHours,
        totalHours,
        apprenticeSignature: mpr.apprenticeSignature,
        supervisorSignature,
        supervisorId: user.id,
      });
      return closeModal();
    }

    if (supervisor && selectedApprentice) {
      createMpr({
        apprenticeId: selectedApprentice.id,
        apprenticeName: selectedApprentice.name,
        date,
        dateApproved: new Date(),
        photoUrl: uploadPhotoUrl,
        photoPath,
        pvHours: pvHours,
        otherREHours,
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
      return;
    }

    createMpr({
      apprenticeId: user.id,
      apprenticeName: user.name,
      date,
      dateApproved: null,
      photoUrl: uploadPhotoUrl,
      photoPath,
      pvHours: pvHours,
      otherREHours: otherREHours,
      bosHours,
      otherHours,
      totalHours,
      apprenticeSignature,
      supervisorSignature: false,
      supervisorId: user.supervisorId,
    });

    closeModal();
  };

  useEffect(() => {
    if (mpr && mpr.supervisorId) {
      getUserById(mpr.supervisorId, setSupervisorData);
    }
  }, [mpr?.supervisorId]);

  const apprenticeClass = cx({
    label: true,
    invalid:
      photoApprenticeError ||
      (supervisor && !selectedApprentice && isSubmitted),
  });

  const dateClass = cx({
    dateContainer: true,
    invalid:
      isSubmitted &&
      new Date(year, month + 1) >
        new Date(new Date().getFullYear(), currentMonth),
  });

  const monthClass = cx({
    label: true,
    invalid: (!month && isSubmitted) || photoDateError,
  });

  const yearClass = cx({
    label: true,
    invalid: !year && isSubmitted,
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
          {supervisor && !mpr && (
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
          <div className={dateClass}>
            <div className={s.date}>
              <label className={monthClass}>
                Month
                <select
                  className={cx(s.input, s.date)}
                  name="month"
                  id="month"
                  onChange={handleMonthChange}
                  autoFocus={!supervisor}
                  value={month}
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
                  min="1970"
                  max="3000"
                  step="1"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                />
              </label>
            </div>
            <span className={s.dateError}>Cannot submit future MPR </span>
          </div>

          <UploadFile
            isSubmitted={isSubmitted}
            photoUrl={mpr?.photoUrl}
            photoPath={mpr?.photoPath}
            apprenticeName={supervisor ? selectedApprentice?.name : user?.name}
            month={month}
            year={year}
            onPhotoChange={handlePhotoChange}
            folder="mprs"
          />
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
              <span>
                I hereby certify, to the best of my knowledge, that the hours
                submitted are accurate and complete
              </span>
            </label>
          )}
        </div>
      </div>
      {supervisor && !mpr?.supervisorSignature && (
        <label className={supervisorSignatureClass}>
          <input
            type="checkbox"
            onChange={() => setSupervisorSignature(!supervisorSignature)}
          />
          <span className={s.supervisorApproval}>
            As a member Training Agent of the LRT Apprenticeship Program, I
            hereby certify, to the best of my knowledge, that the hours
            submitted are accurate and complete
          </span>
        </label>
      )}
      {mpr?.supervisorSignature && (
        <div className={s.approvalInfo}>
          Approved by {capitalizeName(supervisorData?.name)}{" "}
          {displayDate(mpr.dateApproved)}
        </div>
      )}
      <div className={s.submitContainer}>
        {user?.role === "admin" && (
          <div className={s.deleteBtn} onClick={handleDeleteMpr}>
            Delete
          </div>
        )}
        {!mpr?.supervisorSignature && (
          <input className={s.submitBtn} type="submit" value="Upload" />
        )}
      </div>
    </form>
  );
};
