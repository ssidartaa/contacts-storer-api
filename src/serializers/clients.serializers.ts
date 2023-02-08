import * as yup from "yup";

export const createClientSerializer = yup.object().shape({
  fullName: yup
    .string()
    .typeError("This field must be a string")
    .required("The field 'fullName' is required"),
  email: yup
    .string()
    .typeError("This field must be a string")
    .email("This field is must be a email address")
    .required("The field 'email' is required"),
  password: yup
    .string()
    .typeError("This field must be a string")
    .required("The field 'password' is required"),
  phoneNumber: yup
    .string()
    .typeError("This field must be a string")
    .min(
      19,
      "This field must have at least 19 characters, Ex: +12 (12) 12345-6789"
    )
    .max(
      20,
      "This field must have a maximum of 20 characters, Ex: +12 (123) 12345-6789"
    )
    .required("The field 'phoneNumber' is required"),
});

export const updateClientSerializer = yup.object().shape({
  fullName: yup.string().typeError("This field must be a string").notRequired(),
  email: yup
    .string()
    .typeError("This field must be a string")
    .email("This field is must be a email address")
    .notRequired(),
  password: yup.string().typeError("This field must be a string").notRequired(),
  phoneNumber: yup
    .string()
    .typeError("This field must be a string")
    .min(
      19,
      "This field must have at least 19 characters, Ex: +12 (12) 12345-6789"
    )
    .max(
      20,
      "This field must have a maximum of 20 characters, Ex: +12 (123) 12345-6789"
    )
    .notRequired(),
});
