import http from '../http-common';

const PageDataService = {
    getPageById : (id) => {
        // console.log('id is.....');
        // console.log(id);
        return http.get(`/pages/${id}`);
    },
    getPagesByUserId: (userId, blogPageId=1) => {
        // console.log(`/users/${userId}/pages?blogPageId=${blogPageId}`);
        return http.get(`/users/${userId}/pages?blogPageId=${blogPageId}`);
    },
    getThreadsById : (pageId, threadPageId=1) => {
        return http.get(`/pages/${pageId}/threads?threadPage=${threadPageId}`);
    },
    getCommentsByThreadId: (threadId) => {
        // /pages/comments?threadId=:threadId
        return http.get(`/pages/comments?threadId=${threadId}`);
    },
    createPage : (pageData) => {
        return http.post(`/pages`, pageData);
    },
    updatePageById : (id, pageData) => {
        return http.put(`/pages/${id}`, pageData);
    },
};

export default PageDataService;