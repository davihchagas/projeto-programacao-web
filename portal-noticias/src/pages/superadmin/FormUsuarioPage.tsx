import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./FormUsuarioPage.module.css";

import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export default function FormUsuarioPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuario = usuarios.find((u) => u.id === Number(id));

  const [form, setForm] = useState({
    nome: "",
    email: "",
    perfil: "",
    ufId: "",
    cidadeId: "",
    bio: "",
    ativo: true,
  });

  useEffect(() => {
    if (!usuario) return;

    const cidade = cidades.find(
      (c) => c.id === usuario.cidadeId
    );

    setForm({
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
      ufId: String(cidade?.ufId || ""),
      cidadeId: String(usuario.cidadeId),
      bio: "",
      ativo: usuario.ativo,
    });
  }, [usuario]);

  if (!usuario) {
    return (
      <PageLayout title="Usuário não encontrado">
        Usuário não encontrado
      </PageLayout>
    );
  }

  const cidadesFiltradas = cidades.filter(
    (c) => c.ufId === Number(form.ufId)
  );

  function handleSalvar() {
    if (!form.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    alert("Usuário atualizado (simulação)");
    navigate("/admin/usuarios");
  }

  return (
    <PageLayout title={`Editar Usuário — ${usuario.nome}`}>
      <div className={styles.container}>
        
        <div className={styles.form}>
          
          <input
            value={form.nome}
            onChange={(e) =>
              setForm({ ...form, nome: e.target.value })
            }
            placeholder="Nome"
          />

          <input
            value={form.email}
            readOnly
          />

          <select
            value={form.perfil}
            onChange={(e) =>
              setForm({
                ...form,
                perfil: e.target.value,
              })
            }
          >
            <option value="">Perfil</option>
            <option value="LEITOR">Leitor</option>
            <option value="AUTOR">Autor</option>
            <option value="EDITOR">Editor</option>
            <option value="SUPERADMIN">Admin</option>
          </select>

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

          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
          />

          {/* ATIVO */}
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.ativo}
              onChange={(e) =>
                setForm({
                  ...form,
                  ativo: e.target.checked,
                })
              }
            />
            Usuário ativo
          </label>

          {/* BOTÕES */}
          <div className={styles.actions}>
            <button onClick={handleSalvar}>
              Salvar
            </button>

            <button
              onClick={() =>
                navigate("/admin/usuarios")
              }
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