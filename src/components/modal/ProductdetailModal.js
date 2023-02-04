import Axios from 'axios';
import { useContext, useState } from 'react';
import { Dots } from 'react-activity';
import {AiFillCloseCircle} from 'react-icons/ai';
import AppContext from '../../context/AppContext';
import "react-activity/dist/library.css";




export const ProductDetailModal = ({CurrentProductToShow,setOpenModal}) => {

    const [ isError, setisError ] = useState(null)
    const [ SuccessMessager, setSuccessMessager ] = useState(false)
    const [ isLoading, setisLoading ] = useState(false)

    const { UserBasicDetails, UpdateUserCart } = useContext(AppContext);

    const HandleAddtoCart = () => {

        setisLoading(true)

        if ( !UserBasicDetails ) {
            setisLoading(false)
            setisError("You must be logged in before you can add to cart")
            return
        }

        Axios.post('/carts/cart/mycart/add_to_cart',{
            product_id:CurrentProductToShow._id,
            product_quantity:1,
        }).then( (response) => {
            setisLoading(false)
            console.log(response.data)
            UpdateUserCart(response.data)
            setSuccessMessager(true)
        } )
        .catch( (err) => {
            setisLoading(false)
            if (err.response.data) {
                setisError(err.response.data)
            }else{
                setisError("Something went wrong")
            }
        } )

    }

    if (CurrentProductToShow) {
      return (

        <div className='productDetail_box' > 
          
          <div className='productDetail_box-left' >
            <img alt='wel' src={CurrentProductToShow.product_images[0].url} className="productDetail_box-left-img" />
          </div>
  
          <div className='productDetail_box-right' >
  
            <div style={{
              display:"flex",
              justifyContent:"flex-end"
            }} >
  
              <AiFillCloseCircle className='closeModal' onClick={setOpenModal} /> 
  
            </div>
  
            <div className='productDetail_box-right-name' >
              {CurrentProductToShow.product_name}
            </div>
  
            <div className='productDetail_box-right-price' >
              $ {CurrentProductToShow.product_price}
            </div>
  
            <div className='productDetail_box-right-tit' >
              Product Detail
            </div>
  
            <div className='productDetail_box-right-det' >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
              qui officia deserunt mollit anim id est laborum
            </div>
  
            <div style={{
                marginTop:".5rem",
                marginBottom:".5rem",
                color:"red",
                fontSize:".9rem"
            }} >
                {isError}
            </div>

            <div style={{
                marginTop:".5rem",
                marginBottom:".5rem",
                color:"green",
                fontSize:".9rem"
            }}  > {SuccessMessager ? "Product was successfully added to cart" : "" } </div> 

            <button className='productDetail_box-right-btn' onClick={ HandleAddtoCart } >
              { isLoading ? <Dots/> : "Add to cart" }
            </button>
  
          </div>
  
        </div>
  
      );
    }else{
      return <></>
    }

  }