import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { _FilenameResData } from 'types/services';
import type { _Image, ImageResData } from 'types/image';
import type { _MessageResData } from 'types/services';

type ImagesResponse = AxiosResponse<ImageResData[]>;

const BASE_URL = '/api/db/';

const addImage = (imageData: FormData): Promise<_FilenameResData> => {
    return http
        .post(`${BASE_URL}images/`, imageData, {
            headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
        })
        .then((res: AxiosResponse<_FilenameResData>) => {
            return res.data;
        });
};

const getImageById = (imageId: string) => {
    return http.get(`${BASE_URL}images/${imageId}`);
};

const getAllImages = (): Promise<ImageResData[]> => {
    // 用户检索自己的album
    return http
        .get(`${BASE_URL}imagelist/`, { headers: authHeader() })
        .then((res: ImagesResponse) => {
            return res.data;
        });
};

const deleteImageById = (imageId: string): Promise<_MessageResData> => {
    return http
        .delete(`${BASE_URL}images/${imageId}`, { headers: authHeader() })
        .then((res: AxiosResponse<_MessageResData>) => {
            return res.data;
        });
};

export default {
    addImage,
    getImageById,
    getAllImages,
    deleteImageById,
};
