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

export const deleteUser = (userId) => {
  return axios.request({
    url: 'user/deleteUser',
    method: 'post',
    data: userId
  })
}

export const getMenu = (loginInfo) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: loginInfo
  })
}
