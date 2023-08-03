import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),
    confirm_password: Yup.string()
      .required("Please confirm password")
      .oneOf([Yup.ref('password'), null], "Password doesn't match"),
  });


  export const LoginSchema = Yup.object({
    
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),
    
  });



  export const ProfileSchema = Yup.object().shape({
    name: Yup.string().max(255),
    email: Yup.string().email(),
    phone: Yup.string().max(20),
    age: Yup.number().positive(),
    blood_group: Yup.string().max(10),
    marital_status: Yup.string().oneOf(['married', 'single', 'widowed', 'none']),
    address: Yup.string(),
  });


 