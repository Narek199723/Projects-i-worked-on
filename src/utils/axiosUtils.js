import axios from "axios";
import firebase from "../firebase/firebase.js";
let baseURL = `${process.env.REACT_APP_BASE_API_URL}/`;

export const Post = async (endPoints, reqContent) => {
  try {
    const bearerToken = await firebase.auth().currentUser.getIdToken(true);
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };
    return axios.post(baseURL + endPoints, reqContent, { headers });
  } catch (error) {
    return false;
  }
};

export const Get = async (endPoints, reqContent) => {
  try {
    const bearerToken = await firebase.auth().currentUser.getIdToken(true);
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };
    let params = {
      params: reqContent || {},
      headers: headers || {},
    };
    return axios.get(baseURL + endPoints, params);
  } catch (error) {
    return false;
  }
};

export const GetWithHeaders = (endPoints, headers) => {
  return axios.get(baseURL + endPoints, {
    headers: headers,
  });
};

export const GetWithQuery = (endPoints, compId, scheduleId) => {
  let query = JSON.stringify({ scheduleId: scheduleId });
  return axios.get(baseURL + endPoints, {
    headers: {
      query: query,
    },
  });
};

export const GetModules = (endPoints, config) => {
  return axios.get(endPoints, {
    config,
  });
};

export const Put = (endPoints, reqContent, companyID) => {
  return axios.put(baseURL + endPoints, reqContent, {});
};

export const Patch = (endPoints, reqContent, companyID) => {
  return axios.patch(baseURL + endPoints, reqContent, {});
};

export const Delete = (endPoints, companyID, reqContent) => {
  return axios.delete(baseURL + endPoints, {
    data: reqContent,
  });
};

export const Upload = (endPoints, reqContent, companyID) => {
  //console.log(reqContent);
  return axios.post(baseURL + endPoints, reqContent, {
    headers: {
      "company-id": companyID,
      "content-type": "multipart/form-data",
    },
  });
};
