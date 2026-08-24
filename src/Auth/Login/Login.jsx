import React, { useRef, useState } from 'react'
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { data } from 'react-router-dom';
import { loginSchema } from '../../schema/loginschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authcontext } from '../../context/authcontect';
export default function Login() {
    let [username, setusername] = useState('ahmed');
    let navigate = useNavigate();
    let [apierror, setapierror] = useState(null);
    let [isloading, setisloading] = useState(false);
    let { setusertoken } = useContext(authcontext);
    // console.log(x);

    let { register, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    })

    // console.log(register('name'));

    function submitform(userdata) {
        console.log(userdata);
        // call api
        setisloading(true)
        axios.post('https://route-posts.routemisr.com/users/signin', userdata)
            .then((response) => {
                console.log(response.data.data.token);
                if (response.data.success) {
                    setusertoken(response.data.data.token)
                    localStorage.setItem('token', response.data.data.token)
                    navigate('/home')
                }

            }).catch((error) => {
                console.log(error.response);
                setapierror(error.response?.data?.message)
            }).finally(() => {
                setisloading(false);
            })
    }

    return (
        <>
            <div className='bg-gray-200 min-h-screen p-3 mt-10'>
                <div className="w-1/2 bg-white rounded-md mx-auto p-5 mt-5">
                    <h2 className='text-sky-600 text-2xl font-bold text-center my-3'>Login Now</h2>
                    <form onSubmit={handleSubmit(submitform)}>
                        <div className="flex flex-col gap-7">

                            <div>

                                <Input {...register('email')} aria-label="Name" className="w-full" placeholder="Enter your email" />
                                {formState.errors.email && formState.touchedFields.email && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.email?.message}</p>}

                            </div>
                            <div>
                                <Input {...register('password')} type='password' aria-label="Password" className="w-full" placeholder="Enter your Password" />
                                {formState.errors.password && formState.touchedFields.password && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.password?.message}</p>}

                            </div>

                        </div>
                        {/* {apierror} */}
                        {apierror && <div className='bg-red-500 text-center p-2 rounded-2xl '>{apierror}</div>}
                        <Button isDisabled={isloading} type='submit' className='my-5 w-full'>{isloading ? 'Loading...' : 'submit'}</Button>
                    </form>
                </div>

            </div>
        </>
    )
}
