import React from 'react';
import Summary from './Summary';




const BusinessSummary = () => {
    const summary = [
        {
            img: '',
            bgColor: 'bg-gradient-to-r from-secondary to-primary',
            title: '24 Hours',
            description: 'Our production 24 hours active and we are trusted for made prduct'
        },
        {
            img: '',
            bgColor: 'bg-neutral',
            title: 'Trust',
            description: '25 years we are made produts, every partanar are setisfied with us..'
        },
        {
            img: '',
            bgColor: 'bg-gradient-to-r from-secondary to-primary',
            title: 'Quality',
            description: 'we foucs our product quality. 25 years our product best in the world.'
        }
    ]
    
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-3 md:px-24 my-20'>
            {summary.map((sum,index)=><Summary sum={sum} key={index}></Summary>)}
        </div>
    );
};

export default BusinessSummary;