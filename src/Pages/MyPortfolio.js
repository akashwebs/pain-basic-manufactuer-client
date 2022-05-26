import React from 'react';
import { Link } from 'react-router-dom';
import akash from '../Assetes/akash.png'


const MyPortfolio = () => {
    return (
        <div class="card w-1/2 bg-base-100  my-24 md:px-24">
            <figure class="pt-10">
                <img src={akash} alt="Shoes" class="rounded-xl  w-48" />
            </figure>
            <div class="card-body ">
                <h2 class="card-title">Akash Shil</h2>
                <p>akashshil227@gmail.com</p>
                <p>Bachelor of Computer Science & Engineering </p>
                <h3 className="text-xl mt-6 font-bold">Skils </h3>
                <div class="card-actions ">
                    <ul>
                        <li>html, css3, bootstrap, tailwind</li>
                        <li>JavaScript</li>
                        <li>React Js</li>
                        <li>Node Js</li>
                        <li>MongoDB</li>

                    </ul>
                </div>
                <h3 className="text-xl mt-6 font-bold">My 3 Best Project </h3>
                <div class="card-actions ">
                    <ul className='text-primary'>
                        <li>
                            <Link to={'https://furniturelink-2f045.web.app/'}>Furniture Link</Link>
                        </li>
                        <li>
                            <Link to={'https://todo-app-809d3.web.app/'}>Todo app</Link>
                        </li>
                        <li>
                            <Link to={'https://tooth-care-6684c.web.app/'}>Tooth Care</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;