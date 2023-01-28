import './producthouseComp.css';

export const HouseProduct = ({products,title,bgColor}) => {

    

    return (

        <div className='houseproductComp' >

            <div className='houseproductComp-left' style={{
            backgroundColor:bgColor
        }} >

                <div className='houseproductComp-left-txt'  >{title}</div>
                {/* <button className='houseproductComp-left-btn' >
                    View all
                </button> */}

            </div>

            <div className='houseproductComp-right' >
                {products}
            </div>

        </div>

    );

}