import { useNavigate } from "react-router";
import styles from "./Hero.module.css";


export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <img src="https://via.placeholder.com/1200x300" />

      <div className={styles.overlay}>
        <h2>Notícia em destaque</h2>
        <button onClick={() => navigate("/noticia/1")}>
          Ler mais
        </button>
      </div>
    </section>
  );
}