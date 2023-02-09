import Axios from "axios"
import { useState } from "react"
import App from "./App"
import AppContext from "./context/AppContext"

export const MainIndex = () => {

    Axios.defaults.baseURL = "https://ecombend-production.up.railway.app/"; 

    const [ UserDetails, setUserDetails ] = useState(null)
    const [ UserCart, setUserCart ] = useState(null)

    useState( () => {

        const items = JSON.parse(localStorage.getItem('original_token'));

        if (items) {
            Axios.defaults.headers.common['token'] = 'Bearer ' + items
            console.log(items)

            Axios.get('/auth/user_details')
                .then( (response) => {
                    console.log(response.data)
                    setUserCart(response.data.cart)
                    setUserDetails(response.data.user)
                } )
                .catch( (err) => {
                    console.log(err)
                } )

        }else{
            
        }

    }, [] )


    const LoginHandler = (data) => {
        setUserDetails(data)
        setUserCart(data.cart)
        console.log(data.accessToken)
        localStorage.setItem('original_token',JSON.stringify(data.accessToken))
    }

    const LogoutHandler = () => {
        setUserDetails(null)
        setUserCart(null)
        localStorage.setItem('original_token',JSON.stringify(null))
    }

    return(

        <AppContext.Provider value={{
            LoginHandler: LoginHandler,
            UserBasicDetails:UserDetails,
            UpdateUserCart: (data) => setUserCart(data),
            UserCart:UserCart,
            LogoutHandler:LogoutHandler
        }} >

            <App/>

        </AppContext.Provider>

    )

}