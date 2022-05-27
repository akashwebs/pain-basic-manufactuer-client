import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import ReviewCard from './ReviewCard';

const Reivew = () => {

    const { data: reviews, isLoading,refetch } = useQuery('mangeAllOrdres', () => fetch(`https://fierce-fjord-58610.herokuapp.com/allReivew`).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <div className='py-20 lg:px-24'>
            <div className="text-3xl lg:text-6xl text-center mb-16 text-primary font-extrabold">
                Review
                <p className='text-xl md:text-3xl font-bold mt-4 text-neutral'>What Our Clients Say About Us.</p>
            </div>

            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>


                {
                    reviews.map(rivew=><ReviewCard
                        key={rivew._id}
                        rivew={rivew}
                    ></ReviewCard>)
                    
                }

            </div>
        </div>
    );
};

export default Reivew;