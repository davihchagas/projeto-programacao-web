import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./LembrarSenhaPage.module.css";

export default function LembrarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Simulação de envio
    if (email) {
      setEnviado(true);
    }
  }

  return (
    <PageLayout title="Recuperar Senha" showBackButton={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Recuperar Senha</h2>

          <p className={styles.description}>
            Digite seu e-mail para redefinir sua senha.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </form>

          {enviado && (
            <p className={styles.success}>
              E-mail enviado com sucesso! Verifique sua caixa de entrada.
            </p>
          )}

          <div className={styles.links}>
            <Link to="/login">Voltar para Login</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}