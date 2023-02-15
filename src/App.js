import { useContext, useEffect, useState } from 'react';
import './App.css';
import { HeaderComp } from './components/headerComp/headerComp';
import { HomesliderComp } from './components/headerComp/homesliderComp/homesliderComp';
import { HouseProduct } from './components/headerComp/producthouseComp/producthouseComp';
import { ProductList } from './components/headerComp/producthouseComp/productlistComp';
// import QRCode from "react-qr-code";
import {ModalComp} from './components/modal/modalComp';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageDp from './assets/images/products/f62f115a-cd77-42e0-bdee-947ca3d12042.jpg'
import io from 'socket.io-client'
import { LoginModal } from './components/modal/loginModal';
import Axios from 'axios';
import { Dots } from 'react-activity';
import "react-activity/dist/library.css";
import AppContext from './context/AppContext';
import { ProductDetailModal } from './components/modal/ProductdetailModal';
import { CHeckouthAuthModal } from './components/modal/CheckoutAuth';
import { FooterComp } from './components/footer/footerComp';
import { MyOrdersModal } from './components/modal/MyOrders';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import ImageCart from './assets/images/carts.png'
import { LoginVerificationodal } from './components/modal/loginVerificationModal';



// const socket = io.connect("https://ecombend-production.up.railway.app/")

