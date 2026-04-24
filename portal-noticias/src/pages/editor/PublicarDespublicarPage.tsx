import { useParams, useNavigate, Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./PublicarDespublicarPage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { tags } from "../../data/tags";

export default function PublicarDespublicarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticia = noticias.find((n) => n.id === Number(id));

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

  function handleTogglePublicacao() {
    const confirmacao = window.confirm(
      noticia.publicada
        ? "Deseja despublicar esta notícia?"
        : "Deseja publicar esta notícia?"
    );

    if (!confirmacao) return;

    // simulação
    alert(
      noticia.publicada
        ? "Notícia despublicada"
        : "Notícia publicada"
    );

    navigate("/editor/painel");
  }

  return (
    <PageLayout title="Revisar Notícia">
      <div className={styles.container}>
        
        {/* PAINEL DE AÇÃO */}
        <div className={styles.panel}>
          <span
            className={
              noticia.publicada
                ? styles.published
                : styles.draft
            }
          >
            {noticia.publicada ? "Publicada" : "Rascunho"}
          </span>

          <div className={styles.meta}>
            <span>{noticia.criadoEm}</span>
            <span>{autor?.nome}</span>
          </div>

          <button
            onClick={handleTogglePublicacao}
            className={styles.button}
          >
            {noticia.publicada
              ? "Despublicar"
              : "Publicar"}
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className={styles.content}>
          
          {/* BREADCRUMB */}
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt;{" "}
            <span>{noticia.titulo}</span>
          </div>

          {/* IMAGEM */}
          <img
            src={noticia.imagemCapa}
            className={styles.image}
          />

          {/* TÍTULO */}
          <h1>{noticia.titulo}</h1>
          <h2>{noticia.subtitulo}</h2>

          {/* META */}
          <div className={styles.meta}>
            <span>{autor?.nome}</span>
            <span>
              {cidade?.nome} - {uf?.sigla}
            </span>
            <span>{noticia.visualizacoes} views</span>
          </div>

          {/* TAGS */}
          <div className={styles.tags}>
            {tags
              .filter((t) => noticia.tags.includes(t.id))
              .map((t) => (
                <span key={t.id} className={styles.tag}>
                  #{t.nome}
                </span>
              ))}
          </div>

          {/* CONTEÚDO TEXTO */}
          <div className={styles.text}>
            {noticia.conteudo.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

        </div>
      </div>
    </PageLayout>
  );
}