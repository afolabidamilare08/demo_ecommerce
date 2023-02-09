import './homesliderComp.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export const HomesliderComp = () => {

    const Slides = [
        1,2,3
    ]

    return (

        <Carousel infiniteLoop={true} showThumbs={false} autoPlay={true} >

            { Slides.map( (slide,index) => {

                if ( slide === 2 ) {
                    return ( 
                        <div className='homeSliderimg2' key={index} >
    
                        </div>  
                    ); 
                }
                if ( slide === 3 ) {
                    return ( 
                        <div className='homeSliderimg3' key={index} >
    
                        </div>  
                    ); 
                }
                else{
                    return ( 
                        <div className='homeSliderimg' key={index} >
    
                        </div>  
                    );
                }

            } ) }

        </Carousel>

    );

}