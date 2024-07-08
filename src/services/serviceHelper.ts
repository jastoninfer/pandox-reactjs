import type { User_w_Token } from 'types/user';
const authHeader = (): { 'x-access-token'?: string } => {
    const userStr: string | null = localStorage.getItem('user');
    if (!userStr) {
        return {};
    }
    const user: User_w_Token = JSON.parse(userStr);
    return { 'x-access-token': user.accessToken };
};

export { authHeader };
