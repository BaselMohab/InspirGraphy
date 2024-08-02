import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAuth } from '../components/AuthContext/authContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../config/firebase.config';
import { updateProfile } from 'firebase/auth';

const avatar = 'https://i.imgur.com/G6Us10S.png'

export default function Signup() {
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().min(5).required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm Password is required")
    });

    const uploadImage = async (file) => {
        if (!file) return "";
        const storageRef = ref(storage, `profile_images/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            setError("");
            setLoading(true);
            let imageUrl = "";
            if (image) {
                imageUrl = await uploadImage(image);
            }
            const userCredential = await signUp(values.email, values.password, values.name, imageUrl);
            const user = userCredential.user;


            await updateProfile(auth.currentUser, {
                displayName: values.name,
                photoURL: avatar
            });
    
            // Save user profile to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: values.name,
                email: values.email,
                photoURL: avatar
            });
    
            console.log("User signed up successfully");
            navigate(location.state?.from || '/blogs');
        } catch (e) {
            console.log(e);
            setError("Failed to sign up");
        }
        setLoading(false);
        setSubmitting(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            // Save user profile to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                profilePicture: avatar
            });

            navigate(location.state?.from || '/blogs');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Card className="p-6">
                        <div className='flex justify-between align-middle items-center'>
                            <div>
                                <Typography variant="h4" className="login-form-inputs">
                                    Sign Up
                                </Typography>
                                <Typography className="font mt-1 font-normal">
                                    Welcome Back!
                                </Typography>
                            </div>   
                        </div>
                        <Form className="mt-1 mb-1 w-80 min-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <div>
                                    <Typography variant="h6" className="login-form-inputs mb-1">
                                        Your Name
                                    </Typography>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Joe Doe"
                                        as={Input}
                                        size="small"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    />
                                    <div className='error mt-1'>
                                        <ErrorMessage name='name' component='span' className='text-red-600' />
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="h6" className="login-form-inputs mb-1">
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
                                    <Typography variant="h6" className="login-form-inputs mb-1">
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
                                <div>
                                    <Typography variant="h6" className="login-form-inputs mb-1">
                                        Confirm Password
                                    </Typography>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="********"
                                        as={Input}
                                        size="small"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                    />
                                    <div className='error mt-1'>
                                        <ErrorMessage name='confirmPassword' component='span' className='text-red-600' />
                                    </div>
                                </div>
                            </div>
                            <Button type='submit' className="btn mt-6" fullWidth disabled={loading || isSubmitting}>
                                Sign up
                            </Button>
                            <Typography className="mt-4 text-center font-normal text-gray-500">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium login-form-inputs">
                                    Sign In
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
                                    Sign Up with Google
                                    <i className="fa-brands fa-google"></i>
                                </Button>
                            </div>
                        </Form>
                    </Card>
                )}
            </Formik>
        </div>
    );
}
