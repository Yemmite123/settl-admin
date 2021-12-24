import React from "react";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

const Dashboard = ({ children }) => (
  <React.Fragment>
    <Wrapper>
      <Sidebar />
      <Main>
        <Navbar />
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Content>{children}</Content>
          {/* <Footer /> */}
        </div>
      </Main>
    </Wrapper>
    <Settings />
  </React.Fragment>
);

export default Dashboard;
