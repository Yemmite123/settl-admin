import React, { useState } from "react";
import MessageDetails from "./MessageDetails";
import { Button } from "reactstrap";
import MessageTable from "./MessageTable";
import CreateNewMessage from "./CreateNewMessage";
import { Plus } from "react-feather";

export default function Messaging() {
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [showMessageDetails, setShowMessageDetails] = useState(false);
    const [details, setDetails] = useState({})

    return(
        <>
            {!showMessageDetails ? (
                <>
                    {
                        !showNewMessage ? (
                            <div className="admin-body">
                                <div className="all-admins" style={{ position: "relative" }}>
                                    <h6>All Messages</h6>
                                    <div className="text-right message-right">
                                        <Button 
                                            color="primary" 
                                            className="btn-add"
                                            onClick={() => setShowNewMessage(true)}
                                        >
                                            <Plus /> New Message
                                        </Button>
                                    </div>
                                    <MessageTable 
                                        setShowMessageDetails={setShowMessageDetails} 
                                        setDetails={setDetails} 
                                    /> 
                                </div>
                            </div>
                        ) : (
                            <CreateNewMessage setShowNewMessage={setShowNewMessage} /> 
                        )
                    }
                </>
                
            ) : (
                <MessageDetails 
                    setShowMessageDetails={setShowMessageDetails} 
                    details={details} 
                /> 
            )}
        </>
    );
}
