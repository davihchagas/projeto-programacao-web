import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary" | "success";
  onClick?: () => void;
  full?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  full,
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${
        full ? styles.full : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}