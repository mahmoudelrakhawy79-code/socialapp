import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../spinner/spinner'
import Postcard from '../Components/Home/postcard/postcard'
export default function Postdetails() {
    let { id } = useParams();
    function getsinglepost() {
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['singlepost', id],
        queryFn: getsinglepost
    })
    console.log(data?.data.data.post);
    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <div className='h-screen flex justify-center items-center'>
            <p>{error.message}</p>
        </div>
    }

    return (
        <div className='mt-20'>

            <Postcard issinglecomment={true} post={data?.data.data.post} />

        </div>
    )
}
