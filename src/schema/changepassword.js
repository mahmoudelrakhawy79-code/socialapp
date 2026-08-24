import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
export let changepasswordschema = zod.object({
    password: zod.string().nonempty(' password is required'),
    newPassword: zod.string().nonempty('enter your new password').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'invalid password'),
    rePassword: zod.string().nonempty('newPassword is required')
}).refine((obj) => {
    if (obj.rePassword == obj.newPassword) {
        return true;
    }
}, { path: ['rePassword'], message: 'pass && repass is not match' })