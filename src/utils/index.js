// ==== Log function ====
const _log = (...d) => console.log(d);

// ==== HTTP GET ====

const getData = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const postData = async (url, token, data) => {
  // console.log('api data=>',data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export { _log, getData, postData };
