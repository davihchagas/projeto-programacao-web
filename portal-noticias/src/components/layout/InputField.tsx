import styles from "./InputField.module.css";

export default function InputField(props: any) {
  return <input className={styles.input} {...props} />;
}