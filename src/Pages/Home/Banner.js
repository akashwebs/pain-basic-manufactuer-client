import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel className='text-center' autoPlay infiniteLoop>
            <div>
                <img src={'https://www.devsnews.com/wp/roxce/wp-content/uploads/2021/12/slider-2.jpg'} alt='' />
                <div className='legend'>

                    <p className=" text-8xl">Painting All Basic Element Made</p>
                </div>
            </div>
            <div>
                <img src={'https://www.devsnews.com/wp/roxce/wp-content/uploads/2021/12/slider-1.jpg'} alt='' />
                <div className='legend'>

                    <p className=" text-8xl">Painting All Basic Element Made</p>
                </div>
            </div>
            <div>
                <img src={'https://www.devsnews.com/wp/roxce/wp-content/uploads/2021/12/slider-3.jpg'} alt='' />
                <div className='legend'>

                    <p className=" text-8xl">Painting All Basic Element Made</p>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;