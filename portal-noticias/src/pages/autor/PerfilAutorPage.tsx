import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./PerfilAutorPage.module.css";

import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";

export default function PerfilAutorPage() {
  // Mock: autor logado (id 6 começa os autores no seu mock)
  const usuario = usuarios.find((u) => u.id === 6)!;

  const cidade = cidades.find((c) => c.id === usuario.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nome: usuario.nome,
    email: usuario.email,
    bio: "Bio do autor...",
  });

  // Notícias do autor
  const minhasNoticias = noticias.filter(
    (n) => n.autorId === usuario.id
  );

  const publicadas = minhasNoticias.filter((n) => n.publicada);
  const rascunhos = minhasNoticias.filter((n) => !n.publicada);

  const totalViews = minhasNoticias.reduce(
    (acc, n) => acc + n.visualizacoes,
    0
  );

  const comentariosRecebidos = comentarios.filter((c) =>
    minhasNoticias.some((n) => n.id === c.noticiaId)
  );

  function handleSalvar() {
    setEditando(false);
  }

  function handleCancelar() {
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      bio: "Bio do autor...",
    });
    setEditando(false);
  }

  return (
    <>
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

              <Button
                onClick={() => setEditando(true)}
              >
                Editar Perfil
              </Button>
            </>
          ) : (
            <div className={styles.form}>
              <InputField
                value={form.nome}
                onChange={(e) =>
                  setForm({ ...form, nome: e.target.value })
                }
              />

              <InputField
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
                <Button onClick={handleSalvar}>
                  Salvar
                </Button>

                <Button onClick={handleCancelar}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ESTATÍSTICAS */}
        <div className={styles.stats}>
          <div className={styles.card}>
            <p>Total</p>
            <strong>{minhasNoticias.length}</strong>
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
            <strong>{comentariosRecebidos.length}</strong>
          </div>
        </div>

        {/* LISTA DE NOTÍCIAS */}
        <div className={styles.news}>
          <h3>Minhas Notícias</h3>

          {minhasNoticias.map((n) => (
            <div key={n.id} className={styles.newsItem}>
              <Link to={`/noticia/${n.id}`}>
                {n.titulo}
              </Link>

              <span>
                {n.publicada ? "Publicada" : "Rascunho"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}