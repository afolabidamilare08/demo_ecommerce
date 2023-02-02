import { useState } from 'react';
import './App.css';
import { HeaderComp } from './components/headerComp/headerComp';
import { HomesliderComp } from './components/headerComp/homesliderComp/homesliderComp';
import { HouseProduct } from './components/headerComp/producthouseComp/producthouseComp';
import { ProductList } from './components/headerComp/producthouseComp/productlistComp';
import QRCode from "react-qr-code";
import {ModalComp} from './components/modal/modalComp';
import {AiFillCloseCircle} from 'react-icons/ai';
import ImageDp from './assets/images/products/f62f115a-cd77-42e0-bdee-947ca3d12042.jpg'
import ImageLogo from './assets/images/highhopes.png';

function App() {

  const [ MyCart, setMyCart ] = useState([1,2,3,4,5,6,])
  const [ Products, setProducts ] = useState([1,2,3,4,5,6,])
  const [ CurrentContent, setCurrentContent ] = useState('product_Detail')

  const [ OpenModal, setOpenModal ] = useState(false)

  const ProductDetail = () => {

    return (

      <div className='productDetail_box' > 
        
        <div className='productDetail_box-left' >
          <img alt='wel' src={ImageDp} className="productDetail_box-left-img" />
        </div>

        <div className='productDetail_box-right' >

          <div style={{
            display:"flex",
            justifyContent:"flex-end"
          }} >

            <AiFillCloseCircle className='closeModal' onClick={ () => setOpenModal(false) } /> 

          </div>

          <div className='productDetail_box-right-name' >
            Manchester United Jersy
          </div>

          <div className='productDetail_box-right-price' >
            $ 4,000
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

          <button className='productDetail_box-right-btn' >
            Add to cart
          </button>

        </div>

      </div>

    );

  }

  const CartModal = () => {

    return (

      <div className='cartmodal-box' >

        <div className='cartmodal-box-top' >
          <div className='cartmodal-box-top-title' >My Cart</div>
          <AiFillCloseCircle onClick={ () => setOpenModal(false) } className='cartmodal-box-top-close' />
        </div>

        <div className='cartmodal-box-mid' >

          { MyCart.map( (item,index) => {
            return (
              
              <div className='cartItem' key={index} >

                <img src={ImageDp} alt="wisdome" className='cartItem-img' />

                <div className='cartItem-left' >
                  <div className='cartItem-left-name' >
                    Manchester United Jersey
                  </div>
                  <div className='cartItem-left-quantity' >
                    Quantity: 4
                  </div>
                  <div className='cartItem-left-price' >
                    Price: $4,000
                  </div>
                  <button className='cartItem-left-remove' >
                    Remove Item
                  </button>
                </div>

              </div>

            );
          } ) }

        </div>

        <div className='cartmodal-box-btm' > 
          <button className='cartmodal-box-btm-btn' >
            Checkout Cart Total: $50,000
          </button>
        </div>

      </div>

    );

  }

  const LoginModal = () => {

    return (

      <div className='loginModal-box' >

        <div className='loginModal-box-top' >
          <AiFillCloseCircle onClick={ () => setOpenModal(false) } className='loginModal-box-top-close' />
        </div>
        
        <div className='loginModal-box-title' > Sign In </div>

        <div className='loginModal-box-powered' >
          <div className='loginModal-box-powered-txt' >Powered By </div>
          <img src={ImageLogo} alt="ffhffnn" className='loginModal-box-powered-img' />
        </div>

        <div className='loginModal-box-msg' >
          Sign In with your email address
        </div>

        <input type={"email"} className="loginModal-box-input" placeholder="secure-user@email.com" />

        <button className='loginModal-box-fbtn' > Sign In </button>
        <button className='loginModal-box-fbtn2' > Sign Up </button>

      </div>

    );

  }


  const ModalContent = () => {

    if( CurrentContent === 'product_Detail' ){
      return <ProductDetail/>
    }

    if( CurrentContent === 'my_cart' ){
      return <CartModal/>
    }

    if( CurrentContent === 'login_reg' ){
      return <LoginModal/>
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
        />

        <HomesliderComp/>
        
        <div>
          <HouseProduct
          title={"New Arrivals"}
            products={ 
              <>

                { Products.map( (product,index) => {

                  return(
                    <ProductList key={index} openMOdal={ () => {
                      setCurrentContent('product_Detail')
                      setOpenModal(true)
                    } } />
                  );

                } ) }
              </>
             }
          />
        </div>

        <ModalComp
          openModal={OpenModal}
          content={ <ModalContent/> }
        />

    </div>
  );
}

export default App;


{/* <QRCode
size={256}
style={{ height: "10em", width: "10em", margin:"5em" }}
value={value}
viewBox={`0 0 256 256`}
/> */}