import http from "@/untils/request";


export const getData = () => {
    return http.get('/home/getData')
}

export const addUser = (param) => {
    return http.post('/user/add', param)
}

export const editUser = (param) => {
    return http.post('/user/edit', param)
}

export const delUser = (param) => {
    return http.post('/user/del', param)
}

export const getUser = (param) => {
    return http.get('/user/getUser', param)
}

export const getPermission = (param) => {
    return http.post('/permission/menu',param)
}