import { Avatar, TextArea, Button, Modal, Input } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { authcontext } from '../context/authcontect';


export default function Createpostcard() {
    let { userdata } = useContext(authcontext);

    let query = useQueryClient();
    let body = useRef(null);
    let image = useRef(null);
    let [uploadimg, setuploadimg] = useState(null);

    function handleimagepreview(e) {
        let imgsrc = URL.createObjectURL(e.target.files[0]);
        setuploadimg(imgsrc);
    }
    function handlecloseimg() {
        setuploadimg(null)
    }
    let formdata = new FormData();
    function preparedata() {
        if (image.current.files[0]) {
            formdata.append('image', image.current.files[0])
        }
        if (body.current.value) {
            formdata.append('body', body.current.value)
        }
        return formdata
    }
    function createpostfunc() {
        return axios.post(`https://route-posts.routemisr.com/posts`, preparedata(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    const { data, isPending, mutate } = useMutation({
        mutationFn: createpostfunc,
        onSuccess: () => {
            if (body.current) {
                body.current.value = null;
            }
            if (image.current) {
                image.current.value = null;
            }
            query.invalidateQueries({ queryKey: ['getitem'] })
            toast.success('post created successfully')
        },
        onError: () => {
            toast.error('cannot created post')
        }
    })
    return (
        <div className='bg-gray-500 p-4 rounded shadow w-1/2 mx-auto mb-5 mt-3'>
            <div>
                <div className="flex items-center gap-4 p-3">
                    <Avatar>
                        <Avatar.Image alt="John Doe" src={userdata?.photo} />
                        <Avatar.Fallback>JD</Avatar.Fallback>
                    </Avatar>
                    <Modal>
                        <Button variant="secondary" className='w-full bg-transparent'>    <TextArea fullWidth placeholder="what is on your mind .....!?" variant="primary" />
                        </Button>
                        <Modal.Backdrop>
                            <Modal.Container>
                                <Modal.Dialog className="">
                                    <Modal.CloseTrigger />
                                    <Modal.Header>

                                        <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='flex gap-4 items-end'>
                                            <TextArea
                                                ref={body}
                                                aria-label="Quick project update"
                                                className="h-32 w-96"
                                                placeholder="what is on your mind..."
                                            />
                                            <label htmlFor="img">
                                                <Input ref={image} onChange={handleimagepreview} type='file' id='img' hidden />
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                            </label>

                                        </div>
                                        {uploadimg && <div className='relative'>

                                            <img src={uploadimg} alt="" />
                                            <svg onClick={handlecloseimg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-6 absolute top-0 right-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </div>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={mutate} className="w-full" slot="close">
                                            create post
                                        </Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>
                </div>

            </div>
        </div>
    )
}
3