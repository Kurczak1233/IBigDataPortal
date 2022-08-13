/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./DatepickerWithLabel.module.scss";
import DatePicker from "react-datepicker";
import { Control, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { enGbLocale } from "constants/dateFormatLocale";

interface IDatepickerWithLabel {
  label: string;
  registerName: string;
  placeholder: string;
  control: Control<any, any>;
  marginBottom?: string;
  marginTop?: string;
}

const DatepickerWithLabel = ({
  label,
  registerName,
  placeholder,
  marginBottom,
  control,
  marginTop,
}: IDatepickerWithLabel) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
    >
      <label className={styles.label}>{label}</label>
      <Controller
        control={control}
        name={registerName}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            className={styles.input}
            wrapperClassName="date-picker"
            selected={value}
            onChange={onChange}
            popperPlacement={"bottom"}
            placeholderText={placeholder}
            // className={
            //   selectedChangeEvent.editPermission
            //     ? "task__data-picker-wrapper"
            //     : "task__data-picker-wrapper no_hover"
            // }
            // dateFormat={dateFormat}
            onChangeRaw={(e) => e.preventDefault()}
            locale={enGbLocale}
            isClearable
            // disabled={!selectedChangeEvent.editPermission}
            //   customInput={
            //     <div className="deadline-date-button">
            //       <span className="deadline-date-button--text">
            //         {value
            //           ? format(new Date(value), dateFormatSlashes)
            //           : <span className={styles.placeholder}>{placeholder}</span>}
            //       </span>
            //       {/* <img src={CalendarIcon} alt={"Calendar icon"} /> */}
            //     </div>
            //   }
          />
        )}
      />
    </div>
  );
};

export default DatepickerWithLabel;
