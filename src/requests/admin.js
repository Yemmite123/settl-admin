import axios from "axios";
import baseURL from "./baseUrl";
import { useSelector } from "react-redux";

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

const AdminRequest = () => {
    const { token, tokenType } = useSelector((state) => state.user.details);
    const getAllAdmin = async () => {
        let requestId = create_UUID();

        try {
            const response = await axios.get(baseURL + "backoffice/AdminManagement", {
                headers: {
                    "X-RequestId": `${requestId}`,
                    Authorization: `${tokenType} ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    };

    const getAdminById = async (id) => {
        let requestId = create_UUID();

        try {
            const response = await axios.get(baseURL + `backoffice/AdminManagement/${id}`, {
                headers: { 
                    "X-RequestId": `${requestId}`,
                    Authorization: `${tokenType} ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return error;
        }
    };

    const addAdmin = async (
      EmployeeName, 
      EmailAddress,
      PhoneNumber, 
      AdminRole, 
      Position, 
      CreatedBy
    ) => {
        let requestId = create_UUID();
    
        try {
          const response = await axios.post(
            baseURL + "backoffice/AdminManagement",
            null,
            {
              params: {
                EmployeeName,
                EmailAddress,
                PhoneNumber,
                AdminRole,
                Position,
                CreatedBy
              },
              headers: {
                "X-RequestId": `${requestId}`,
                "content-type": "multipart/form-data",
                Authorization: `${tokenType} ${token}`,
              }
            }
          );
          return response.data;
        } catch (error) {
          return error;
        }
    };

    const updateAdmin = async (data) => {
        let requestId = create_UUID();
    
        try {
          const response = await axios.put(
            baseURL + "backoffice/AdminManagement",
            data,
            {
              headers: {
                "X-RequestId": `${requestId}`,
                Authorization: `${tokenType} ${token}`,
              },
            }
          );
          return response.data;
        } catch (error) {
          return error;
        }
    };

    const deactivateAdmin = async (id, isActive, superAdminEmail) => {
        let requestId = create_UUID();

        try {
            const response = await axios.patch(
                baseURL + "backoffice/AdminManagement/Deactivate", null, {
                    params: {
                        id,
                        isActive,
                        superAdminEmail
                    },   
                    headers: { 
                        "X-RequestId": `${requestId}`,
                        Authorization: `${tokenType} ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    return {
        getAllAdmin,
        getAdminById,
        addAdmin,
        updateAdmin,
        deactivateAdmin
    }
}

export default AdminRequest;
