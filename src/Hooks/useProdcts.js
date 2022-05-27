import { useQuery } from "react-query";


const useProdcts = () => {
    const {data:products, isLoading,refetch}=useQuery('products', ()=>fetch('https://fierce-fjord-58610.herokuapp.com/products').then(res=>res.json()))

    return [products,isLoading,refetch];
};

export default useProdcts;