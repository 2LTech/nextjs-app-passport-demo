import { setLocaLStrategy, APILoginRoute } from '@2ltech/nextjs-app-passport'

import { findUser, validatePassword } from '@/lib/user'

setLocaLStrategy(findUser, validatePassword)
export const POST = APILoginRoute
