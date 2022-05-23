import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel autoPlay className='text-center'>
                <div>
                    <img src={'https://cdn.shopify.com/s/files/1/2721/6956/files/bg3.jpg?v=1522671448'} alt=''/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={'https://cdn.shopify.com/s/files/1/2721/6956/files/bg1.jpg?v=1522671481'} alt='' />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={'https://cdn.shopify.com/s/files/1/2721/6956/files/bg3.jpg?v=1522671448'} alt=''/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    );
};

export default Banner;