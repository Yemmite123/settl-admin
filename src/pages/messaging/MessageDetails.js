import React, { useState, useEffect} from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import sent from "./../../assets/img/icons/sent.svg";
import delivered from "./../../assets/img/icons/delivered.svg";
import notDelivered from "./../../assets/img/icons/not-delivered.svg";
import MessageDetailsTable from "./MessageDetailsTable";
import messageRequest from "../../requests/message";

export default function MessageDetails({setShowMessageDetails, details}) {
    const messageStructure = [
        {
            id: "1",
            name: "Message Type",
            value: <p className="message-value ml-4 pl-2">{details.messageTypes}</p>
        },
        {
            id: "2",
            name: "Date Created",
            value: <p className="message-value ml-4 pl-2">{details.date}</p>
        },
        {
            id: "3",
            name: "Message",
            value: <div className="message-value-wrapper ml-4">
                <p className="message-value">{details.messageTitle}</p>
            </div>
        }
    ]

    const messageType = details.messageTypes === "SMS" ? 2 : 1;

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const { getLogRecordsById } = messageRequest();

    const getAllRecords = async () => {
        const response = await getLogRecordsById(messageType, details.id);
        if(response.code === "00") {
            console.log(response.data);
            setData(response.data)
            setTableData(response.data.list);
        }
    }

    useEffect(() => {
        getAllRecords();
    }, [])

    return(
        <>
            <div>
                <Link 
                    to="/messages"
                    className="back"
                    onClick={() => setShowMessageDetails((prev) => !prev)}
                >
                    &lt; Back
                </Link>
                <h6 className="campaign">{details.messageTitle}</h6>
            </div>
            <div className="admin-header campaign-messages mt-4 py-2">
                <Row>
                    <Col md={4}>
                        <div 
                            className="d-flex px-5 py-3" 
                            style={{ borderRight: "1px solid #ECF3FC" }}
                        >
                            <div className="mr-4">
                                <img src={sent} className="img-fluid" alt="sent icon" />
                            </div>
                            <div>
                                <p className="mb-1">Sent Messages</p>
                                <h6 className="sent">{data.sentMessages}</h6>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div 
                            className="d-flex pl-4 pr-5 py-3" 
                            style={{ borderRight: "1px solid #ECF3FC" }}
                        >
                            <div className="mr-4">
                                <img src={delivered} className="img-fluid" alt="an icon" />
                            </div>
                            <div>
                                <p className="mb-1">Delivered</p>
                                <h6 className="delivered">{data.deliveredMessages}</h6>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="d-flex pl-4 pr-5 py-3">
                            <div className="mr-4">
                                <img src={notDelivered} className="img-fluid" alt="an icon" />
                            </div>
                            <div>
                                <p className="mb-1">Not Delivered</p>
                                <h6 className="not-delivered">{data.undeliveredMessages}</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="admin-header message-structure mt-4 p-4">
                {
                    messageStructure.map((message) => (
                        <Row key={message.id}>
                            <Col md={4}>
                                <div>
                                    <p className="message-name">{message.name}</p>
                                </div>
                            </Col>
                            <Col md={8}>
                                {message.value}
                            </Col>
                        </Row>
                    ))
                }
            </div>
            <MessageDetailsTable tableData={tableData} />
        </>
    );
}
