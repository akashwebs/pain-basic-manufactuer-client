import { useEffect, useState } from "react";
const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false)
    // its return true or flase 
    const [adminLoadin, setAdminLoading] = useState(true)
    useEffect(() => {
        const email = user?.email;
        fetch(`http://localhost:5000/admin/${email}`, {
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