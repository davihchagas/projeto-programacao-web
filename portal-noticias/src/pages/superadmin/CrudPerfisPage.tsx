import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudPerfisPage.module.css";

import { usuarios } from "../../data/usuarios";

export default function CrudPerfisPage() {
  const perfis = [
    {
      nome: "LEITOR",
      descricao: "Pode visualizar notícias e comentar.",
      cor: styles.leitor,
    },
    {
      nome: "AUTOR",
      descricao: "Pode criar e editar suas próprias notícias.",
      cor: styles.autor,
    },
    {
      nome: "EDITOR",
      descricao: "Pode revisar, editar e publicar notícias.",
      cor: styles.editor,
    },
    {
      nome: "SUPERADMIN",
      descricao: "Acesso total ao sistema.",
      cor: styles.admin,
    },
  ];

  return (
    <PageLayout title="Perfis de Usuário">
      <div className={styles.container}>
        
        <div className={styles.grid}>
          {perfis.map((perfil) => {
            const qtd = usuarios.filter(
              (u) => u.perfil === perfil.nome
            ).length;

            return (
              <div
                key={perfil.nome}
                className={`${styles.card} ${perfil.cor}`}
              >
                <h3>{perfil.nome}</h3>

                <p>{perfil.descricao}</p>

                <strong>{qtd} usuários</strong>
              </div>
            );
          })}
        </div>

      </div>
    </PageLayout>
  );
}