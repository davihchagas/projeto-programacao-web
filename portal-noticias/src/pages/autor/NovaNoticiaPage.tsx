import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./NovaNoticiaPage.module.css";

import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectedField";
import Button from "../../components/ui/Button";

export default function NovaNoticiaPage() {
  const autor = usuarios.find((u) => u.id === 6)!;

  const [form, setForm] = useState({
    titulo: "",
    subtitulo: "",
    imagem: "",
    conteudo: "",
    ufId: "",
    cidadeId: "",
    tags: [] as number[],
  });

  // cidades filtradas por UF
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

  function handleSubmit(tipo: "rascunho" | "revisao") {
    alert(
      tipo === "rascunho"
        ? "Salvo como rascunho"
        : "Enviado para revisão"
    );
  }

  return (
    <PageLayout title="Nova Notícia">
      <div className={styles.container}>
        
        {/* FORM */}
        <div className={styles.form}>
          
          <InputField
            placeholder="Título"
            value={form.titulo}
            onChange={(e) =>
              setForm({ ...form, titulo: e.target.value })
            }
          />

          <InputField
            placeholder="Subtítulo"
            value={form.subtitulo}
            onChange={(e) =>
              setForm({ ...form, subtitulo: e.target.value })
            }
          />

          <InputField
            placeholder="URL da imagem"
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
            placeholder="Conteúdo"
            value={form.conteudo}
            onChange={(e) =>
              setForm({ ...form, conteudo: e.target.value })
            }
          />

          {/* UF */}
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
            <option value="">Selecione UF</option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.nome}
              </option>
            ))}
          </SelectField>

          {/* Cidade */}
          <SelectField
            value={form.cidadeId}
            onChange={(e) =>
              setForm({
                ...form,
                cidadeId: e.target.value,
              })
            }
          >
            <option value="">Selecione Cidade</option>
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

          <small>Máx 5 tags</small>

          {/* BOTÕES */}
          <div className={styles.actions}>
            <Button onClick={() => handleSubmit("rascunho")}>
              Salvar como Rascunho
            </Button>

            <Button onClick={() => handleSubmit("revisao")}>
              Enviar para Revisão
            </Button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className={styles.preview}>
          <div className={styles.card}>
            {form.imagem && <img src={form.imagem} />}

            <div className={styles.cardContent}>
              <h3>{form.titulo || "Título da notícia"}</h3>
              <p>{form.subtitulo || "Subtítulo..."}</p>

              <span>
                {autor.nome} • Hoje
              </span>

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
    </PageLayout>
  );
}