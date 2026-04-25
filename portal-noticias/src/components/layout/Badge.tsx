export default function Badge({ children, color = "primary" }: any) {
    return <span className={`badge ${color}`}>{children}</span>;
  }