import './productlistComp.css';
import ImgProduct from '../../../assets/images/products/218d1e5f-d838-47a5-b6ef-2b4dfd89d36a.jpg'

export const ProductList = ({openMOdal}) => {

    return (

        <div className="produductlist" >

            <img src={ImgProduct} className="produductlist-img" alt="prof" />

            <span className='produductlist-txt' >Manchester United Jersey</span>
            <div className='produductlist-price' >₦45,000</div>

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