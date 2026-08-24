import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Postcard from './postcard/postcard';
import Spinner from '../../spinner/spinner';
import { useQuery } from '@tanstack/react-query';
import Createpostcard from '../../createpostcard/createpostcard';
export default function Home() {
    function getallposts() {
        return axios.get('https://route-posts.routemisr.com/posts', {
            params: {
                sort: '-createdAt'
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['getitem'],
        queryFn: getallposts
    })
    // let [allposts, setallposts] = useState([]);
    // let [error, seterror] = useState(null);
    // let [iserrror, setiserror] = useState(false);
    // let [isloading, setisloading] = useState(true)
    // function getposts() {
    //     axios.get('https://route-posts.routemisr.com/posts', {
    //         params: {
    //             sort: 'createdAt'
    //         },
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then((response) => {
    //         console.log(response.data.data.posts);
    //         setallposts(response.data.data.posts);
    //     }).catch((err) => {
    //         console.log(err);
    //         setiserror(true)
    //         seterror('ERRoR: no posts to display')
    //     }).finally(() => {
    //         setisloading(false)
    //     })
    // }
    // useEffect(() => {
    //     getposts();
    // }, [])
    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <div className='h-screen flex justify-center items-center'>
            <p>{error.message}</p>
        </div>
    }
    console.log(data?.data.data.posts);

    return (
        <div className='mt-20'>

            <Createpostcard />
            {
                data?.data.data.posts?.map((post) => {
                    return <Postcard issinglecomment={false} key={post._id} post={post} />
                })
            }
        </div>

    )
}
