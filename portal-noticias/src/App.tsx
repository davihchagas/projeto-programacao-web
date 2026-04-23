import { BrowserRouter, Routes, Route } from "react-router";

// Páginas públicas
import HomePage from "./pages/publico/HomePage";
import LoginPage from "./pages/publico/LoginPage";
import CadastroPage from "./pages/publico/CadastroPage";
import LembrarSenhaPage from "./pages/publico/LembrarSenhaPage";
import BuscaPorUFPage from "./pages/publico/BuscaPorUFPage";
import BuscaPorTagPage from "./pages/publico/BuscaPorTagPage";
import DetalheNoticiaPage from "./pages/publico/DetalheNoticiaPage";

// Páginas do leitor
import PerfilLeitorPage from "./pages/leitor/PerfilLeitorPage";
import ComentarLeitorPage from "./pages/leitor/ComentarLeitorPage";

// Páginas do autor
import PerfilAutorPage from "./pages/autor/PerfilAutorPage";
import ComentarAutorPage from "./pages/autor/ComentarAutorPage";
import MinhasNoticiasPage from "./pages/autor/MinhasNoticiasPage";
import NovaNoticiaPage from "./pages/autor/NovaNoticiaPage";
import EditarNoticiaPage from "./pages/autor/EditarNoticiaPage";

// Páginas do editor
import PainelEditorPage from "./pages/editor/PainelEditorPage";
import PerfilEditorPage from "./pages/editor/PerfilEditorPage";
import PublicarDespublicarPage from "./pages/editor/PublicarDespublicarPage";
import EditarQualquerNoticiaPage from "./pages/editor/EditarQualquerNoticiaPage";

// Páginas do super admin
import DashboardPage from "./pages/superadmin/DashboardPage";
import CrudUFPage from "./pages/superadmin/CrudUFPage";
import FormUFPage from "./pages/superadmin/FormUFPage";
import CrudCidadesPage from "./pages/superadmin/CrudCidadesPage";
import FormCidadePage from "./pages/superadmin/FormCidadePage";
import CrudTagsPage from "./pages/superadmin/CrudTagsPage";
import FormTagPage from "./pages/superadmin/FormTagPage";
import CrudPerfisPage from "./pages/superadmin/CrudPerfisPage";
import CrudNoticiasPage from "./pages/superadmin/CrudNoticiasPage";
import FormNoticiaAdminPage from "./pages/superadmin/FormNoticiaAdminPage";
import CrudUsuariosPage from "./pages/superadmin/CrudUsuariosPage";
import FormUsuarioPage from "./pages/superadmin/FormUsuarioPage";
import GerenciarComentariosPage from "./pages/superadmin/GerenciarComentariosPage";

// Rota coringa
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/lembrar-senha" element={<LembrarSenhaPage />} />
        <Route path="/busca/uf/:sigla" element={<BuscaPorUFPage />} />
        <Route path="/busca/tag/:slug" element={<BuscaPorTagPage />} />
        <Route path="/noticia/:id" element={<DetalheNoticiaPage />} />

        {/* Leitor */}
        <Route path="/leitor/perfil" element={<PerfilLeitorPage />} />
        <Route path="/leitor/comentar/:noticiaId" element={<ComentarLeitorPage />} />

        {/* Autor */}
        <Route path="/autor/perfil" element={<PerfilAutorPage />} />
        <Route path="/autor/comentar/:noticiaId" element={<ComentarAutorPage />} />
        <Route path="/autor/noticias" element={<MinhasNoticiasPage />} />
        <Route path="/autor/noticias/nova" element={<NovaNoticiaPage />} />
        <Route path="/autor/noticias/:id/editar" element={<EditarNoticiaPage />} />

        {/* Editor */}
        <Route path="/editor/painel" element={<PainelEditorPage />} />
        <Route path="/editor/perfil" element={<PerfilEditorPage />} />
        <Route path="/editor/publicar/:id" element={<PublicarDespublicarPage />} />
        <Route path="/editor/noticias/:id/editar" element={<EditarQualquerNoticiaPage />} />

        {/* SuperAdmin */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/ufs" element={<CrudUFPage />} />
        <Route path="/admin/ufs/nova" element={<FormUFPage />} />
        <Route path="/admin/ufs/:id/editar" element={<FormUFPage />} />
        <Route path="/admin/cidades" element={<CrudCidadesPage />} />
        <Route path="/admin/cidades/nova" element={<FormCidadePage />} />
        <Route path="/admin/cidades/:id/editar" element={<FormCidadePage />} />
        <Route path="/admin/tags" element={<CrudTagsPage />} />
        <Route path="/admin/tags/nova" element={<FormTagPage />} />
        <Route path="/admin/tags/:id/editar" element={<FormTagPage />} />
        <Route path="/admin/perfis" element={<CrudPerfisPage />} />
        <Route path="/admin/noticias" element={<CrudNoticiasPage />} />
        <Route path="/admin/noticias/:id/editar" element={<FormNoticiaAdminPage />} />
        <Route path="/admin/usuarios" element={<CrudUsuariosPage />} />
        <Route path="/admin/usuarios/:id/editar" element={<FormUsuarioPage />} />
        <Route path="/admin/comentarios" element={<GerenciarComentariosPage />} />

        {/* Rota coringa */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
