import axios from 'axios';

let API_URI;
const apiURL = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  API_URI = process.env.NEXTAUTH_URL || apiURL;
} else {
  API_URI = apiURL;
}

const Axios = axios.create({
  baseURL: API_URI,
});


export default Axios;