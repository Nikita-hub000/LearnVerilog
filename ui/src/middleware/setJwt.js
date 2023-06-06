export default function setJwt ({ next, store }){
    const local = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if(!local.accessToken)
    {
        return next()
    }
    if(local.accessToken && !store.getters.getUserInfo.name) {
        store.commit('setInfo', {login: local.name, email: local.email, id: local.id, accessToken: local.accessToken})
    }
    return next()
}