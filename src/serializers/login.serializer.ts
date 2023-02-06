import * as yup from "yup";

export const loginSerializer = yup.object().shape({
  email: yup
    .string()
    .typeError("This field must be a string")
    .email("This field is must be a email address")
    .required("This field is required"),
  password: yup
    .string()
    .typeError("This field must be a string")
    .required("This field is required"),
});
