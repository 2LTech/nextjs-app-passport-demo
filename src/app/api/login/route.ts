import {
  APICreateLoginRoute,
  FindUser,
  ValidatePassword,
} from "@2ltech/nextjs-app-passport";

import { findUser, User, validatePassword } from "@/lib/user";

export const POST = APICreateLoginRoute(
  findUser as FindUser<User>,
  validatePassword as ValidatePassword<User>,
);
