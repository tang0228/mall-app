import axios from 'axios';

const request = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'tangyuanqing_1619008332668',
  },
});

request.interceptors.response.use((resp) => {
  console.log(resp);
});

export default request;
