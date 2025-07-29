import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Register2 = () => {

    const { createUser, updateUserProfile, logOut } = UseAuth()
    const navigate = useNavigate()
    const axiosPublic = UseAxiosPublic()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(data.name, data.PhotoURL)
                    .then(() => {
                        console.log('updated')

                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.acknowledged) {
                                    Swal.fire({
                                        title: "You've Registered Successfully !",
                                        icon: "success",
                                        draggable: true
                                    });
                                    reset()
                                }
                            })

                        logOut()
                            .then(result => {
                                console.log(result)
                                navigate('/login')
                            })
                            .catch(error => {
                                console.error(error)
                            })

                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <form onSubmit={handleSubmit(onSubmit)} className="hero-content w-4/5 mx-5 flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">

                                <label className="label">Name</label>
                                <input type="text" name='name' {...register("name", { required: true })} className="input" placeholder="Name" />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                                <label className="label">PhotoURL</label>
                                <input type="url" {...register("PhotoURL", { required: true })} className="input" placeholder="PhotoURL" />
                                {errors.PhotoURL && <span className='text-red-600'>This field is required</span>}

                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} name='email' className="input" placeholder="Email" />
                                {errors.email && <span className='text-red-600'>This field is required</span>}

                                <label className="label">Password</label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/ })} name='password' className="input" placeholder="Password" />
                                {errors.password?.type === "required" && (
                                    <p role="alert" className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p role="alert" className='text-red-600'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p role="alert" className='text-red-600'>Password should be within 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p role="alert" className='text-red-600'>Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                                )}


                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input type="submit" className="btn btn-neutral mt-4" value="Sign Up" />

                            </fieldset>
                            <div className="divider divider-warning">Or</div>
                            {/* <button onClick={handleGoogleLogin} className="btn">
                                <FaGoogle></FaGoogle>
                                Google
                            </button> */}
                            <div className='min-w-full '>
                                <SocialLogin></SocialLogin>
                            </div>
                            <p >Already have an account?<Link to="/login" className="link link-info"> Go for Login </Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register2;