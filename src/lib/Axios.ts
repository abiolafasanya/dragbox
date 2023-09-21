import axios from 'axios';

let API_URI;
if (process.env.NODE_ENV === 'production') {
  API_URI = 'https://dragboxs.vercel.app';
} else {
  API_URI = 'http://localhost:3000';
}

const Axios = axios.create({
  baseURL: API_URI,
});

export default Axios;
