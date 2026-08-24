import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { authcontext } from '../../context/authcontect'
import { useNavigate } from 'react-router-dom';
import Changepasswordcard from '../../changepasswordcard/changepasswordcard';

export default function Navbar() {
    let { usertoken, setusertoken, userdata } = useContext(authcontext);
    let navigate = useNavigate()
    function Logout() {
        setusertoken(null);
        localStorage.removeItem('token')
        navigate('/');
    }

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-default mb-10">
                <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap  justify-between md:gap-10 items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Flowbite</span>
                    </a>

                    <div className="hidden w-full md:flex md:justify-between  items-center" id="navbar-default">
                        {usertoken !== null ? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                            <li>
                                <NavLink to='/home' className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/profile' className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">profile</NavLink>
                            </li>

                        </ul> : ''}
                        {usertoken == null ?
                            <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                                <li>
                                    <NavLink to='/register' className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">register</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/' className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">login</NavLink>
                                </li>



                            </ul> : <li className='flex gap-2 items-center'>
                                <span> welcome:{userdata?.name} </span>
                                <span onClick={Logout} className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">  log out</span>
                                <Changepasswordcard />

                            </li>}
                    </div>
                </div>
            </nav>


        </>
    )
}
