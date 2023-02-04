import { useState } from "react"
import App from "./App"
import AppContext from "./context/AppContext"

export const MainIndex = () => {

    const [ UserDetails, setUserDetails ] = useState(null)
    const [ UserCart, setUserCart ] = useState(null)

    return(

        <AppContext.Provider value={{
            LoginHandler: (data) => {
                setUserDetails(data)
                setUserCart(data.cart)
            },
            UserBasicDetails:UserDetails,
            UpdateUserCart: (data) => setUserCart(data),
            UserCart:UserCart 
        }} >

            <App/>

        </AppContext.Provider>

    )

}