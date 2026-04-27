import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary" | "success";
  onClick?: () => void;
  full?: boolean;
  type?: string
  disabled?: boolean
  className?: string
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  full,
  className
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className} ${
        full ? styles.full : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}