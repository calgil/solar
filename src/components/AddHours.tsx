/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/AddHours.module.scss";

export const AddHours = () => {
  return (
    <form className={s.addHours}>
      <div>File Input</div>
      <div className={s.rightCol}>
        <label>
          Month:
          <select name="month" id="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
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
            defaultValue={new Date().getFullYear()}
          />
        </label>
      </div>
    </form>
  );
};
