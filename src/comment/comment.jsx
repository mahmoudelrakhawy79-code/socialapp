import React from 'react'
import { useContext } from 'react'
import { authcontext } from '../context/authcontect'
import DropDowncomm from '../dropdowncomm/dropdowncomm'

export default function Comment({ Comment, postid, queryKey }) {

    let { userdata } = useContext(authcontext);
    console.log(userdata?._id);
    console.log(Comment?.commentCreator._id);
    return (
        <div className='border border-gray-400  p-3 mt-2'>
            <header className="flex items-center space-x-3 mb-3 ">
                <img src={Comment?.commentCreator?.photo} className='h-10 w-10 rounded-full' alt={Comment?.commentCreator?.name} />
                <div>
                    <p className="font-semibold">{Comment?.commentCreator?.name}</p>
                    <p className="text-xs text-gray-500">{Comment?.createdAt}</p>
                </div>
            </header>
            <div className='flex justify-between items-center'>
                <p className='mb-3'>{Comment?.content}</p>
                {userdata?._id == Comment?.commentCreator._id ? <div><DropDowncomm queryKey={queryKey} postid={postid} Commentid={Comment._id} /></div> : ''}

            </div>
        </div>

    )
}
