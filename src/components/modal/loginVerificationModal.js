import { useContext, useEffect, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageLogo from '../../assets/images/highhopes.png';
import { Dots, Spinner } from "react-activity";
import "react-activity/dist/library.css";
import Axios from 'axios';
import ErrorImg from '../../assets/images/close.png';
import SuccessImg from '../../assets/images/check.png';
import AppContext from '../../context/AppContext';



export const LoginVerificationodal = ({closeModal,registration_validation_token}) => {

    const { LoginHandler, UserCart } = useContext(AppContext)

    const [ isLoading, setisLoading ] = useState(true)
    const [ isError, setisError ] = useState(false)

    useEffect( () => {

        setisLoading(true)
        setisError(false)
        Axios.post('/auth/verify_power',{auth_validation_token:registration_validation_token})
            .then( (response) => {

                setisLoading(false)
                setisError(false)

            }  )
            .catch( ( err ) => {
                setisLoading(false)
                setisError(true)
            } )        

    }, [registration_validation_token] )

    var whattodisplay;

    if ( isError ) {
        
        whattodisplay = <>
        
            <img src={ErrorImg} alt="error" style={{
                width:"120px",
                height:"120px",
                display:"block",
                margin:"40px auto"
            }} />

            <div style={{
                margin:"8px auto",
                textAlign:"center",
                fontWeight:"700",
                width:"100%",
                color:"tomato"
            }} > Something went wrong </div> 

        </>

    }

    if ( isLoading ) {
        whattodisplay = <>
        
        <Spinner style={{
            width:"50px",
            height:"50px",
            margin:"50px auto"
        }} />

        <div style={{
            margin:"8px auto",
            textAlign:"center",
            fontWeight:"700",
            width:"100%"
        }} > Verifiying Details </div>

        </>
    }

    if ( !isLoading && !isError ) {
        whattodisplay = <>
        
            <img src={SuccessImg} alt="error" style={{
                width:"120px",
                height:"120px",
                display:"block",
                margin:"40px auto"
            }} />

            <div style={{
                margin:"8px auto",
                textAlign:"center",
                fontWeight:"700",
                width:"100%",
                color:"green"
            }} > Your Account was sucessfully created </div> 

        </>
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

        {whattodisplay}

      </div>

    );

  }