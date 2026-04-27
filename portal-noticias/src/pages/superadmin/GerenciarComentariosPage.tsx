import { useState } from "react";
import { Link } from "react-router";
import PageLayout from "../../components/layout/PageLayout";
import styles from "./GerenciarComentariosPage.module.css";

import { comentarios } from "../../data/comentarios";
import { usuarios } from "../../data/usuarios";
import { noticias } from "../../data/noticias";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectedField";
import Button from "../../components/ui/Button";

export default function GerenciarComentariosPage() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const filtrados = comentarios.filter((c) => {
    const autor = usuarios.find((u) => u.id === c.autorId);

    const matchBusca =
      c.texto.toLowerCase().includes(busca.toLowerCase()) ||
      autor?.nome.toLowerCase().includes(busca.toLowerCase());

    const matchStatus =
      !status ||
      (status === "aprovado" && c.aprovado) ||
      (status === "pendente" && !c.aprovado);

    return matchBusca && matchStatus;
  });

  function toggleSelecionado(id: number) {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  }

  function handleAprovar(id: number) {
    alert("Comentário aprovado");
  }

  function handleRejeitar(id: number) {
    alert("Comentário rejeitado");
  }

  function handleDelete(id: number) {
    if (!window.confirm("Excluir comentário?")) return;
    alert("Comentário excluído");
  }

  function aprovarSelecionados() {
    if (selecionados.length === 0) return;
    alert("Selecionados aprovados");
    setSelecionados([]);
  }

  function excluirSelecionados() {
    if (selecionados.length === 0) return;
    if (!window.confirm("Excluir selecionados?")) return;

    alert("Selecionados excluídos");
    setSelecionados([]);
  }

  return (
    <PageLayout title="Gerenciar Comentários">
      <div className={styles.container}>
        
        {/* FILTROS */}
        <div className={styles.filters}>
          <InputField
            placeholder="Buscar comentário ou autor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <SelectField
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="aprovado">Aprovados</option>
            <option value="pendente">Pendentes</option>
          </SelectField>
        </div>

        {/* AÇÕES EM LOTE */}
        <div className={styles.bulkActions}>
          <Button onClick={aprovarSelecionados}>
            Aprovar Selecionados
          </Button>

          <Button
            onClick={excluirSelecionados}
            className={styles.delete}
          >
            Excluir Selecionados
          </Button>
        </div>

        {/* LISTA */}
        <div className={styles.list}>
          {filtrados.map((c) => {
            const autor = usuarios.find(
              (u) => u.id === c.autorId
            );

            const noticia = noticias.find(
              (n) => n.id === c.noticiaId
            );

            return (
              <div key={c.id} className={styles.item}>
                
                <InputField
                  type="checkbox"
                  checked={selecionados.includes(c.id)}
                  onChange={() => toggleSelecionado(c.id)}
                />

                <img
                  src={`https://i.pravatar.cc/40?img=${c.autorId}`}
                  className={styles.avatar}
                />

                <div className={styles.content}>
                  <strong>{autor?.nome}</strong>

                  <p>{c.texto}</p>

                  <small>
                    Em:{" "}
                    <Link to={`/noticia/${c.noticiaId}`}>
                      {noticia?.titulo}
                    </Link>
                  </small>

                  <small>{c.criadoEm}</small>

                  <span
                    className={
                      c.aprovado
                        ? styles.aprovado
                        : styles.pendente
                    }
                  >
                    {c.aprovado ? "Aprovado" : "Pendente"}
                  </span>
                </div>

                {/* AÇÕES */}
                <div className={styles.actions}>
                  <Button
                    className={styles.approve}
                    onClick={() => handleAprovar(c.id)}
                  >
                    ✔
                  </Button>

                  <Button
                    className={styles.reject}
                    onClick={() => handleRejeitar(c.id)}
                  >
                    ✖
                  </Button>

                  <Button
                    className={styles.delete}
                    onClick={() => handleDelete(c.id)}
                  >
                    🗑
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </PageLayout>
  );
}