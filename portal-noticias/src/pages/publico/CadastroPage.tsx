import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CadastroPage.module.css";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectedField";
import Button from "../../components/ui/Button";

export default function CadastroPage() {
  return (
    <PageLayout title="Cadastro" showBackButton={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Criar Conta</h2>

          <form className={styles.form}>
            <InputField
              type="text"
              placeholder="Nome completo"
            />

            <InputField
              type="email"
              placeholder="E-mail"
            />

            <InputField
              type="password"
              placeholder="Senha"
            />

            <InputField
              type="password"
              placeholder="Confirmar senha"
            />

            <SelectField className={styles.input}>
              <option>Selecione a UF</option>
              <option>SP</option>
              <option>RJ</option>
              <option>MG</option>
            </SelectField>

            <SelectField className={styles.input}>
              <option>Selecione a cidade</option>
              <option>São Paulo</option>
              <option>Rio de Janeiro</option>
              <option>Belo Horizonte</option>
            </SelectField>

            <textarea
              placeholder="Bio (opcional)"
              className={styles.textarea}
              rows={4}
            />

            <Button type="submit">
              Criar Conta
            </Button>
          </form>

          <div className={styles.links}>
            <Link to="/login">Já tem conta? Faça login</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}