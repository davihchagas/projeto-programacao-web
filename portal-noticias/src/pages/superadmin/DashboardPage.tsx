import PageLayout from "../../components/layout/PageLayout";
import styles from "./DashboardPage.module.css";

import { usuarios } from "../../data/usuarios";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";
import { ufs } from "../../data/ufs";
import { tags } from "../../data/tags";

export default function DashboardPage() {
  // 📊 MÉTRICAS
  const totalUsuarios = usuarios.length;
  const publicadas = noticias.filter((n) => n.publicada);
  const rascunhos = noticias.filter((n) => !n.publicada);
  const totalComentarios = comentarios.length;
  const totalUFs = ufs.length;
  const totalTags = tags.length;

  // 📊 gráfico (mock por mês)
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const valores = [5, 10, 8, 15, 7, 12];
  const max = Math.max(...valores);

  // 📋 últimos usuários
  const ultimosUsuarios = usuarios.slice(0, 5);

  // 📰 últimas notícias
  const ultimasNoticias = noticias.slice(0, 5);

  return (
    <PageLayout title="Dashboard">
      <div className={styles.container}>
        
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/ufs">UFs</a>
          <a href="/admin/cidades">Cidades</a>
          <a href="/admin/tags">Tags</a>
          <a href="/admin/perfis">Perfis</a>
          <a href="/admin/noticias">Notícias</a>
          <a href="/admin/usuarios">Usuários</a>
          <a href="/admin/comentarios">Comentários</a>
        </aside>

        <main className={styles.main}>
          
          {/* CARDS */}
          <div className={styles.cards}>
            <div className={styles.card}>
              <span>👥</span>
              <strong>{totalUsuarios}</strong>
              <p>Usuários</p>
            </div>

            <div className={styles.card}>
              <span>📰</span>
              <strong>{publicadas.length}</strong>
              <p>Publicadas</p>
            </div>

            <div className={styles.card}>
              <span>📝</span>
              <strong>{rascunhos.length}</strong>
              <p>Rascunhos</p>
            </div>

            <div className={styles.card}>
              <span>💬</span>
              <strong>{totalComentarios}</strong>
              <p>Comentários</p>
            </div>

            <div className={styles.card}>
              <span>📍</span>
              <strong>{totalUFs}</strong>
              <p>UFs</p>
            </div>

            <div className={styles.card}>
              <span>🏷</span>
              <strong>{totalTags}</strong>
              <p>Tags</p>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className={styles.section}>
            <h3>Notícias por mês</h3>

            <div className={styles.chart}>
              {valores.map((v, i) => (
                <div key={i} className={styles.barWrapper}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(v / max) * 100}%`,
                    }}
                  />
                  <span>{meses[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TABELAS */}
          <div className={styles.tables}>
            
            {/* USUÁRIOS */}
            <div className={styles.section}>
              <h3>Últimos Usuários</h3>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {ultimosUsuarios.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <img
                          src="https://via.placeholder.com/40"
                          className={styles.avatar}
                        />
                      </td>
                      <td>{u.nome}</td>
                      <td>{u.email}</td>
                      <td>{u.perfil}</td>
                      <td>{u.criadoEm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* NOTÍCIAS */}
            <div className={styles.section}>
              <h3>Últimas Notícias</h3>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {ultimasNoticias.map((n) => {
                    const autor = usuarios.find(
                      (u) => u.id === n.autorId
                    );

                    return (
                      <tr key={n.id}>
                        <td>{n.titulo}</td>
                        <td>{autor?.nome}</td>
                        <td>
                          {n.publicada ? "Publicada" : "Rascunho"}
                        </td>
                        <td>{n.criadoEm}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </main>
      </div>
    </PageLayout>
  );
}