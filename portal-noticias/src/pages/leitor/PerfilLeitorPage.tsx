import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./PerfilLeitorPage.module.css";

import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { comentarios } from "../../data/comentarios";
import { noticias } from "../../data/noticias";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";

export default function PerfilLeitorPage() {
  // Mock: usuário logado = id 1
  const usuario = usuarios.find((u) => u.id === 1)!;

  const cidade = cidades.find((c) => c.id === usuario.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nome: usuario.nome,
    email: usuario.email,
    bio: "Minha bio...",
  });

  const meusComentarios = comentarios.filter(
    (c) => c.autorId === usuario.id
  );

  function handleSalvar() {
    setEditando(false);
  }

  function handleCancelar() {
    setForm({
      nome: usuario.nome,
      email: usuario.email,
      bio: "Minha bio...",
    });
    setEditando(false);
  }

  return (
    <PageLayout title="Perfil do Leitor">
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
                className={styles.button}
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
                <Button onClick={handleSalvar} className={styles.button}>
                  Salvar
                </Button>

                <Button
                  onClick={handleCancelar}
                  className={styles.cancel}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* COMENTÁRIOS */}
        <div className={styles.comments}>
          <h3>Meus Comentários</h3>

          {meusComentarios.map((c) => {
            const noticia = noticias.find(
              (n) => n.id === c.noticiaId
            );

            return (
              <div key={c.id} className={styles.comment}>
                <p className={styles.text}>
                  {c.texto.slice(0, 60)}...
                </p>

                <Link to={`/noticia/${c.noticiaId}`}>
                  {noticia?.titulo}
                </Link>

                <span className={styles.date}>
                  {c.criadoEm}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}