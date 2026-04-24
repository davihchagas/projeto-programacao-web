import { useParams, Link } from "react-router";
import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./DetalheNoticiaPage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { tags } from "../../data/tags";
import { comentarios as comentariosData } from "../../data/comentarios";

export default function DetalheNoticiaPage() {
  const { id } = useParams();

  const noticia = noticias.find((n) => n.id === Number(id));

  const [comentarios, setComentarios] = useState(
    comentariosData.filter((c) => c.noticiaId === Number(id) && c.aprovado),
  );

  const [novoComentario, setNovoComentario] = useState("");

  if (!noticia) {
    return (
      <PageLayout title="Notícia não encontrada">
        Notícia não encontrada
      </PageLayout>
    );
  }

  const autor = usuarios.find((u) => u.id === noticia.autorId);
  const cidade = cidades.find((c) => c.id === noticia.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const tagsDaNoticia = tags.filter((t) => noticia.tags.includes(t.id));

  const noticiasRecentes = noticias
    .filter((n) => n.publicada && n.id !== noticia.id)
    .slice(0, 5);

  function handleComentario() {
    if (!novoComentario.trim()) return;

    if (!noticia) {
      return (
        <PageLayout title="Notícia não encontrada">
          Notícia não encontrada
        </PageLayout>
      );
    }

    const noticiaSafe = noticia;

    const novo = {
      id: Date.now() + Math.random(),
      noticiaId: noticiaSafe.id,
      autorId: 1,
      texto: novoComentario,
      criadoEm: new Date().toISOString(),
      aprovado: true,
    };

    setComentarios([novo, ...comentarios]);
    setNovoComentario("");
  }

  return (
    <PageLayout title={noticia.titulo}>
      <div className={styles.container}>
        {/* MAIN */}
        <main className={styles.main}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt;{" "}
            {tagsDaNoticia[0] && (
              <>
                <Link to={`/busca/tag/${tagsDaNoticia[0].slug}`}>
                  {tagsDaNoticia[0].nome}
                </Link>{" "}
                &gt;{" "}
              </>
            )}
            <strong>{noticia.titulo}</strong>
          </div>

          {/* Imagem */}
          <img src={noticia.imagemCapa} className={styles.image} />

          {/* Título */}
          <h1>{noticia.titulo}</h1>
          <h2 className={styles.subtitle}>{noticia.subtitulo}</h2>

          {/* Metadados */}
          <div className={styles.meta}>
            <div className={styles.author}>
              <img
                src="https://via.placeholder.com/40"
                className={styles.avatar}
              />
              <span>{autor?.nome}</span>
            </div>

            <span>{noticia.criadoEm}</span>
            <span>{noticia.visualizacoes} visualizações</span>
            <span>
              {cidade?.nome} - {uf?.sigla}
            </span>
          </div>

          {/* Tags */}
          <div className={styles.tags}>
            {tagsDaNoticia.map((tag) => (
              <Link
                key={tag.id}
                to={`/busca/tag/${tag.slug}`}
                className={styles.tag}
              >
                #{tag.nome}
              </Link>
            ))}
          </div>

          {/* Conteúdo */}
          <div className={styles.content}>
            {noticia.conteudo.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Comentários */}
          <div className={styles.comments}>
            <h3>Comentários ({comentarios.length})</h3>

            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Escreva um comentário..."
              className={styles.textarea}
            />

            <button onClick={handleComentario} className={styles.button}>
              Enviar Comentário
            </button>

            <div className={styles.commentList}>
              {comentarios.map((c) => {
                const user = usuarios.find((u) => u.id === c.autorId);

                return (
                  <div key={c.id} className={styles.comment}>
                    <img
                      src="https://via.placeholder.com/35"
                      className={styles.avatar}
                    />
                    <div>
                      <strong>{user?.nome}</strong>
                      <span className={styles.date}>{c.criadoEm}</span>
                      <p>{c.texto}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          {/* Autor */}
          <div className={styles.card}>
            <h3>Sobre o Autor</h3>
            <img src="https://via.placeholder.com/80" />
            <p>{autor?.nome}</p>
            <p>Bio do autor...</p>
            <p>
              {noticias.filter((n) => n.autorId === autor?.id).length} notícias
            </p>
          </div>

          {/* Recentes */}
          <div className={styles.card}>
            <h3>Notícias Recentes</h3>
            {noticiasRecentes.map((n) => (
              <Link
                key={n.id}
                to={`/noticia/${n.id}`}
                className={styles.recent}
              >
                <img src={n.imagemCapa} />
                <div>
                  <p>{n.titulo}</p>
                  <span>{n.criadoEm}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tags */}
          <div className={styles.card}>
            <h3>Tags Populares</h3>
            <div className={styles.tags}>
              {tags.slice(0, 8).map((tag) => (
                <Link
                  key={tag.id}
                  to={`/busca/tag/${tag.slug}`}
                  className={styles.tag}
                >
                  #{tag.nome}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
