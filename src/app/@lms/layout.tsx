import Navbar from "@/components/ui/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Navbar />
    <main className="pt-8">{children}</main>
  </div>
);

export default Layout;
