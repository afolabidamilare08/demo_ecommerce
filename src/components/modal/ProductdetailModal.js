import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Dots } from 'react-activity';
import {AiFillCloseCircle} from 'react-icons/ai';
import AppContext from '../../context/AppContext';
import "react-activity/dist/library.css";




export const ProductDetailModal = ({CurrentProductToShow,setOpenModal,openCartModal,OpenCheckout,loginProcc}) => {

    const [ isError, setisError ] = useState(null)
    const [ Removing, setRemoving ] = useState(false)
    const [ isLoading, setisLoading ] = useState(false)
    const [ Existing, setisExisting ] = useState(false)

    const { UserBasicDetails, UpdateUserCart, UserCart, BackendUrl } = useContext(AppContext);


    useEffect( () => {

      if ( CurrentProductToShow ) {
        function checkProduct(age) {
          return age.product_id === CurrentProductToShow._id;
        }
  
        if (UserCart) {
          const result = UserCart.cart_products.find(checkProduct)
  
          if ( result ) {
            setisExisting(true)
          }
        }
      }

    }, [UserCart,CurrentProductToShow] )

    const RemoveFromCart = (product) => {

      if ( !UserBasicDetails ) {

        const CartDetails = {
          ...UserCart
        }
        const Cart_products = [...CartDetails.cart_products]
        
        function checktheProduct(age) {
            return age.product_id === CurrentProductToShow._id;
        }
          
          const resultIndex = CartDetails.cart_products.findIndex(checktheProduct)

          Cart_products.splice(resultIndex,resultIndex + 1)

              UpdateUserCart({
                cart_products:Cart_products,
                cart_total: UserCart.cart_total - CurrentProductToShow.product_price
              })

          return
      }

      setRemoving(true)
      Axios.post('carts/cart/mycart/remove_from_cart',{product_id:product._id,product_quantity:1})
        .then( (response) => {
            setRemoving(false)
            UpdateUserCart(response.data)
        } )
        .catch( (err) => {
          setRemoving(false)
          console.log(err)
        } )
  
    }

    const HandleAddtoCart = () => {

        setisLoading(true)

        if ( !UserBasicDetails ) {
            setisLoading(false)

            if ( !UserCart ) {
              UpdateUserCart({
                cart_products:[
                  {
                    product:CurrentProductToShow,
                    product_id:CurrentProductToShow._id,
                    quantity:1,
                    total_product_price:CurrentProductToShow.product_price
                  }
                ],
                cart_total:CurrentProductToShow.product_price
              })
            }

            else{
              UpdateUserCart({
                cart_products:[...UserCart.cart_products,
                  {
                    product:CurrentProductToShow,
                    product_id:CurrentProductToShow._id,
                    quantity:1,
                    total_product_price:CurrentProductToShow.product_price
                  }
                ],
                cart_total: parseInt(UserCart.cart_total) + parseInt(CurrentProductToShow.product_price )
              })

            }

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
          
          <div style={{
              display:"flex",
              justifyContent:"flex-end",
              padding:".6em"
            }} >
  
              <AiFillCloseCircle className='closeModal' onClick={setOpenModal} /> 
  
            </div>

            <div className='splitIdd' >

            <div className='productDetail_box-left' >
            <img alt='wel' src={CurrentProductToShow.product_images[0].url ? CurrentProductToShow.product_images[0].url : `${BackendUrl}${CurrentProductToShow.product_images[0].path}` } className="productDetail_box-left-img" />
          </div>
  
          <div className='productDetail_box-right' >
  
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

            { Existing ? 
            
              <div>

              <button className='nbhbyyy2' style={{
                color:"white"
              }} onClick={ () => openCartModal() } >
                { Removing ? <Dots/> : "View Cart" }
              </button>

              <button className='nbhbyyy' style={{
                marginLeft:20,
                color:"white"
              }} onClick={ UserBasicDetails ? () => OpenCheckout() : () => loginProcc() } >
                { Removing ? <Dots/> : "Checkout" }
              </button>

              </div>

            :
            
            <button className='productDetail_box-right-btn' onClick={ HandleAddtoCart } >
              { isLoading ? <Dots/> : "Add to cart" }
            </button>

            }
  
          </div>

            </div>
  
        </div>
  
      );
    }else{
      return <></>
    }

  }