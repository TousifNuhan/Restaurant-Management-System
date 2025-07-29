import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { FaGoogle } from 'react-icons/fa';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

const Login = () => {

    // const captcharef = useRef(null)

    // const { googleLogin } = UseAuth()

    const [disabled, setDisabled] = useState(true)
    const { logInUser } = UseAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    // console.log(location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidate = (e) => {
        // const user_captcha_value = captcharef.current.value
        const user_captcha_value = e.target.value
        // console.log(user_captcha_value)
        // if (validateCaptcha(user_captcha_value)) {
        //     setDisabled(false)
        // }
        // else {
        //     setDisabled(true)
        // }

        const isValid = validateCaptcha(user_captcha_value)
        setDisabled(!isValid)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        // form.reset()

        console.log(email, password)

        logInUser(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: "Successfully Looged In !",
                    icon: "success",
                    draggable: true
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error)
            })
    }

    // const handleGoogleLogin = () => {
    //     googleLogin()
    //         .then(res => {
    //             Swal.fire({
    //                 title: "Successfully Looged In !",
    //                 icon: "success",
    //                 draggable: true
    //             });
    //             navigate(from,{replace:true})
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <form onSubmit={handleSubmit} className="hero-content w-4/5 mx-5 flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <LoadCanvasTemplate />
                                <input onBlur={handleValidate} type="text"
                                    //  ref={captcharef}
                                    name='captcha' className="input" placeholder="Put the captcha code" />
                                {/* <button onClick={handleValidate} className="btn btn-xs btn-outline">Validate</button> */}
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button disabled={disabled} type='submit' className="btn btn-neutral mt-4">Sign In</button>
                            </fieldset>
                            <div className="divider divider-warning">Or</div>
                            {/* <button onClick={handleGoogleLogin} className="btn">
                                <FaGoogle></FaGoogle>
                                Google
                            </button> */}
                            <div className='min-w-full '>
                                <SocialLogin></SocialLogin>
                            </div>
                            <p className='mt-2'>New here?<Link to="/register" className="link link-info"> Create an Account </Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;