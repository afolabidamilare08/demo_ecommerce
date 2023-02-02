import './homesliderComp.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export const HomesliderComp = () => {

    const Slides = [
        1,2,3,4
    ]

    return (

        <Carousel infiniteLoop={true} showThumbs={false} autoPlay={true} >

            { Slides.map( (slide,index) => {
                return ( 
                    <div className='homeSliderimg' key={index} >

                    </div>  
                );
            } ) }

        </Carousel>

    );

}