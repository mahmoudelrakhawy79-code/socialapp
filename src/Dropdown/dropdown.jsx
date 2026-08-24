import React, { useRef, useState } from 'react'
import { Button, Label, Dropdown, TextArea, Input } from "@heroui/react";
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Modal } from "@heroui/react";
import { useNavigate } from 'react-router-dom';

export default function DropDown({ postid }) {
    let navigate = useNavigate()
    const [isopen, setisopen] = useState(false)
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
    function updatepost() {
        return axios.put(`https://route-posts.routemisr.com/posts/${postid}`, preparedata(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    const { data: updata, mutate: handleuppost } = useMutation({
        mutationFn: updatepost,
        onSuccess: () => {
            toast.success('post updated successfully'),
                query.invalidateQueries({ queryKey: ['getitem'] }),
                // query.invalidateQueries({ queryKey: ['singlepost'] }),
                query.invalidateQueries({ queryKey: ['getprofileposts'] })
        },
        onError: () => {
            toast.error('cannot update post')
        }

    })
    // delete code
    function delpost() {
        return axios.delete(`https://route-posts.routemisr.com/posts/${postid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    const { data: deldata, mutate: handledelpost } = useMutation({
        mutationFn: delpost,
        onSuccess: () => {
            toast.success('post deleted successfully'),
                query.invalidateQueries({ queryKey: ['getitem'] }),
                // query.invalidateQueries({ queryKey: ['singlepost'] }),
                query.invalidateQueries({ queryKey: ['getprofileposts'] })
            navigate('/')
        },
        onError: () => {
            toast.error('cannot deleted post')
        }

    })

    return (
        < div >
            <Dropdown>

                <Button aria-label="Menu" variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => {
                        if (key === 'edit-file') {
                            setisopen(true)
                        }
                    }}>

                        <Dropdown.Item id="edit-file" textValue="Edit file">
                            <Label>Edit post</Label>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handledelpost} id="delete-file" textValue="Delete file" variant="danger">
                            <Label >Delete post</Label>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Modal isOpen={isopen} onOpenChange={setisopen}>

                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[360px]">
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
                                <Button onClick={handleuppost} className="w-full" slot="close">
                                    update post
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div >
    )
}
