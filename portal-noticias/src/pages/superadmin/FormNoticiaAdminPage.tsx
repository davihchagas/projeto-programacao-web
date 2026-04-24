import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./FormNoticiaAdminPage.module.css";

import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { tags } from "../../data/tags";

export default function FormNoticiaAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticia = noticias.find((n) => n.id === Number(id));

  const [form, setForm] = useState({
    titulo: "",
    subtitulo: "",
    imagem: "",
    conteudo: "",
    ufId: "",
    cidadeId: "",
    autorId: "",
    tags: [] as number[],
  });

  useEffect(() => {
    if (!noticia) return;

    const cidade = cidades.find((c) => c.id === noticia.cidadeId);

    setForm({
      titulo: noticia.titulo,
      subtitulo: noticia.subtitulo,
      imagem: noticia.imagemCapa,
      conteudo: noticia.conteudo,
      ufId: String(cidade?.ufId || ""),
      cidadeId: String(noticia.cidadeId),
      autorId: String(noticia.autorId),
      tags: noticia.tags,
    });
  }, [noticia]);

  if (!noticia) {
    return (
      <PageLayout title="Notícia não encontrada">
        Notícia não encontrada
      </PageLayout>
    );
  }

  const cidadesFiltradas = cidades.filter(
    (c) => c.ufId === Number(form.ufId)
  );

  function toggleTag(tagId: number) {
    if (form.tags.includes(tagId)) {
      setForm({
        ...form,
        tags: form.tags.filter((t) => t !== tagId),
      });
    } else {
      if (form.tags.length >= 5) return;

      setForm({
        ...form,
        tags: [...form.tags, tagId],
      });
    }
  }

  function handleSalvar() {
    alert("Notícia atualizada (admin)");
    navigate("/admin/noticias");
  }

  return (
    <PageLayout title="Editar Notícia (Admin)">
      <div className={styles.container}>
        
        <div className={styles.content}>
          
          {/* FORM */}
          <div className={styles.form}>
            
            {/* AUTOR */}
            <select
              value={form.autorId}
              onChange={(e) =>
                setForm({
                  ...form,
                  autorId: e.target.value,
                })
              }
            >
              <option value="">Selecionar Autor</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome} ({u.perfil})
                </option>
              ))}
            </select>

            <input
              value={form.titulo}
              onChange={(e) =>
                setForm({
                  ...form,
                  titulo: e.target.value,
                })
              }
              placeholder="Título"
            />

            <input
              value={form.subtitulo}
              onChange={(e) =>
                setForm({
                  ...form,
                  subtitulo: e.target.value,
                })
              }
              placeholder="Subtítulo"
            />

            <input
              value={form.imagem}
              onChange={(e) =>
                setForm({
                  ...form,
                  imagem: e.target.value,
                })
              }
              placeholder="URL da imagem"
            />

            {form.imagem && (
              <img
                src={form.imagem}
                className={styles.previewImg}
              />
            )}

            <textarea
              rows={15}
              value={form.conteudo}
              onChange={(e) =>
                setForm({
                  ...form,
                  conteudo: e.target.value,
                })
              }
            />

            {/* UF */}
            <select
              value={form.ufId}
              onChange={(e) =>
                setForm({
                  ...form,
                  ufId: e.target.value,
                  cidadeId: "",
                })
              }
            >
              <option value="">UF</option>
              {ufs.map((uf) => (
                <option key={uf.id} value={uf.id}>
                  {uf.nome}
                </option>
              ))}
            </select>

            {/* CIDADE */}
            <select
              value={form.cidadeId}
              onChange={(e) =>
                setForm({
                  ...form,
                  cidadeId: e.target.value,
                })
              }
            >
              <option value="">Cidade</option>
              {cidadesFiltradas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            {/* TAGS */}
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={
                    form.tags.includes(tag.id)
                      ? styles.tagActive
                      : styles.tag
                  }
                >
                  #{tag.nome}
                </span>
              ))}
            </div>

            {/* BOTÕES */}
            <div className={styles.actions}>
              <button onClick={handleSalvar}>
                Salvar
              </button>

              <button
                onClick={() =>
                  navigate("/admin/noticias")
                }
                className={styles.cancel}
              >
                Cancelar
              </button>
            </div>

          </div>

          {/* PREVIEW */}
          <div className={styles.preview}>
            <div className={styles.card}>
              {form.imagem && <img src={form.imagem} />}

              <div className={styles.cardContent}>
                <h3>{form.titulo}</h3>
                <p>{form.subtitulo}</p>

                <span>
                  {
                    usuarios.find(
                      (u) =>
                        u.id === Number(form.autorId)
                    )?.nome
                  }
                </span>

                <div className={styles.previewTags}>
                  {tags
                    .filter((t) =>
                      form.tags.includes(t.id)
                    )
                    .map((t) => (
                      <span
                        key={t.id}
                        className={styles.tagSmall}
                      >
                        #{t.nome}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}