import PageLayout from "../../components/layout/PageLayout";
import styles from "./PainelEditorPage.module.css";

import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";
import { usuarios } from "../../data/usuarios";
import { tags } from "../../data/tags";
import Button from "../../components/ui/Button";

export default function PainelEditorPage() {
  // 📊 MÉTRICAS
  const publicadas = noticias.filter((n) => n.publicada);
  const rascunhos = noticias.filter((n) => !n.publicada);
  const comentariosPendentes = comentarios.filter((c) => !c.aprovado);
  const autores = usuarios.filter((u) => u.perfil === "AUTOR");

  // 📰 Notícias pendentes
  const noticiasPendentes = rascunhos;

  // 💬 Comentários pendentes
  const comentariosParaModerar = comentariosPendentes.slice(0, 5);

  // 📊 gráfico: notícias por tag
  const tagCount = tags.map((tag) => {
    const count = noticias.filter((n) =>
      n.tags.includes(tag.id)
    ).length;

    return { ...tag, count };
  });

  const max = Math.max(...tagCount.map((t) => t.count), 1);

  return (
    <PageLayout title="Painel do Editor">
      <div className={styles.container}>
        
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <a href="#">Painel</a>
          <a href="/editor/perfil">Perfil</a>
        </aside>

        <main className={styles.main}>
          
          {/* CARDS */}
          <div className={styles.cards}>
            <div className={styles.card}>
              <p>Publicadas</p>
              <strong>{publicadas.length}</strong>
            </div>

            <div className={styles.card}>
              <p>Rascunhos</p>
              <strong>{rascunhos.length}</strong>
            </div>

            <div className={styles.card}>
              <p>Comentários Pendentes</p>
              <strong>{comentariosPendentes.length}</strong>
            </div>

            <div className={styles.card}>
              <p>Autores</p>
              <strong>{autores.length}</strong>
            </div>
          </div>

          {/* TABELA NOTÍCIAS */}
          <div className={styles.section}>
            <h3>Notícias Pendentes</h3>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {noticiasPendentes.map((n) => {
                  const autor = usuarios.find(
                    (u) => u.id === n.autorId
                  );

                  return (
                    <tr key={n.id}>
                      <td>{n.titulo}</td>
                      <td>{autor?.nome}</td>
                      <td>{n.criadoEm}</td>

                      <td>
                        <Button className={styles.approve}>
                          ✔
                        </Button>

                        <Button className={styles.reject}>
                          ✖
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* COMENTÁRIOS */}
          <div className={styles.section}>
            <h3>Comentários para Moderar</h3>

            {comentariosParaModerar.map((c) => {
              const autor = usuarios.find(
                (u) => u.id === c.autorId
              );

              return (
                <div key={c.id} className={styles.comment}>
                  <p>{c.texto}</p>
                  <span>{autor?.nome}</span>

                  <div className={styles.actions}>
                    <Button className={styles.approve}>
                      Aprovar
                    </Button>

                    <Button className={styles.reject}>
                      Rejeitar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GRÁFICO */}
          <div className={styles.section}>
            <h3>Notícias por Tag</h3>

            <div className={styles.chart}>
              {tagCount.map((t) => (
                <div key={t.id} className={styles.barRow}>
                  <span>{t.nome}</span>

                  <div className={styles.bar}>
                    <div
                      className={styles.fill}
                      style={{
                        width: `${(t.count / max) * 100}%`,
                      }}
                    />
                  </div>

                  <span>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </PageLayout>
  );
}