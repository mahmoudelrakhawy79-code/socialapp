import React from 'react'
import { PacmanLoader } from 'react-spinners'
export default function Spinner() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <PacmanLoader color='blue' />
        </div>
    )
}
