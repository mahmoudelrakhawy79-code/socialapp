import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export let authcontext = createContext();
export function AuthContextprovider({ children }) {
    let [usertoken, setusertoken] = useState(null);
    let [userdata, setuserdata] = useState(null);
    async function getuserdata() {
        let { data } = await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`

            }
        })
        console.log(data?.data.user);
        setuserdata(data?.data.user)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setusertoken(localStorage.getItem('token'))
            getuserdata()
        }

    }, [])
    return <authcontext.Provider value={{ usertoken, setusertoken, setuserdata, userdata }}>
        {children}
    </authcontext.Provider>
}