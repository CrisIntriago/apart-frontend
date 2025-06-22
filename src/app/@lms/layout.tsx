import Navbar from "@/components/ui/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <Navbar />
        <main style={{ padding: "min-h-screen bg-gray-100 p-6" }}>
            {children}
        </main>
    </div>
);

export default Layout;