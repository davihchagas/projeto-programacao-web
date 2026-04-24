import { Link } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <PageLayout title="Página não encontrada">
      <div className={styles.container}>
        
        <h1 className={styles.code}>404</h1>

        <h2>Página não encontrada</h2>

        <p>
          A página que você está procurando não existe ou foi removida.
        </p>

        {/* AÇÕES */}
        <div className={styles.actions}>
          <Link to="/" className={styles.primary}>
            Voltar para Home
          </Link>

          <Link to="/login" className={styles.secondary}>
            Ir para Login
          </Link>
        </div>

        {/* LINKS ÚTEIS */}
        <div className={styles.links}>
          <Link to="/busca/tag/tecnologia">Tecnologia</Link>
          <Link to="/busca/tag/politica">Política</Link>
          <Link to="/busca/tag/esportes">Esportes</Link>
        </div>

      </div>
    </PageLayout>
  );
}