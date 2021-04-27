import request from "./request";

export default {
    getsideba(params) {
        return request.get('/getsidebar', {params});
    },
    getGoodsList(params) {
        return request.get('/getGoodsList', { params} );
    }
}