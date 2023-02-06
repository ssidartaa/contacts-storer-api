import * as yup from "yup";

export const createClientSerializer = yup.object().shape({
  fullName: yup
    .string()
    .typeError("This field must be a string")
    .required("This field is required"),
  email: yup
    .string()
    .typeError("This field must be a string")
    .email("This field is must be a email address")
    .required("This field is required"),
  password: yup
    .string()
    .typeError("This field must be a string")
    .required("This field is required"),
  phoneNumber: yup
    .string()
    .typeError("This field must be a string")
    .min(13, "This field must have at least 13 characters, Ex: 5512123456789")
    .max(
      14,
      "This field must have a maximum of 14 characters, Ex: 55123123456789"
    )
    .transform((number: string) =>
      number
        ? number.length === 14
          ? `+${number.slice(0, 2)} (${number.slice(2, 5)}) ${number.slice(
              5,
              10
            )}-${number.slice(10)}`
          : `+${number.slice(0, 2)} (${number.slice(2, 4)}) ${number.slice(
              4,
              9
            )}-${number.slice(9)}`
        : undefined
    )
    .required("This field is required"),
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
    .min(13, "This field must have at least 13 characters, Ex: 5512123456789")
    .max(
      14,
      "This field must have a maximum of 14 characters, Ex: 55123123456789"
    )
    .transform((number: string) =>
      number
        ? number.length === 14
          ? `+${number.slice(0, 2)} (${number.slice(2, 5)}) ${number.slice(
              5,
              10
            )}-${number.slice(10)}`
          : `+${number.slice(0, 2)} (${number.slice(2, 4)}) ${number.slice(
              4,
              9
            )}-${number.slice(9)}`
        : undefined
    )
    .notRequired(),
});
