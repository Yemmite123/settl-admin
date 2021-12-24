import React, { useState } from "react";
import AgentsTable from "./AgentsTable";
import Header from "./../settl-customers/Header"
import Statistics from "./../settl-customers/Statistics";
import AgentDetails from "./AgentDetails";

export default function SettlAgents() {
    const [showDetails, setShowDetails] = useState(false);

    return(
        <>
            <div className="customers">
                {!showDetails ? (
                    <>
                        <Header title="Agent Data" />
                        <Statistics /> 
                        <AgentsTable setShowDetails={setShowDetails}  />
                    </>
                ) : (
                    <AgentDetails setShowDetails={setShowDetails} />
                )}
            </div>
        </>
    );
}
