import { useNavigate, Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./LoginPage.module.css";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <PageLayout title="Login" showBackButton={false}>
      <div className={styles.container}>
        <Card>
          {/* Logo */}
          <h2 className={styles.logo}>Portal de Notícias</h2>

          {/* Form */}
          <form className={styles.form}>
            <InputField
              type="email"
              placeholder="E-mail"
            />

            <InputField
              type="password"
              placeholder="Senha"
            />

            <div className={styles.remember}>
              <InputField type="checkbox" id="remember" />
              <label htmlFor="remember">Lembrar-me</label>
            </div>

            <Button type="submit" variant="primary">
              Entrar
            </Button>
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
              <Button onClick={() => navigate("/leitor/perfil")}>
                LEITOR
              </Button>

              <Button onClick={() => navigate("/autor/noticias")}>
                AUTOR
              </Button>

              <Button onClick={() => navigate("/editor/painel")}>
                EDITOR
              </Button>

              <Button onClick={() => navigate("/admin/dashboard")}>
                SUPERADMIN
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}