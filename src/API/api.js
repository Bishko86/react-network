import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d382d54-6433-44f9-b0eb-5712753c3007'
    }
}
)

export const usersAPI = {

    getUsers(numPage = 1, pageSize) {
        return instance.get(`users?page=${numPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(id) {
        return instance.post(`follow/${id}`, {},
        ).then(response => response.data)
    },
    unFollow(id) {
        return instance.delete(`follow/${id}`,
        ).then(response => response.data)
    }
}

export const profileAPI = {
    getUser(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get('profile/status/' + id)
    },
    updateStatus(status) {
        return instance.put('profile/status', { status })
    },
    savePhoto(image) {
        let formData = new FormData();
        formData.append('image', image);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {

        return instance.put('/profile', profile);
    }
}

export const authorAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}