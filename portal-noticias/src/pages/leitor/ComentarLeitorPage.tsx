import { useParams, Link } from "react-router";
import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./ComentarLeitorPage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";

export default function ComentarLeitorPage() {
  const { noticiaId } = useParams();

  const noticia = noticias.find(
    (n) => n.id === Number(noticiaId)
  );

  const autor = usuarios.find((u) => u.id === noticia?.autorId);

  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  const max = 500;

  function handleEnviar() {
    if (!texto.trim()) return;

    // simulação
    setEnviado(true);
  }

  if (!noticia) {
    return (
      <PageLayout title="Notícia não encontrada">
        Notícia não encontrada
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Comentar Notícia">
      <div className={styles.container}>
        
        {/* RESUMO */}
        <div className={styles.summary}>
          <img src={noticia.imagemCapa} />

          <div>
            <h3>{noticia.titulo}</h3>
            <p className={styles.author}>
              por {autor?.nome}
            </p>
          </div>
        </div>

        {!enviado ? (
          <>
            {/* TEXTAREA */}
            <textarea
              value={texto}
              onChange={(e) =>
                setTexto(e.target.value.slice(0, max))
              }
              placeholder="Escreva seu comentário..."
              className={styles.textarea}
            />

            <div className={styles.counter}>
              {texto.length}/{max}
            </div>

            <button
              onClick={handleEnviar}
              className={styles.button}
            >
              Enviar Comentário
            </button>
          </>
        ) : (
          <div className={styles.success}>
            <p>Comentário enviado com sucesso!</p>

            <Link to={`/noticia/${noticia.id}`}>
              Voltar para a Notícia
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
}