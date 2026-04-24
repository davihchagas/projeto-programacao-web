import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./PerfilEditorPage.module.css";

import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";

export default function PerfilEditorPage() {
  // Mock: editor logado (no seu mock começa depois dos autores)
  const usuario = usuarios.find((u) => u.perfil === "EDITOR")!;

  const cidade = cidades.find((c) => c.id === usuario.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nome: usuario.nome,
    email: usuario.email,
    bio: "Bio do editor...",
  });

  // 📊 Métricas do sistema (editor vê geral)
  const totalNoticias = noticias.length;
  const publicadas = noticias.filter((n) => n.publicada);
  const rascunhos = noticias.filter((n) => !n.publicada);

  const totalViews = noticias.reduce(
    (acc, n) => acc + n.visualizacoes,
    0
  );

  const comentariosTotal = comentarios.length;

  function handleSalvar() {
    setEditando(false);
  }

  function handleCancelar() {
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      bio: "Bio do editor...",
    });
    setEditando(false);
  }

  return (
    <PageLayout title="Perfil do Editor">
      <div className={styles.container}>
        
        {/* PERFIL */}
        <div className={styles.profile}>
          <img
            src="https://via.placeholder.com/120"
            className={styles.avatar}
          />

          {!editando ? (
            <>
              <h2>{form.nome}</h2>
              <p>{form.email}</p>
              <p>
                {cidade?.nome} - {uf?.sigla}
              </p>
              <p>{form.bio}</p>
              <p>Cadastrado em: {usuario.criadoEm}</p>

              <button
                onClick={() => setEditando(true)}
                className={styles.button}
              >
                Editar Perfil
              </button>
            </>
          ) : (
            <div className={styles.form}>
              <input
                value={form.nome}
                onChange={(e) =>
                  setForm({ ...form, nome: e.target.value })
                }
              />

              <input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
              />

              <div className={styles.actions}>
                <button onClick={handleSalvar} className={styles.button}>
                  Salvar
                </button>

                <button onClick={handleCancelar} className={styles.cancel}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ESTATÍSTICAS */}
        <div className={styles.stats}>
          <div className={styles.card}>
            <p>Total Notícias</p>
            <strong>{totalNoticias}</strong>
          </div>

          <div className={styles.card}>
            <p>Publicadas</p>
            <strong>{publicadas.length}</strong>
          </div>

          <div className={styles.card}>
            <p>Rascunhos</p>
            <strong>{rascunhos.length}</strong>
          </div>

          <div className={styles.card}>
            <p>Visualizações</p>
            <strong>{totalViews}</strong>
          </div>

          <div className={styles.card}>
            <p>Comentários</p>
            <strong>{comentariosTotal}</strong>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}