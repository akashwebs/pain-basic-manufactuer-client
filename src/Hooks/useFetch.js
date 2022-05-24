import { useQuery } from "react-query";
import Loading from "../Shared/Loading";


const useFetch = (name,url) => {
 const {data, isLoading,refetch}=useQuery(`${name}`,()=>fetch(`${url}`).then(res=>res.json()))

 return [data,isLoading,refetch]
};

export default useFetch;