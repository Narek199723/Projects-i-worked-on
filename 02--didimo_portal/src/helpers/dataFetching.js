import axios from 'axios';

export const getData = async (url, Authorization) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Authorization}`,
    },
  });
  return data;
};

export const postData = async (url, body, Authorization) => {
  console.log(url);
  const { data } = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Authorization}`,
    },
  });
  return data;
};
