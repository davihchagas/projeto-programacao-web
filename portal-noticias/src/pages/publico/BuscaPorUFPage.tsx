import { useParams, Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./BuscaPorUFPage.module.css";

import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { noticias } from "../../data/noticias";

export default function BuscaPorUFPage() {
  const { sigla } = useParams();

  // Encontrar UF atual
  const ufAtual = ufs.find((uf) => uf.sigla === sigla);

  // Filtrar cidades da UF
  const cidadesDaUF = cidades.filter(
    (cidade) => cidade.ufId === ufAtual?.id
  );

  // IDs das cidades
  const cidadesIds = cidadesDaUF.map((c) => c.id);

  // Filtrar notícias dessa UF (via cidade)
  const noticiasFiltradas = noticias.filter(
    (n) => cidadesIds.includes(n.cidadeId) && n.publicada
  );

  return (
    <PageLayout title="Busca por UF">
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3>Estados</h3>
          <ul>
            {ufs.map((uf) => (
              <li key={uf.id}>
                <Link
                  to={`/busca/uf/${uf.sigla}`}
                  className={
                    uf.sigla === sigla ? styles.active : ""
                  }
                >
                  {uf.nome}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conteúdo */}
        <main className={styles.content}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> &gt;{" "}
            <span>Busca por UF</span> &gt;{" "}
            <strong>{ufAtual?.nome}</strong>
          </div>

          {/* Título */}
          <h2 className={styles.title}>
            {ufAtual?.nome} ({noticiasFiltradas.length} notícias)
          </h2>

          {/* Grid */}
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
        </main>
      </div>
    </PageLayout>
  );
}