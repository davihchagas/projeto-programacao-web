import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./LembrarSenhaPage.module.css";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

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
        <Card>
          <h2 className={styles.title}>Recuperar Senha</h2>

          <p className={styles.description}>
            Digite seu e-mail para redefinir sua senha.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit">
              Enviar
            </Button>
          </form>

          {enviado && (
            <p className={styles.success}>
              E-mail enviado com sucesso! Verifique sua caixa de entrada.
            </p>
          )}

          <div className={styles.links}>
            <Link to="/login">Voltar para Login</Link>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}