import axios from 'axios'

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const createUser = (userInfo) => {
    return axios.request({
        url: '/user/createUser',
        method: 'post',
        data: userInfo
    })
}

export const updateUser = (userInfo) => {
    return axios.request({
        url: '/user/updateUser',
        method: 'post',
        data: userInfo
    })
}

export const getUserList = (pageInfo) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params: pageInfo
    })
}
