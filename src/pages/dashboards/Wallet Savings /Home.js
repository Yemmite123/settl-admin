import React from "react";
import WalletSavings from ".";
import { APIContextProvider } from "./../../../contexts/WalletContext";

const Home = () => {
    return (
        <APIContextProvider>
            <WalletSavings />
        </APIContextProvider>
    );
}

export default Home;
