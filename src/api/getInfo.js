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
  search(params) {
    return request.get('/search', {
      params: {
        ...params,
      },
    });
  },
  likeSearch(value) {
    return request.get('/likeSearch', {
      params: {
        likeValue: value,
      },
    });
  },
};
