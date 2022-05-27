import { useEffect, useState } from "react";
const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false)
    // its return true or flase 
    const [adminLoadin, setAdminLoading] = useState(true)
    useEffect(() => {
        const email = user?.email;
        fetch(`https://fierce-fjord-58610.herokuapp.com/admin/${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data =>{
                setAdmin(data.admin)
                setAdminLoading(false)
               }
            )
    }, [user])
    return [admin,adminLoadin]
};

export default useAdmin;