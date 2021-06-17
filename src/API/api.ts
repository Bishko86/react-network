import axios from 'axios'
import { UsersStateType, ProfileType, LoginApiType, LogoutApiType, AuthType, ProfileApiType } from './../types/types'
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d382d54-6433-44f9-b0eb-5712753c3007'
    }
}
)

export const usersAPI = {

    getUsers(numPage: number = 1, pageSize: number) {
        return instance.get<UsersStateType>(`users?page=${numPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(id: number) {
        return instance.post(`follow/${id}`, {},
        ).then(response => response.data)
    },
    unFollow(id: number) {
        return instance.delete(`follow/${id}`,
        ).then(response => response.data)
    }
}

export const profileAPI = {
    getUser(id: number | null) {
        return instance.get<ProfileType>(`profile/${id}`).then(response => response.data)
    },
    getStatus(id: number | null) {
        return instance.get('profile/status/' + id)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', { status })
    },
    savePhoto(image: File) {
        let formData = new FormData();
        formData.append('image', image);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {

        return instance.put<ProfileApiType>('/profile', profile).then(res => res);
    }
}

export const authorAPI = {
    authMe() {
        return instance.get<AuthType>('auth/me').then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginApiType>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutApiType>('auth/login').then(res => res.data)
    }
}
type CaptchaType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaType>('security/get-captcha-url').then(res => res.data)
    }
}