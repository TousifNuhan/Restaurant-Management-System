import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import UseAuth from '../../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../../../hooks/UseAxiosPublic';

const SocialLogin = () => {
    const { googleLogin } = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosPublic = UseAxiosPublic()

    const from = location.state?.from?.pathname || "/";
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user.email)
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "Successfully Looged In !",
                            icon: "success",
                            draggable: true
                        });
                        navigate(from, { replace: true })
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <div className=' flex justify-center'>
            <button onClick={handleGoogleLogin} className="btn">
                <FaGoogle ></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;