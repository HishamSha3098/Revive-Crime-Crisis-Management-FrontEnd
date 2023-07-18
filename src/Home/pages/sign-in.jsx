import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { LoginSchema } from '../../yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from "@/utils/loadingSpinner";



export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  // const perror=false
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values, action) => {
      try {
        setIsLoading(true); // Start showing the spinner
        const { data } = await axios.post('http://127.0.0.1:8000/login/', values);
        console.log(values);
        localStorage.setItem('user_id', data.user_id);
       
        
        if (data.message !== 'Success') {
          console.log(data.message);
          toast.error(data.message)
          
        } else {
          
          console.log('axios return data', data);
          Cookies.set("access-token", data.access_token);
          Cookies.set("refresh-token", data.refresh_token);
          console.log("token success");
          toast.success("Login Successfull")
          navigate('/');
        }
      } catch (error) {
        console.error("not authenticated");
      } finally {
        setIsLoading(false); // Hide the spinner
      }
    },
  });


  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
        {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50"
          aria-hidden="true"
        >
          <LoadingSpinner/>
        </div>
      )}

      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form action="#" onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
          <Input
            type="email" 
            label="Email" 
            size="lg"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email} 
            required
             />
              {errors.email && touched.email ? (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                ) : null}

            <Input
            type="password" 
            label="Password" 
            size="lg"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            required 
            />
            {errors.password && touched.password ? (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                ) : null}
            <a className="-ml-0 text-blue-gray-400" href="" onClick={""}>
              Forget password
            </a>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>
            
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/register">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
