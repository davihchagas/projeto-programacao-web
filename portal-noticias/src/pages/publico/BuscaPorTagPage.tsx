import { useParams, Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./BuscaPorTagPage.module.css";

import { tags } from "../../data/tags";
import { noticias } from "../../data/noticias";

export default function BuscaPorTagPage() {
  const { slug } = useParams();

  // Tag atual
  const tagAtual = tags.find((tag) => tag.slug === slug);

  // Notícias filtradas pela tag
  const noticiasFiltradas = noticias.filter(
    (n) => n.tags.includes(tagAtual?.id || -1) && n.publicada
  );

  // Tags relacionadas (todas menos a atual)
  const tagsRelacionadas = tags.filter((t) => t.slug !== slug).slice(0, 5);

  if (!tagAtual) {
    return (
      <PageLayout title="Tag não encontrada">
        <p>Tag não encontrada.</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Busca por Tag">
      <div className={styles.container}>
        {/* Tag principal */}
        <div className={styles.tagHeader}>
          <span className={styles.tagBadge}>
            #{tagAtual.nome}
          </span>
        </div>

        {/* Grid de notícias */}
        <div className={styles.grid}>
          {noticiasFiltradas.map((noticia) => (
            <div key={noticia.id} className={styles.card}>
              <img src={noticia.imagemCapa} alt="" />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.subtitulo}</p>

              <Link to={`/noticia/${noticia.id}`}>
                Ler mais
              </Link>
            </div>
          ))}
        </div>

        {/* Tags relacionadas */}
        <div className={styles.related}>
          <h3>Tags Relacionadas</h3>

          <div className={styles.tags}>
            {tagsRelacionadas.map((tag) => (
              <Link
                key={tag.id}
                to={`/busca/tag/${tag.slug}`}
                className={styles.tagSmall}
              >
                #{tag.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}