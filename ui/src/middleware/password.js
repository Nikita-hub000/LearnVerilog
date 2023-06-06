export default function password ({ next, store }){
    console.log(location.pathname.slice(10) !== store.getters.getJWT)
    if(location.pathname.slice(10) !== store.getters.getJWT){
        return next({name: 'MainPage'})
    }
    return next()
}