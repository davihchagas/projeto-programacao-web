import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./FormTagPage.module.css";

import { tags } from "../../data/tags";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

export default function FormTagPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = Boolean(id);

  const tag = tags.find((t) => t.id === Number(id));

  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");

  // 🔥 gera slug automaticamente
  function gerarSlug(texto: string) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  useEffect(() => {
    if (editando && tag) {
      setNome(tag.nome);
      setSlug(tag.slug);
    }
  }, [editando, tag]);

  function handleNomeChange(value: string) {
    setNome(value);
    setSlug(gerarSlug(value));
  }

  function handleSalvar() {
    if (!nome.trim()) {
      alert("Preencha o nome da tag");
      return;
    }

    alert(editando ? "Tag atualizada" : "Tag criada");

    navigate("/admin/tags");
  }

  const titulo = editando
    ? `Editar Tag — ${tag?.nome}`
    : "Nova Tag";

  return (
    <PageLayout title={titulo}>
      <div className={styles.container}>
        
        <div className={styles.content}>
          
          {/* FORM */}
          <div className={styles.form}>
            <InputField
              type="text"
              placeholder="Nome da tag"
              value={nome}
              onChange={(e) =>
                handleNomeChange(e.target.value)
              }
            />

            <div className={styles.slug}>
              <small>Slug:</small>
              <span>{slug || "..."}</span>
            </div>

            {/* BOTÕES */}
            <div className={styles.actions}>
              <Button onClick={handleSalvar}>
                Salvar
              </Button>

              <Button
                onClick={() => navigate("/admin/tags")}
                className={styles.cancel}
              >
                Cancelar
              </Button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className={styles.preview}>
            <span className={styles.badge}>
              #{nome || "preview"}
            </span>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}