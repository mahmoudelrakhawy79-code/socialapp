import React, { useRef, useState } from 'react'
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { data } from 'react-router-dom';
import { Schema } from '../../schema/registerschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    let [username, setusername] = useState('ahmed');
    let navigate = useNavigate();
    let [apierror, setapierror] = useState(null);
    let [isloading, setisloading] = useState(false);
    let { register, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            rePassword: '',
            dateOfBirth: '',
            gender: ''
        },
        mode: 'onTouched',
        resolver: zodResolver(Schema)
    })

    // console.log(register('name'));
    function submitform(userdata) {
        console.log(userdata);
        // call api
        setisloading(true)
        axios.post('https://route-posts.routemisr.com/users/signup', userdata)
            .then((response) => {
                console.log(response.data.data.token);
                if (response.data.success) {
                    localStorage.setItem('token', response.data.data.token)
                    navigate('/')
                }

            }).catch((error) => {
                console.log(error.response);
                setapierror(error.response?.data?.message)
            }).finally(() => {
                setisloading(false)
            })
    }

    return (
        <>
            <div className='bg-gray-200 min-h-screen p-3 mt-10'>
                <div className="w-1/2 bg-white rounded-md mx-auto p-5 mt-5">
                    <h2 className='text-sky-600 text-2xl font-bold text-center my-3'>Register Now</h2>
                    <form onSubmit={handleSubmit(submitform)}>
                        <div className="flex flex-col gap-7">


                            <div>

                                <Input {...register('name')} aria-label="Name" className="w-full" placeholder="Enter your name" />
                                {formState.errors.name && formState.touchedFields.name && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.name?.message}</p>}
                            </div>
                            <div>

                                <Input {...register('username')} aria-label="Name" className="w-full" placeholder="Enter your username" />
                                {formState.errors.username && formState.touchedFields.username && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.username?.message}</p>}
                            </div>
                            <div>

                                <Input {...register('email')} aria-label="Name" className="w-full" placeholder="Enter your email" />
                                {formState.errors.email && formState.touchedFields.email && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.email?.message}</p>}

                            </div>
                            <div>
                                <Input {...register('password')} type='password' aria-label="Password" className="w-full" placeholder="Enter your Password" />
                                {formState.errors.password && formState.touchedFields.password && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.password?.message}</p>}

                            </div>
                            <div>
                                <Input {...register('rePassword')} type='password' aria-label="rePassword" className="w-full" placeholder="Enter your rePassword" />
                                {formState.errors.rePassword && formState.touchedFields.rePassword && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.rePassword?.message}</p>}

                            </div>
                            <div className="flex gap-4">

                                <div className='w-full'>
                                    <Input {...register('dateOfBirth')} type='date' aria-label="dateOfBirth" className="w-full" placeholder="Enter your dateOfBirth" />
                                    {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.dateOfBirth?.message}</p>}
                                </div>

                                <div className='w-full'>
                                    <select {...register('gender')} defaultValue={'Choose a Gender'} className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>

                                    </select>
                                    {formState.errors.gender && formState.touchedFields.gender && <p className='bg-red-700 text-center text-white rounded-2xl'>{formState.errors.gender?.message}</p>}



                                </div>
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
