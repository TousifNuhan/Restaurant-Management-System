import React from 'react';
import UseAuth from '../../hooks/UseAuth';

const Register = () => {

    const { createUser } = UseAuth()

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value

        console.log(name, email, password)

        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <form onSubmit={handleSubmit} className="hero-content w-4/5 mx-5 flex-col lg:flex-row-reverse">
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
                                <input type="text" name='name' className="input" placeholder="Name" />
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type='submit' className="btn btn-neutral mt-4">Sign Up</button>
                            </fieldset>
                            <a >New here?<Link to="/register" className="link link-info"> Create an Account </Link></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;