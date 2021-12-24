import React from "react";
import { ReactComponent as Close } from "../../../BgImages/close.svg";
import { 
    Button,
    Modal, 
    ModalBody,
    ModalHeader,
    Row, Col
} from "reactstrap";

const data = [
    {
        id: "1",
        title: "Frozen by",
        value: "Admin Name"
    }, 
    {
        id: "2",
        title: "Frozen as at",
        value: "5-1-2021 "
    },
    {
        id: "3",
        title: "Frozen time",
        value: "10:38 AM"
    },
    {
        id: "4",
        title: "Reason",
        value: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
    }
]

export default function ReasonForSuspendedAccountDialog(props) {
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} className="admin-modal suspended-modal">
                <ModalHeader>
                    Account  Frozen Details
                    <Close
                        className="close-modal"
                        onClick={props.toggle}
                    />
                </ModalHeader>
                <ModalBody>
                    <div className="px-2">
                        {data.map((reason) => (
                            <Row key={reason.id}>
                                <Col md={5}>
                                    <p className="reason-title">{reason.title}</p>
                                </Col>
                                <Col md={7}>
                                    <p className="reason-value">{reason.value}</p>
                                </Col>
                            </Row>
                        ))}
                        <hr/>
                        <div className="text-right mb-3">
                            <Button color="primary" className="btn-add py-2 px-3" onClick={props.toggle}>Close</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
