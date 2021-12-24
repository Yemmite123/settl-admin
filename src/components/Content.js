import React from "react";
import Footer from "./Footer";
const Content = ({ children }) => (
  <div className="content">
    {children}
    <Footer />
  </div>
);

export default Content;
