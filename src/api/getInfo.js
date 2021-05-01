import request from './request';

export default {
  getSideList(type) {
    return request.get('/getsidebar', {
      params: {
        type,
      },
    });
  },
  getGoodsList(params) {
    return request.get('/getGoodsList', {
      params: {
        ...params,
      },
    });
  },
};
