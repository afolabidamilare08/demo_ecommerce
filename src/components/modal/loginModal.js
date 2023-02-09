import { useContext, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageLogo from '../../assets/images/highhopes.png';
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Axios from 'axios';
import QRCode from 'react-qr-code';
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


    const SignUpHandler = () => {

        if ( Username !== "" ) {

            if ( UserCart ) {
                console.log(UserCart)
                var dataTOsend = {username:Username,cart:UserCart}
            }else{
                console.log("tyy")
                dataTOsend = {username:Username}
            }

            setisLoading(true)
            Axios.post('auth/signup',dataTOsend)
                .then( (response) => {
                    setQrauth(response.data)
                    console.log(response.data) 
                    setisError({
                        error_message:"",
                        error_status:""
                    })
                    setisLoading(false)
                } )
                .catch( (error) => {
                    setisLoading(false)
                    setisError({
                        error_message:error.response.data,
                        error_status:true
                    })
                } )

        }

    }


    const SignInHandler = () => {

        if ( Username !== "" ) {
            setisLoading(true)
            Axios.post('auth/signin',{username:Username})
            .then( (response) => {

                if ( response.data.verification_details ) {
                    setQrauth(response.data.verification_details)
                }

                if ( response.data.auth_request_id ) {
                    setQrauth(response.data)
                }

                console.log(response.data) 
                setisError({
                    error_message:"",
                    error_status:false
                })
                setisLoading(false)
            } )
            .catch( (error) => {
                setisLoading(false)
                setisError({
                    error_message: error.response ? error.response.data : "something went wrong" ,
                    error_status:true
                })
            } )
        }

    }


    const VerifiySignUp = () => {

        setisVerifying(true)

        Axios.get(`auth/signup_verify/${Qrauth.invite_code}`)
            .then( (response) => {
                
                console.log(response.data.accessToken)
                
                if ( response.data.accessToken ) {
                    LoginHandler(response.data)
                    console.log("ss")
                }

                setisVerifying(false)
                setVerifiactionError({
                    error_message:"",
                    error_status:false
                })

                if ( response.data.verification_details.invite_status !== "Completed" ) {
                    setVerifiactionError({
                        error_message:"You have not completed the authentication process",
                        error_status:true
                    })
                }

            } )
            .catch( (err) => {
                setisVerifying(false)
                if (err.response) {
                    setVerifiactionError({
                        error_message:err.response.data,
                        error_status:false
                    })
                }
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

            <button className='loginModal-box-fbtn' onClick={SignInHandler} > { isLoading ? <Dots/> :  "Sign in" } </button>
            <button className='loginModal-box-fbtn2' onClick={SignUpHandler} > { isLoading ? <Dots/> :  "Sign up" } </button>


            </>
        
        :  <div style={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column"
        }} >
        
                <QRCode
                    size={256}
                    style={{ height: "10em", width: "10em", margin:"2em auto"}}
                    value={Qrauth.qr_code_data}
                    viewBox={`0 0 256 256`} 
                />

                <div style={{
                    color:"tomato",
                    textAlign:"center",
                    marginTop:"1rem",
                    fontSize:".9rem"
                }} >
                    { VerifiactionError.error_message }
                </div>

                <div style={{
                    fontSize:"0.9rem",
                    textAlign:"center"
                }} >
                    Scan the Qr code with your auth amour app to complete your authentication
                </div>

                <button className='loginModal-box-fbtn' onClick={ () => {

                    if (Qrauth.invite_status) {
                        VerifiySignUp()
                    }

                    if ( Qrauth.auth_request_id ) {
                        VerifiySigin()
                    }

                } } >
                    { isVerifying ? <Dots/> : "Done With Authentication" }    
                </button>

        </div> }

      </div>

    );

  }