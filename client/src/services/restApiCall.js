import axios from "axios";

function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.commmon["Authorization"];
  }
}

function restAPICall(method, url, data) {
  return new Promise(function(resolve, reject) {
    axios[method.toLowerCase()](url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
}

export { restAPICall, setTokenHeader };
