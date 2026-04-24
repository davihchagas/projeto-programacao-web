import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
};

export default function PageLayout({
  title,
  children,
  showBackButton = true,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={styles.container}>
        <header style={styles.header}>
          {showBackButton && (
            <button style={styles.button} onClick={() => navigate(-1)}>
              ← Voltar
            </button>
          )}
          <h1>{title}</h1>
        </header>

        <main style={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  main: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
  },
};
