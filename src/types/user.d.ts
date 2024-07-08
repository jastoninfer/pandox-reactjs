export type _User = {
    username: string;
    email: string;
    avatar: string;
    selfIntro: string;
    password: string;
};

export type User = Omit<_User, 'password'>;

export type User_w_Token = User & {
    accessToken: string;
};

export type UserCustomProfile = Partial<Omit<User, 'username' | 'email'>>;

export type UserRegister = Omit<_User, 'avatar' | 'selfIntro'>;

export type UserLogin = Omit<UserRegister, 'email'>;
