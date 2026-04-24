import { useNavigate, Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <PageLayout title="Login" showBackButton={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Logo */}
          <h2 className={styles.logo}>Portal de Notícias</h2>

          {/* Form */}
          <form className={styles.form}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Senha"
              className={styles.input}
            />

            <div className={styles.remember}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Lembrar-me</label>
            </div>

            <button type="submit" className={styles.button}>
              Entrar
            </button>
          </form>

          {/* Links */}
          <div className={styles.links}>
            <Link to="/lembrar-senha">Esqueci minha senha</Link>
            <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
          </div>

          {/* Acesso rápido */}
          <div className={styles.devSection}>
            <h3>Acesso Rápido (Desenvolvimento)</h3>

            <div className={styles.devButtons}>
              <button onClick={() => navigate("/leitor/perfil")}>
                LEITOR
              </button>

              <button onClick={() => navigate("/autor/noticias")}>
                AUTOR
              </button>

              <button onClick={() => navigate("/editor/painel")}>
                EDITOR
              </button>

              <button onClick={() => navigate("/admin/dashboard")}>
                SUPERADMIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}