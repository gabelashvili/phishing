import * as yup from "yup";
import { emailSchema } from "./common-schemas";

export const authSchema = yup.object().shape({
    email: emailSchema,
    password: yup.string().required()
})