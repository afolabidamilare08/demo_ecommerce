import { useContext, useEffect, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageLogo from '../../assets/images/highhopes.png';
import { Dots, Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Axios from 'axios';
import ErrorImg from '../../assets/images/close.png';
import SuccessImg from '../../assets/images/check.png';
import AppContext from '../../context/AppContext';



export const CheckuoutVerificationodal = ({closeModal,auth_validation_token,auth_request_id}) => {

    const { LoginHandler, UpdateUserCart } = useContext(AppContext)

    const [ isLoading, setisLoading ] = useState(false)
    const [ isError, setisError ] = useState(false)
    const [ isSuccessfull, setisSuccessfull ] = useState(false)

    const VerifiyCheckoutHandler = () => {

        setisLoading(true)

        Axios.post('/auth/get_token')
        .then( (response) => {
            console.log(response.data)

            Axios.post('/auth/verify_checkout_power',{token:response.data.token,
                auth_validation_token:auth_validation_token,
                auth_request_id:auth_request_id
            })
                .then( (response) => {
                    console.log(response.data)
                    setisSuccessfull(true)
                    setisLoading(false)
                    setisError(false)
                    console.log(response)
                    UpdateUserCart(response.data.cart)
                    // LoginHandler(response.data)
                    // closeModal()
                } )
                .catch( (err) => {
                    setisLoading(false)
                    setisError(true)
                    console.log(err)
                } )

        } )
        .catch( err => {
            setisLoading(false)
            setisError(true)
            console.log(err)
        } )

    }

    return (

      <div className='loginModal-box' >

        <div className='loginModal-box-top' >
          <AiFillCloseCircle onClick={ closeModal } className='loginModal-box-top-close' />
        </div>
        
        <div className='loginModal-box-title' > Authentication </div>

        <div className='loginModal-box-powered' >
          <div className='loginModal-box-powered-txt' >Powered By </div>
          <img src={ImageLogo} alt="ffhffnn" className='loginModal-box-powered-img' />
        </div>

        {/* {whattodisplay} */}

        { isLoading ?
        
            
                <Spinner style={{
                    width:"50px",
                    height:"50px",
                    margin:"50px auto"
                }} />
            
        
        :

                <>

                    { isSuccessfull ?
                    
                    <img alt="succes" src={SuccessImg} style={{
                        width:"100px",
                        height:"100px",
                        display:"block",
                        margin:"30px auto"
                        }} />

                    :
                    
                    <div style={{
                        textAlign:"center",
                        marginTop:"1rem",
                        color:isError ? "tomato" : "black"
                    }} > { isError ? "Something went wrong" : "Click on the button below to complete your checkout" } </div>

                    }

                    { isSuccessfull ? <div style={{
                        textAlign:"center",
                        color:"green",
                        fontWeight:"600"
                        }} > Checkout Successful </div> : <button className='complete_btn' onClick={ VerifiyCheckoutHandler } > 
                        Complete Your Checkout
                    </button>}
                </>
        }

      </div>

    );

  }