
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

const AppLayout = ({ children, showNav = true, showFooter = true }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar showNav={showNav} />
      <main className="flex-1">{children}</main>
      <Footer showFooter={showFooter} />
    </div>
  );
};

export default AppLayout;
