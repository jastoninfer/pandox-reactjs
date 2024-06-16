import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/';

const viewProfile = (username) => {
    return http.get(
        `${BASE_URL}users/${username}`,
        {headers: authHeader()}
    );
};

const updateProfile = async (newProfile) => {
    const res = await http.put(
        `${BASE_URL}users`,
        newProfile,
        {headers: authHeader()}
    );
    // console.log('------------');
    // console.log(res);
    // // 更新本地redux内容
    // const old_item = localStorage.getItem('user');
    // const old_item_obj = JSON.parse(old_item);
    // const new_item_obj = {...old_item_obj, ...res.data};
    // console.log('new obj, ', new_item_obj);
    // localStorage.setItem('user', JSON.stringify({...old_item_obj, ...res.data}));
    return res;
};

export default {
    viewProfile,
    updateProfile,
};