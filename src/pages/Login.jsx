import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext/authContext';

export default function Login() {
    const { login, currentUser, signInWithGoogle } = useAuth();
    const initialValues = {
        email: "",
        password: "",
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            setError("");
            setLoading(true);
            await login(values.email, values.password);
            console.log("User signed in successfully");
            navigate(location.state?.from || '/blogs');
        } catch(e) {
            console.log(e)
            setError("Failed to log in");
            console.log("Log in failed");
        }
        setLoading(false);
        setSubmitting(false);
    };

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required'),
    });

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate(location.state?.from || '/blogs');
        } catch (error) {
            console.log('Error signing in with Google:', error)
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Card className="p-8">
                        <Typography variant="h4" className="font">
                            Log In
                        </Typography>
                        <Typography className="font mt-1 font-normal">
                            Welcome Back!
                        </Typography>
                        <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <div>
                                    <Typography variant="h6" className="login-form-inputs mb-3">
                                        Email
                                    </Typography>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="name@mail.com"
                                        as={Input}
                                        size="small"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    />
                                    <div className='error mt-1'>
                                        <ErrorMessage name='email' component='span' className='text-red-600' />
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="h6" className="login-form-inputs mb-3">
                                        Password
                                    </Typography>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        as={Input}
                                        size="small"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    />
                                    <div className='error mt-1'>
                                        <ErrorMessage name='password' component='span' className='text-red-600' />
                                    </div>
                                </div>
                            </div>
                            <Button type='submit' className="btn mt-6" fullWidth disabled={loading || isSubmitting}>
                                Log In
                            </Button>
                            <Typography color="gray" className="mt-4 text-center text-gray-500 font-normal">
                                You Don't have an account?{" "}
                                <Link to="/signup" className="font text-white">
                                    Sign Up
                                </Link>
                            </Typography>
                            <div className="text-center">
                                <Typography className=" text-gray-700">or</Typography>
                                <Button
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center justify-center gap-2 mt-2 btn  text-white"
                                    fullWidth
                                    variant="outlined"
                                    color="blue"
                                >
                                    Sign in with Google
                                    <i class="fa-brands fa-google"></i>
                                </Button>
                            </div>
                        </Form>
                    </Card>
                )}
            </Formik>
        </div>
    );
};

