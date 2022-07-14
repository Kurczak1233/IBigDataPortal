/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { UseFormRegister } from "react-hook-form";
import styles from "./InputWithLabel.module.scss";

interface IInputWithLabel {
  label: string;
  placeholder: string;
  registerName: string;
  registerOptions?: any;
  register: UseFormRegister<any>;
  errors: any;
  errorMessage: string;
  marginTop?: string;
  marginBottom?: string;
  height?: string;
  justifyContent?: string;
}

const InputWithLabel = ({
  label,
  placeholder,
  registerName,
  registerOptions,
  errors,
  errorMessage,
  register,
  marginBottom,
  marginTop,
  height = "96px",
  justifyContent,
}: IInputWithLabel) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
        height: height,
        justifyContent: justifyContent,
      }}
    >
      <label className={styles.label}>
        {label}
        {errors[registerName] && (
          <span className={styles.error}>{errorMessage}</span>
        )}
      </label>
      <input
        {...register(registerName, registerOptions && registerOptions)}
        className={styles.input}
        placeholder={placeholder}
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

export default InputWithLabel;
