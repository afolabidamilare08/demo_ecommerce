import { useContext, useEffect, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageLogo from '../../assets/images/highhopes.png';
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import Axios from 'axios';
import QRCode from 'react-qr-code';
import AppContext from '../../context/AppContext';



export const CHeckouthAuthModal = ({closeModal}) => {

    const { LoginHandler, UserBasicDetails } = useContext(AppContext)
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

    useEffect( () => {

        if ( UserBasicDetails.username ) {
            setisLoading(true)
            Axios.post('auth/authenticate/checkout',{username:UserBasicDetails.username})
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
                    error_message:error.response.data,
                    error_status:true
                })
            } )
        }

    }, [ UserBasicDetails ] )


    const VerifiySigin = () => {

        setisVerifying(true)

        Axios.get(`auth/authenticate/checkout_verify/${Qrauth.auth_request_id}/${UserBasicDetails.username}` )
            .then( (response) => {
                
                console.log(response.data)
                setisVerifying(false)
                setVerifiactionError({
                    error_message:"",
                    error_status:false
                })

                // if ( !response.data.accessToken ) {
                //     setVerifiactionError({
                //         error_message:"You have not completed the authentication process",
                //         error_status:true
                //     })
                // }

                if ( response.data.order) {
                    console.log(response.data)
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
        
        
            <div style={{
                display:"flex",
                justifyContent:"center",
                padding:"2rem",
                color:"blue"
            }} >
                <Dots/>
            </div>
        
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