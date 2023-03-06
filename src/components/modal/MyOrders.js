import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {AiFillCloseCircle,AiOutlineArrowLeft} from 'react-icons/ai';
import AppContext from '../../context/AppContext';


export const MyOrdersModal = ({closeModal}) => {

    const { UserBasicDetails, BackendUrl } = useContext(AppContext)

    const [ isLoading, setisLoading ] = useState(false)
    const [ isError, setisError ] = useState(false)
    const [ MyOrders, setMyOrders ] = useState(null)
    const [ CurrentOrder, setCurrentOrder ] = useState(null)

    useEffect( () => {

        setisLoading(true)

        Axios.get(`/orders/myorders/${UserBasicDetails._id}`)
            .then( (response) => {
                setisLoading(false)
                console.log(response)
                setMyOrders(response.data)
            } )
            .catch( (err) => {
                console.log(err)
                setisError("Something Went wrong")
            } )

    }, [] )


    const MainOrder = () => {

        return (
    
          <div className='cartmodal-box' >
                  <div className='cartmodal-box-top' >
                    <div className='cartmodal-box-top-title' style={{
                        display:"flex"
                    }} > <AiOutlineArrowLeft onClick={ () => setCurrentOrder(null) } style={{
                        marginRight:"1rem",
                        cursor:"pointer"
                    }} /> { CurrentOrder ? `Order ${CurrentOrder._id}` : "" } </div>
                    <AiFillCloseCircle onClick={ closeModal } className='cartmodal-box-top-close' />
                  </div>
                  { CurrentOrder ?
                  
                      <>
    
                        <div className='cartmodal-box-mid' >
    
                          { CurrentOrder.order_items.map( (item,index) => {
                            return (
                              
    
    
                              <div className='cartItem' key={index} >
    
                                <img src={item.product.product_images[0].url ? item.product.product_images[0].url : `${BackendUrl}${item.product.product_images[0].path}` } alt="wisdome" className='cartItem-img' />
    
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
                                </div>
    
                              </div>
    
                            );
                          } ) }
    
                        </div>

                        <div className='cartmodal-box-btm' > 
                            <button className='cartmodal-box-btm-btn' >
                                 Order Total: ${CurrentOrder.order_price}
                            </button>
                        </div>

                      </>
                  
                  : <>  </> }
    
          </div>
    
        );
    
      }

    const OrderMainList = () => {

        return(

            <div className='cartmodal-box' >
                    <div className='cartmodal-box-top' >
                      <div className='cartmodal-box-top-title' >My Orders</div>
                      <AiFillCloseCircle onClick={ closeModal } className='cartmodal-box-top-close' />
                    </div>
      
                    { MyOrders ?
                    <div className='cartmodal-box-mid' >
                      {MyOrders.map( (item,index) => {
      
                          if ( item.order_status === "pending" ) {
                              var color = "orange"
                          }else{
                              color = "green"
                          }
      
                          return(
      
                          <div className='OrderList' key={index} onClick={ () => setCurrentOrder(item) } >
                              <div className='OrderList-order' >Order - {item._id}</div> <div className='OrderList-status' style={{color:color}} > {item.order_status} </div>
                          </div>
      
                          );
                      } )}
      
                      </div>
      
                    
                    : <></> }
      
            </div>
      
          );

    }

    return CurrentOrder ? <MainOrder/> : <OrderMainList/>

    ;

}