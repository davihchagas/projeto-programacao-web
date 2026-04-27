import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./EditarQualquerNoticiaPage.module.css";

import { noticias } from "../../data/noticias";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectedField";
import Button from "../../components/ui/Button";

export default function EditarQualquerNoticiaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticia = noticias.find((n) => n.id === Number(id));
  const autor = usuarios.find((u) => u.id === noticia?.autorId);

  const [form, setForm] = useState({
    titulo: "",
    subtitulo: "",
    imagem: "",
    conteudo: "",
    ufId: "",
    cidadeId: "",
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
    alert("Alterações salvas (editor)");
    navigate("/editor/painel");
  }

  return (
    <PageLayout title="Editar Notícia">
      <div className={styles.container}>
        
        {/* AVISO */}
        <div className={styles.warning}>
          Você está editando uma notícia de{" "}
          <strong>{autor?.nome}</strong>
        </div>

        <div className={styles.content}>
          
          {/* FORM */}
          <div className={styles.form}>
            <InputField
              value={form.titulo}
              onChange={(e) =>
                setForm({ ...form, titulo: e.target.value })
              }
            />

            <InputField
              value={form.subtitulo}
              onChange={(e) =>
                setForm({ ...form, subtitulo: e.target.value })
              }
            />

            <InputField
              value={form.imagem}
              onChange={(e) =>
                setForm({ ...form, imagem: e.target.value })
              }
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
                setForm({ ...form, conteudo: e.target.value })
              }
            />

            <SelectField
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
            </SelectField>

            <SelectField
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
            </SelectField>

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
              <Button onClick={handleSalvar}>
                Salvar Alterações
              </Button>

              <Button
                onClick={() => navigate("/editor/painel")}
              >
                Cancelar
              </Button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className={styles.preview}>
            <div className={styles.card}>
              {form.imagem && <img src={form.imagem} />}

              <div className={styles.cardContent}>
                <h3>{form.titulo}</h3>
                <p>{form.subtitulo}</p>

                <span>{autor?.nome}</span>

                <div className={styles.previewTags}>
                  {tags
                    .filter((t) => form.tags.includes(t.id))
                    .map((t) => (
                      <span key={t.id} className={styles.tagSmall}>
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