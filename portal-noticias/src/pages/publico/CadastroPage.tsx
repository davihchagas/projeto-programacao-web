import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CadastroPage.module.css";

export default function CadastroPage() {
  return (
    <PageLayout title="Cadastro" showBackButton={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Criar Conta</h2>

          <form className={styles.form}>
            <input
              type="text"
              placeholder="Nome completo"
              className={styles.input}
            />

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

            <input
              type="password"
              placeholder="Confirmar senha"
              className={styles.input}
            />

            <select className={styles.input}>
              <option>Selecione a UF</option>
              <option>SP</option>
              <option>RJ</option>
              <option>MG</option>
            </select>

            <select className={styles.input}>
              <option>Selecione a cidade</option>
              <option>São Paulo</option>
              <option>Rio de Janeiro</option>
              <option>Belo Horizonte</option>
            </select>

            <textarea
              placeholder="Bio (opcional)"
              className={styles.textarea}
              rows={4}
            />

            <button type="submit" className={styles.button}>
              Criar Conta
            </button>
          </form>

          <div className={styles.links}>
            <Link to="/login">Já tem conta? Faça login</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}