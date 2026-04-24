import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./FormUFPage.module.css";

import { ufs } from "../../data/ufs";

export default function FormUFPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = Boolean(id);

  const uf = ufs.find((u) => u.id === Number(id));

  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (editando && uf) {
      setSigla(uf.sigla);
      setNome(uf.nome);
    }
  }, [editando, uf]);

  function handleSalvar() {
    if (!sigla.trim() || !nome.trim()) {
      alert("Preencha todos os campos");
      return;
    }

    alert(editando ? "UF atualizada" : "UF criada");

    navigate("/admin/ufs");
  }

  const titulo = editando
    ? `Editar UF — ${uf?.sigla}`
    : "Nova UF";

  return (
    <PageLayout title={titulo}>
      <div className={styles.container}>
        
        {/* FORM */}
        <div className={styles.form}>
          
          <input
            type="text"
            placeholder="Sigla (ex: SP)"
            value={sigla}
            onChange={(e) =>
              setSigla(e.target.value.toUpperCase())
            }
            maxLength={2}
          />

          <input
            type="text"
            placeholder="Nome (ex: São Paulo)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* BOTÕES */}
          <div className={styles.actions}>
            <button onClick={handleSalvar}>
              Salvar
            </button>

            <button
              onClick={() => navigate("/admin/ufs")}
              className={styles.cancel}
            >
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}