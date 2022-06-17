import styles from "./InputWthLabelReadonly.module.scss";

interface IInputWthLabelReadonly {
  label: string;
  value: string;
  marginTop?: string;
  marginBottom?: string;
}

const InputWthLabelReadonly = ({
  label,
  value,
  marginTop,
  marginBottom,
}: IInputWthLabelReadonly) => {
  return (
    <div style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <label className={styles.label}>{label}</label>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default InputWthLabelReadonly;
