import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
export let loginSchema = zod.object({
    email: zod.string().nonempty('email is required').email('invalid  email'),
    password: zod.string().nonempty('password required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'invalid password'),
})
