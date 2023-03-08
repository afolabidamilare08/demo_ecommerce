import Axios from "axios"
import { useState } from "react"
import App from "./App"
import AppContext from "./context/AppContext"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainIndex = () => {

    // Axios.defaults.baseURL = "http://localhost:5001/"; 
    Axios.defaults.baseURL = "https://ecombend-production.up.railway.app/"; 

    const [ UserDetails, setUserDetails ] = useState(null)
    const [ UserCart, setUserCart ] = useState(null)

    const BackendUrl = "https://ecombend-production.up.railway.app/"






    const [ Products, setProducts ] = useState([
        {   _id:"63dd8d7bdc2f13abb06356fc",
            product_owner:"63dd3ebd343bb8f5167bb2fe",
          product_name:"Men Sneakers", 
          product_description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ", 
          product_price:"300",
          available:true,
          product_category:"New Arrivals",
          product_images: [
            { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464058/e2eca7d6cad3ab469c9d22d00.jpg"},
            { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464059/e2eca7d6cad3ab469c9d22d01.jpg"},
          ] },
        {   _id:"63dd8dbedc2f13abb06356ff",
            product_owner:"63dd3ebd343bb8f5167bb2fe",
            product_name:"Brogues Shoe", 
            product_description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ", 
            product_price:"900",
            available:true,
            product_category:"New Arrivals",
            product_images: [
            { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464125/e2eca7d6cad3ab469c9d22d02.jpg"},
            { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464126/e2eca7d6cad3ab469c9d22d03.jpg"},
        ] },
        {   _id:"63dd8e06dc2f13abb0635702",
        product_owner:"63dd3ebd343bb8f5167bb2fe",
        product_name:"Designer Bag", 
        product_description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ", 
        product_price:"50",
        available:true,
        product_category:"New Arrivals",
        product_images: [
        { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464196/e2eca7d6cad3ab469c9d22d04.jpg"},
        { url:"http://res.cloudinary.com/drcn2xv3q/image/upload/v1675464197/e2eca7d6cad3ab469c9d22d05.jpg"},
    ] },
    ])










    useState( () => {

        const items = JSON.parse(localStorage.getItem('original_token3'));

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
        console.log(data)
        localStorage.setItem('original_token3',JSON.stringify(data.accessToken))
    }

    const LogoutHandler = () => {
        setUserDetails(null)
        setUserCart(null)
        localStorage.setItem('original_token3',JSON.stringify(null))
    }

    return(

        <AppContext.Provider value={{
            LoginHandler: LoginHandler,
            UserBasicDetails:UserDetails,
            UpdateUserCart: (data) => setUserCart(data),
            UserCart:UserCart,
            LogoutHandler:LogoutHandler,
            BackendUrl:BackendUrl,
            Products:Products
        }} >

            <BrowserRouter>
                
                <Routes>
                    <Route path="/" exact element={ <App/>} />
                    <Route path="/verify_register/" exact element={ <App/>} />
                    <Route path="/verify_login/" exact element={ <App/>} />
                    <Route path="/verify_checkout/" exact element={ <App/>} />
                </Routes>

            </BrowserRouter>

        </AppContext.Provider>

    )

}