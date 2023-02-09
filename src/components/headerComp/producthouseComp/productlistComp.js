import './productlistComp.css';
import ImgProduct from '../../../assets/images/products/218d1e5f-d838-47a5-b6ef-2b4dfd89d36a.jpg'

export const ProductList = ({openMOdal,product_image,product_name,product_price}) => {

    return (

        <div className="produductlist" onClick={openMOdal} >

            <img src={product_image} className="produductlist-img" alt="prof" />

            <span className='produductlist-txt' >{product_name}</span>
            <div className='produductlist-price' >${product_price}</div>

            <div className='produductlist-sub' >
                At vero eos et accusamus et iusto odio dignissimos ducimus 
                qui blanditiis praesentium voluptatum..
            </div>

            <button className='produductlist-btn' onClick={openMOdal} >
                Add to cart
            </button>

        </div>

    );

}