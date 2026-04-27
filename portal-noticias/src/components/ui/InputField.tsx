import styles from "./InputField.module.css";

type Props = {
  children?: React.ReactNode
  type?: string
  placeholder?: string
  value?: string
  onChange?: () => void;
};

export default function InputField(props: Props) {
  return <input className={styles.input} {...props} />;
}