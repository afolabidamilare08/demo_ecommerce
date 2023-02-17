import { useContext, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageLogo from '../../assets/images/highhopes.png';
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Axios from 'axios';
import QRCode from 'react-qr-code';
import EmailAddress from '../../assets/images/email.png';
import AppContext from '../../context/AppContext';



export const LoginModal = ({closeModal}) => {

    const { LoginHandler, UserCart } = useContext(AppContext)
    const [ Username, setUsername ] = useState('')
    const [ isLoading, setisLoading ] = useState(false)
    const [ isVerifying, setisVerifying ] = useState(false)
    const [ isError, setisError ] = useState({
        error_message:"",
        error_status:""
    })
    const [ VerifiactionError, setVerifiactionError ] = useState({
        error_message:"",
        error_status:""
    })
    
    const [ Qrauth, setQrauth ] = useState(null)


    const NewSignUpHandler = () => {

        setisLoading(true)

        Axios.post('/auth/get_token')
            .then( (response) => {
                console.log(response.data)

                Axios.post('/auth/power',{token:response.data.token,email_address:Username})
                    .then( (response) => {
                        console.log(response.data)
                        setisLoading(false)
                        setQrauth(response.data)
                    } )
                    .catch( (err) => {
                        setisLoading(false)
                        console.log(err)

                        if ( err.response ) {
                            setisError({
                                error_message:err.response.data.errorMessage,
                                error_status:true
                            })
                        }else{
                            setisError({
                                error_message:"Something went wrong",
                                error_status:true
                            })
                        }

                    } )

            } )
            .catch( err => {
                setisLoading(false)
                console.log(err)
            } )

    }

    const NewSiginHandler = () => {

        setisLoading(true)

        Axios.post('/auth/get_token')
            .then( (response) => {
                console.log(response.data)

                Axios.post('/auth/login_power',{token:response.data.token,email_address:Username})
                    .then( (response) => {
                        console.log(response.data)
                        setisLoading(false)
                        setQrauth(response.data)
                    } )
                    .catch( (err) => {
                        setisLoading(false)
                        console.log(err)
                        if ( err.response ) {
                            setisError({
                                error_message:err.response.data.errorMessage,
                                error_status:true
                            })
                        }else{
                            setisError({
                                error_message:"Something went wrong",
                                error_status:true
                            })
                        }
                    } )

            } )
            .catch( err => {
                setisLoading(false)
                console.log(err)
            } )

    }




    const VerifiySigin = () => {

        setisVerifying(true)

        Axios.get(`auth/signin_verify/${Qrauth.auth_request_id}/${Username}` )
            .then( (response) => {
                
                console.log(response.data)
                setisVerifying(false)
                setVerifiactionError({
                    error_message:"",
                    error_status:false
                })

                if ( !response.data.accessToken ) {
                    setVerifiactionError({
                        error_message:"You have not completed the authentication process",
                        error_status:true
                    })
                }

                if ( response.data.accessToken) {
                    LoginHandler(response.data)
                }

            } )
            .catch( (err) => {
                setisVerifying(false)
                setVerifiactionError({
                    error_message:err.response.data,
                    error_status:false
                })
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

        { !Qrauth ?
        
        
            <>
            
            <div className='loginModal-box-msg' >
                Sign In with your username
            </div>

            <div style={{
                color:"tomato",
                textAlign:"center",
                marginTop:"1rem",
                fontSize:".9rem"
            }} >
                { isError.error_message }
            </div>

            <input type={"text"} className="loginModal-box-input" 
                placeholder="E.g afolabidamilare08@gmail.com, samuel e.t.c" 
                value={Username} 
                onChange={ (event) => {
                    setUsername(event.target.value)
                } } />

            <button className='loginModal-box-fbtn' onClick={NewSiginHandler} > { isLoading ? <Dots/> :  "Sign in" } </button>
            <button className='loginModal-box-fbtn2' onClick={NewSignUpHandler} > { isLoading ? <Dots/> :  "Sign up" } </button>


            </>
        
        : <>  

            <img alt="succes" src={EmailAddress} style={{
                width:"100px",
                height:"100px",
                display:"block",
                margin:"30px auto"
            }} />

            <div style={{
                textAlign:"center",
                margin:"1rem auto"
            }} >

                    Check your email address to complete the register process
            </div> 
        </> }

      </div>

    );

  }