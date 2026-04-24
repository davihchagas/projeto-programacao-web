import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./CrudTagsPage.module.css";

import { tags } from "../../data/tags";
import { noticias } from "../../data/noticias";

export default function CrudTagsPage() {
  function handleDelete(id: number) {
    const confirm = window.confirm("Deseja excluir esta tag?");
    if (!confirm) return;

    alert("Tag excluída (simulação)");
  }

  return (
    <PageLayout title="Tags">
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Tags</h2>

          <Link
            to="/admin/tags/nova"
            className={styles.newButton}
          >
            + Nova Tag
          </Link>
        </div>

        {/* TABELA */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Slug</th>
              <th>Qtd. Notícias</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tags.map((tag) => {
              const qtdNoticias = noticias.filter((n) =>
                n.tags.includes(tag.id)
              ).length;

              return (
                <tr key={tag.id}>
                  <td>{tag.id}</td>

                  {/* TAG BADGE */}
                  <td>
                    <span className={styles.badge}>
                      #{tag.nome}
                    </span>
                  </td>

                  <td>{tag.slug}</td>
                  <td>{qtdNoticias}</td>

                  <td className={styles.actions}>
                    <Link
                      to={`/admin/tags/${tag.id}/editar`}
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() => handleDelete(tag.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </PageLayout>
  );
}