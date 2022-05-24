import { useQuery } from "react-query";


const useProdcts = () => {
    const {data:products, isLoading,refetch}=useQuery('products', ()=>fetch('http://localhost:5000/products').then(res=>res.json()))

    return [products,isLoading,refetch];
};

export default useProdcts;