export default function auth ({ next, store }){
    if(!store.getters.getUserInfo.name){
        return next({name: 'MainPage'})
    }
    return next()
}