import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <h1>Portal</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
    </header>
  );
}