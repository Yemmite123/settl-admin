import axios from "axios";
import baseURL from "./baseUrl";
import { useSelector } from "react-redux";

function create_UUID(){ 
    var dt = new Date().getTime(); 
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { 
        var r = (dt + Math.random()*16)%16 | 0; 
        dt = Math.floor(dt/16); 
        return (c === 'x' ? r :(r&0x3|0x8)).toString(16); 
    }); 
    return uuid; 
}

let requestId = create_UUID();

const ReferralsRequest = () => {
    const { token, tokenType } = useSelector((state) => state.user.details);

    const getAllReferrals = async (days) => {
        requestId = create_UUID();
        try {
            const response = await axios.get(baseURL + `backoffice/Referral/Referrals?days=${days}` , 
            {
                headers: { 
                    "X-RequestId": `${requestId}`,
                    Authorization: `${tokenType} ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }

    return {
        getAllReferrals
    }
}

export default ReferralsRequest;