import React from 'react';

const ReviewCard = ({rivew}) => {

    
    const {userName, review, ratting}=rivew;
    
    return (
        <div class="card  bg-base-100 shadow-xl">
                    <div class="avatar pt-5 pl-5">
                        <div class="w-24 rounded-xl">
                            <img src="https://api.lorem.space/image/face?hash=64318" />
                        </div>
                    </div>

                    <div class="card-body">

                        <div class="rating">
                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        </div>
                        <h2 class=" text-3xl font-bold ">{userName}</h2>
                        <p>{review.slice(0,150)}</p>

                    </div>
                </div>
    );
};

export default ReviewCard;