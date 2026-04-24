import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./FormCidadePage.module.css";

import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export default function FormCidadePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = Boolean(id);

  const cidade = cidades.find((c) => c.id === Number(id));

  const [nome, setNome] = useState("");
  const [ufId, setUfId] = useState("");

  useEffect(() => {
    if (editando && cidade) {
      setNome(cidade.nome);
      setUfId(String(cidade.ufId));
    }
  }, [editando, cidade]);

  function handleSalvar() {
    if (!nome.trim() || !ufId) {
      alert("Preencha todos os campos");
      return;
    }

    alert(editando ? "Cidade atualizada" : "Cidade criada");

    navigate("/admin/cidades");
  }

  const titulo = editando
    ? `Editar Cidade — ${cidade?.nome}`
    : "Nova Cidade";

  return (
    <PageLayout title={titulo}>
      <div className={styles.container}>
        
        <div className={styles.form}>
          
          <input
            type="text"
            placeholder="Nome da cidade"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            value={ufId}
            onChange={(e) => setUfId(e.target.value)}
          >
            <option value="">Selecione a UF</option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.id}>
                {uf.sigla} - {uf.nome}
              </option>
            ))}
          </select>

          {/* BOTÕES */}
          <div className={styles.actions}>
            <button onClick={handleSalvar}>
              Salvar
            </button>

            <button
              onClick={() => navigate("/admin/cidades")}
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