import { NavBar } from "components/navigation/NavBar";
import React from "react";
import { Footer } from "./Footer";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};
