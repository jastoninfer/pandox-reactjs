import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/';

const addImage = (imageData) => {
    return http.post(
        `${BASE_URL}images/`,
        imageData,
        {headers:
            {...authHeader(),
                 'Content-Type': 'multipart/form-data'
            }
        }
    );
};

const getImageById = (imageId) => {
    return http.get(
        `${BASE_URL}images/${imageId}`,
    );
};

const getAllImages = () => {
    // 用户检索自己的album
    return http.get(
        `${BASE_URL}imagelist/`,
        {headers: authHeader()}
    );
};

const deleteImageById = (imageId) => {
    return http.delete(
        `${BASE_URL}images/${imageId}`,
        {headers: authHeader()}
    );
};

export default {
    addImage,
    getImageById,
    getAllImages,
    deleteImageById,
};