import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Form, FormGroup, Label, Input } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import InputBox from "./../../components/InputBox";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SuccessDialog from "../SuccessDialog";
import FailureDialog from "../FailureDialog";
import pdf from "../../assets/img/icons/pdf.svg";
import messageRequest from "../../requests/message";

const messageOptions = [
    { name: "Email", id: 1 },
    { name: "SMS", id: 2 }
] 

const recipientOptions = [
    { name: "All Customers", id: 1 },
    { name: "All Agents", id: 2 }, 
    { name: "Churn Customers", id: 3 },
    // { name: "Customized Users" }
]

function CreateNewMessage({setShowNewMessage, userName}) {
    const [title, setTitle] = useState("Settl Easter Campaign");
    const [messageType, setMessageType] = useState("");
    const [selectedValues, setSelectedValues] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [customerTemplate, setCustomerTemplate] = useState("");

    const { newMessage } = messageRequest();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const response = await newMessage(
            messageType,
            userName.split(" ")[0],
            title,
            editorState.getCurrentContent().getPlainText(),
            selectedValues
        );
        if(response.code === "00") {
            console.log(response);
            setTitle("Settl Easter Campaign");
            setMessageType("");
            setSelectedValues("");
            setEditorState(EditorState.createEmpty());
            setLoading(false);
            setShowSuccess(true);
            return true;
        } 

        setLoading(false);
        setShowFailure(true);
        return false;
    }   


    return(
        <>
            <Link 
                to="/messages"
                className="back"
                onClick={() => setShowNewMessage((prev) => !prev)}
            >
                &lt; Back to All Messages
            </Link>
            <div className="w-50 mx-auto">
                <Card className="p-4" style={{border: "1px solid #ECF3FC"}}>
                    <h6 className="text-center">New Message</h6>
                    <Form 
                        className="new-admin-form message-form mt-4"
                        onSubmit={handleSubmit}
                    >
                        <FormGroup>
                            <Multiselect
                                className="forget_pass_select"
                                options={messageOptions}
                                showCheckbox={false}
                                showArrow={true}
                                displayValue="name"
                                placeholder={messageType === "" ? "Message Type" : messageType}
                                singleSelect={true}
                                onSelect={(e) => setMessageType(e[0].id)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Multiselect
                                className="forget_pass_select"
                                options={recipientOptions}
                                showCheckbox={false}
                                showArrow={true}
                                displayValue="name"
                                placeholder={selectedValues === "" ? "Send to" : selectedValues}
                                singleSelect={true}
                                onSelect={(e) => setSelectedValues(e[0].id)}
                            />
                        </FormGroup>
                        {(customerTemplate === "" && selectedValues === "Customized Users") && (
                            <FormGroup className="upload">
                                <div>
                                    <Label htmlFor="customerTemplate">Customer</Label>
                                    <Input 
                                        type="file" 
                                        id="customerTemplate" 
                                        accept=".png, .jpg, .pdf, .csv" 
                                        value={customerTemplate}
                                        onChange={(e) => setCustomerTemplate(e.target.value)}
                                    />
                                </div>
                                <span className="d-block pt-2">
                                    Max file size should be 20MB. 
                                    <a href="#" download>Download this template format</a>
                                </span>
                            </FormGroup>
                        )}
                        {customerTemplate !== "" && (
                            <FormGroup className="upload">
                                <div>
                                    <Label htmlFor="customerTemplate">Customer</Label>
                                </div>
                                <div className="document-wrapper align-items-center d-flex">
                                    <div className="mr-3">
                                        <img src={pdf} alt="pdf icon" />
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            {customerTemplate.replace(/^C:\\fakepath\\/, "")}
                                        </p>
                                    </div>
                                </div>
                            </FormGroup>
                        )}
                        <FormGroup className="pb-3 relative">
                            <InputBox
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Label for="title" className="label-title">Title</Label>
                        </FormGroup>
                        <FormGroup>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                toolbarClassName="toolbar-class"
                                toolbar={{
                                    options: ['inline', 'link', 'textAlign', 'list', 'image'],
                                    inline: { 
                                        inDropdown: false,
                                        options: ['bold', 'italic']
                                    },
                                    textAlign: { inDropdown: false },
                                    link: { inDropdown: false }
                                }}
                                onEditorStateChange={onEditorStateChange}
                            />
                            <div className="mt-1 text-right">
                                <p style={{opacity: "0.7"}}>Max 366 Char</p>
                            </div>
                        </FormGroup>
                        <Button
                            type="submit" 
                            color="primary" 
                            className="btn-add py-2 w-100"
                        >
                            Send Message
                            {
                                loading ? (
                                <div className="spinner-border spinner-border-sm spinner text-white ml-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>) : ("")
                            }
                        </Button>
                    </Form>
                </Card>
            </div>

            <SuccessDialog 
                isOpen={showSuccess}
                toggle={() => setShowSuccess(!showSuccess)}
                title="Success Message"
                details="Your message has been successfully sent to all Settl customers."
            />

            <FailureDialog 
                isOpen={showFailure}
                toggle={() => setShowFailure(!showFailure)}
                title="Failure Message"
                details="Oops! An error occured."
            />
        </>
    );
}


const mapStateToProps = (state) => ({
    userName: state?.user?.details?.admin?.fullname,
});
export default connect(mapStateToProps)(CreateNewMessage);