function App() {

  const [ Products, setProducts ] = useState(null)
  const [ LoadingProduct, setLoadingProduct ] = useState(false)
  const [ CurrentContent, setCurrentContent ] = useState('product_Detail')
  const [ CurrentProductToShow, setCurrentProductToShow ] = useState(null)
  const [ CheckingOut, setCheckingOut ] = useState(false)

  const { UserBasicDetails, UserCart, UpdateUserCart } = useContext(AppContext)

  const [ OpenModal, setOpenModal ] = useState(false)
  const [ registration_validation_token, setregistration_validation_token ] = useState()

  const location = useLocation()


  if ( UserBasicDetails ) {
    Axios.defaults.headers.common['token'] = 'Bearer ' + UserBasicDetails.accessToken
  }

  const RemoveFromCart = ({product}) => {

    if ( !UserBasicDetails ) {

      const CartDetails = {
        ...UserCart
      }
      const Cart_products = [...CartDetails.cart_products]
      
      function checktheProduct(age) {
          return age.product_id === product._id;
      }
        
        const resultIndex = CartDetails.cart_products.findIndex(checktheProduct)

        Cart_products.splice(resultIndex, resultIndex + 1 )

        // console.log(Cart_products)

            UpdateUserCart({
              cart_products:Cart_products,
              cart_total: UserCart.cart_total - product.product_price
            })

        return
    }

    Axios.post('carts/cart/mycart/remove_from_cart',{product_id:product._id,product_quantity:1})
      .then( (response) => {
          UpdateUserCart(response.data)
      } )
      .catch( (err) => {
        console.log(err)
      } )

  }


  const CartModal = () => {

    return (

      <div className='cartmodal-box' >
              <div className='cartmodal-box-top' >
                <div className='cartmodal-box-top-title' >My Cart</div>
                <AiFillCloseCircle onClick={ () => setOpenModal(false) } className='cartmodal-box-top-close' />
              </div>
              { UserCart ?
              
                  <>

                    <div className='cartmodal-box-mid' >

                      { UserCart.cart_products.length > 0 ? UserCart.cart_products.map( (item,index) => {
                        return (
                          


                          <div className='cartItem' key={index} >

                            <img src={item.product.product_images[0].url} alt="wisdome" className='cartItem-img' />

                            <div className='cartItem-left' >
                              <div className='cartItem-left-name' >
                               {item.product.product_name}
                              </div>
                              <div className='cartItem-left-quantity' >
                                Quantity: {item.quantity}
                              </div>
                              <div className='cartItem-left-price' >
                                Price: ${item.total_product_price}
                              </div>
                              <button className='cartItem-left-remove' onClick={ () => RemoveFromCart(item) } >
                                Remove Item
                              </button>
                            </div>

                          </div>

                        );
                      } ) : 
                      
                      <div>
                        <img src={ImageCart} className="nocart_img" alt="well" />
                        <div className='nocart_img_txt' > Your Cart is Empty </div>
                      </div>
                      
                      }

                    </div>

                    <div className='cartmodal-box-btm' > 
                      <button className='cartmodal-box-btm-btn' onClick={ UserBasicDetails ? () => setCheckingOut(true) : () => {
                        setCheckingOut(true)
                        setCurrentContent('login_reg')
                        } } >
                        Checkout Cart Total: ${UserCart.cart_total}
                      </button>
                    </div>
                  </>
              
              : 
              <div>
              <img src={ImageCart} className="nocart_img" alt="well" />
              <div className='nocart_img_txt' > Your Cart is Empty </div>
            </div>
              
              }

      </div>

    );

  }



    useEffect( () => {

      if ( location.pathname === '/verify_register/' ) {
        const registration_validation_token = location.search.split("=");
        console.log(registration_validation_token[1])
        setCurrentContent('register_verifiying')
        setregistration_validation_token(registration_validation_token[1])
      }

      setLoadingProduct(true)
      Axios.get('/products/')
        .then( (response) => {
          setLoadingProduct(false)
          // console.log(response.data)
          setProducts(response.data)
        } )
        .catch( (err) => {
          setLoadingProduct(false)
        } )

    }, [location] )

  const ModalContent = () => {

    if( CurrentContent === 'product_Detail' ){
      return <ProductDetailModal
        CurrentProductToShow={CurrentProductToShow}
        setOpenModal={ () => setOpenModal(false) }
      />
    }

    if( CurrentContent === 'my_orders' ){
      return <MyOrdersModal
              closeModal={ () => setOpenModal(false) }
            />
    }

    if( CurrentContent === 'my_cart' ){

      if ( CheckingOut ) {
        return <CHeckouthAuthModal
        closeModal={() => {
          setOpenModal(false)
          setCheckingOut(false)
        }}
        />
      }else{
        return <CartModal/>

      }

    }

    if( CurrentContent === 'login_reg' ){
      return <LoginModal
          closeModal={() => setOpenModal(false)}
      />
    }

    if ( CurrentContent === 'register_verifiying' ) {
      return <LoginVerificationodal
              registration_validation_token={ registration_validation_token }
                // closeModal={ () => setOpenModal(false) }
              />
    }

    else{
      return ;
    }

  }


  return (
    <div className="App">

        <HeaderComp
          openMycart={ () => {
            setCurrentContent('my_cart')
            setOpenModal(true)
          } }
          openLogin={ () => {
            setCurrentContent('login_reg')
            setOpenModal(true)
          } }
          openOrders={ () => {
            setCurrentContent('my_orders')
            setOpenModal(true)
          } }
        />

        <HomesliderComp/>
        
          { LoadingProduct ? <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color:"blue",
            padding:"3rem"
          }} >

            <Dots/>

          </div> :
          
          
            <div>
            <HouseProduct
              title={"New Arrivals"}
              products={ 
                <>

                  { Products ? Products.map( (product,index) => {

                    return(
                      <ProductList key={index}
                          product_image={ product.product_images[0].url }
                          product_name={product.product_name}
                          product_price={product.product_price}
                      openMOdal={ () => {
                        setCurrentProductToShow(product)
                        setCurrentContent('product_Detail')
                        setOpenModal(true)
                      } } />
                    );

                  } ) : <></> }
                </>
              }
            />
          </div>

          }

        <ModalComp
          openModal={OpenModal}
          content={ <ModalContent/> }
        />

      {/* <QRCode
        size={256}
        style={{ height: "10em", width: "10em", margin:"5em" }}
        value={value}
        viewBox={`0 0 256 256`} 
      /> */}

      <FooterComp/>

    </div>
  );
}

export default App;