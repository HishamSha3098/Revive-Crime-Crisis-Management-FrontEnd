import { Link, useParams } from "react-router-dom";
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
import { resetPasswordSchema, signUpSchema } from '../../yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from "@/utils/loadingSpinner";


export function PasswordReset() {
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
   
    password: '',
    confirm_password: '',
  };
  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values, action) => {
      setIsLoading(true); // Start showing the spinner
      try {
        console.log(userId,'-------------this user id------');
        console.log(values,'-------------this values------');

        const { data } = await axios.put(
          `http://127.0.0.1:8000/passwordChange/${userId}/`,
          values
        );
        console.log(data);
        action.resetForm();
        toast.success("Password Changed Successfuly");
        navigate('/login')
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Hide the spinner regardless of success or error
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
          <LoadingSpinner />
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
              Reset Password
            </Typography>
          </CardHeader>
          <form action="#" onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            

          

            <Input 
            type="password" 
            label="New Password" 
            size="lg"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            required 
            />{errors.password && touched.password ? (
              <p className="text-red-500 text-sm">{errors.password}</p>
            ) : null}

            <Input 
            type="password" 
            label="Comfirm Password" 
            size="lg"
            id="confirm_password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirm_password}
            required 
            />{errors.confirm_password && touched.confirm_password ? (
              <p className="text-red-500 text-sm">{errors.confirm_password}</p>
            ) : null}

            {/* <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Submit
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Dont Want to Change?
              <Link to="/login">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
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

export default PasswordReset;
