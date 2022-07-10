/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { UseFormRegister } from "react-hook-form";
import styles from "./TextareaWithLabel.module.scss";

interface ITextareaWithLabel {
  label: string;
  placeholder: string;
  registerName: string;
  registerOptions?: any;
  register: UseFormRegister<any>;
  errors: any;
  errorMessage: string;
  marginTop?: string;
  marginBottom?: string;
}

const TextareaWithLabel = ({
  label,
  placeholder,
  registerName,
  registerOptions,
  errors,
  errorMessage,
  register,
  marginBottom,
  marginTop,
}: ITextareaWithLabel) => {
  return (
    <div
      className={styles.wrapper}
      style={{ marginBottom: marginBottom, marginTop: marginTop }}
    >
      <label className={styles.label}>
        {label}
        {errors[registerName] && (
          <span className={styles.error}>{errorMessage}</span>
        )}
      </label>
      <textarea
        {...register(registerName, registerOptions && registerOptions)}
        className={styles.textarea}
        placeholder={placeholder}
        defaultValue={""}
        style={{
          border:
            errors[registerName] &&
            `1px solid #${AvailableIntensiveColors.IntensiveRed}`,
          boxShadow:
            errors[registerName] &&
            `0px 0px 4px #${AvailableIntensiveColors.IntensiveRed}`,
        }}
      />
    </div>
  );
};

export default TextareaWithLabel;
