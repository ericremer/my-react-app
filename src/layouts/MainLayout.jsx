import Nav from "../components/Nav.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <Nav />
      <main className="py-6">{children}</main>
    </div>
  );
}
