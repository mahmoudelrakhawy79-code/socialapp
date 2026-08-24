import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
export let Schema = zod.object({
    name: zod.string().nonempty('name is required').min(4, 'min letters is 4').max(8, 'max letters is 8'),
    username: zod.string().nonempty('user name is required').regex(/^[A-Z][a-z0-9]{4,8}$/, 'invalid userName'),
    email: zod.string().nonempty('email is required').email('invalid  email'),
    password: zod.string().nonempty('password required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'invalid password'),
    gender: zod.string().nonempty('gender is required'),
    dateOfBirth: zod.coerce.date(' date is required ').refine((dataval) => {
        let current = new Date().getFullYear()
        let yaer = dataval.getFullYear()
        let age = current - yaer;
        return age > 20;
    }, 'age must be bigger than 20'),
    rePassword: zod.string().nonempty('repassword is required')
}).refine((obj) => {
    if (obj.password == obj.rePassword) {
        return true;
    }
}, { path: ['rePassword'], message: 'pass && repass is not match' })