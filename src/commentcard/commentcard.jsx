import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Commentcard({ postid, querykey }) {
    let query = useQueryClient();
    let { register, handleSubmit, reset } = useForm({
        defaultValues: {
            image: '',
            content: ''
        }
    })
    let formdata = new FormData();

    function createccommentfun() {
        return axios.post(`https://route-posts.routemisr.com/posts/${postid}/comments`, formdata, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    function handelecomment(data) {

        if (!data.image[0] && !data.content) return;
        if (data.image[0]) {
            formdata.append('image', data.image[0])
        }
        if (data.content) {
            formdata.append('content', data.content)

        }
        // call api
        mutate();

    }

    const { data, isPending, mutate, isError, error } = useMutation({
        mutationFn: createccommentfun,
        onSuccess: () => {
            reset()
            console.log('comment is created');
            toast.success('comment creaded successfully');
            query.invalidateQueries({ queryKey: querykey });
            // query.invalidateQueries({ queryKey: ['singlepost', id] });
        },
        onError: (error) => {
            console.log(error.response?.data);
            toast.error('comment not creaded ');

        }
    })
    // console.log(data);


    return (
        <div>
            <form onSubmit={handleSubmit(handelecomment)}>
                <div className='flex items-center mt-1'>
                    <label htmlFor="imgfile"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    </label>
                    <input {...register('image')} type="file" id='imgfile' hidden />
                    <input {...register("content")} type="text" id='input-9' className='w-full h-10 px-3 text-sm text-gray-600 border border-black' />
                    <button className='h-10 px-4 bg-blue-600 text-sm border border-1-0 border-blue-500'>
                        {isPending ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">

                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>}

                    </button>
                </div>
            </form>
        </div>
    )
}
