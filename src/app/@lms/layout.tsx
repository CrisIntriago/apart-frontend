import Navbar from "@/components/ui/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <Navbar />
        <main style={{ padding: "2rem" }}>
            {children}
        </main>
    </div>
);

export default Layout;