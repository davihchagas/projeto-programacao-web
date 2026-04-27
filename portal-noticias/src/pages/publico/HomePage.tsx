import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./HomePage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { tags } from "../../data/tags";
import { ufs } from "../../data/ufs";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectedField";

export default function HomePage() {
  const noticiasPublicadas = noticias.filter((n) => n.publicada);

  const destaque = noticiasPublicadas[0];

  return (
    <PageLayout title="Home" showBackButton={false}>
      <div className={styles.container}>
        
        {/* HERO */}
        {destaque && (
          <div className={styles.hero}>
            <img src={destaque.imagemCapa} />

            <div className={styles.overlay}>
              <h1>{destaque.titulo}</h1>

              <Link to={`/noticia/${destaque.id}`} className={styles.button}>
                Ler mais
              </Link>
            </div>
          </div>
        )}

        {/* SEARCH + FILTROS */}
        <div className={styles.filters}>
          <InputField
            type="text"
            placeholder="Buscar notícias..."
          />

          <SelectField>
            <option>Filtrar por UF</option>
            {ufs.map((uf) => (
              <option key={uf.id}>{uf.sigla}</option>
            ))}
          </SelectField>
        </div>

        {/* TAGS */}
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/busca/tag/${tag.slug}`}
              className={styles.tag}
            >
              #{tag.nome}
            </Link>
          ))}
        </div>

        {/* GRID DE NOTÍCIAS */}
        <div className={styles.grid}>
          {noticiasPublicadas.map((n) => {
            const autor = usuarios.find((u) => u.id === n.autorId);

            const tagsDaNoticia = tags.filter((t) =>
              n.tags.includes(t.id)
            );

            return (
              <Link
                key={n.id}
                to={`/noticia/${n.id}`}
                className={styles.card}
              >
                <img src={n.imagemCapa} />

                <div className={styles.cardContent}>
                  <h3>{n.titulo}</h3>
                  <p>{n.subtitulo}</p>

                  <span className={styles.meta}>
                    {autor?.nome} • {n.criadoEm}
                  </span>

                  <div className={styles.cardTags}>
                    {tagsDaNoticia.map((tag) => (
                      <span key={tag.id} className={styles.tagSmall}>
                        #{tag.nome}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}