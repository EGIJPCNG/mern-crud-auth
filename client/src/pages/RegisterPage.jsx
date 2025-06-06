import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import {registerRequest} from '../api/auth'

function RegisterPage() {

    const { register, handleSubmit, formState: {
        errors
    }, } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        // // console.log(values);
        // const res = await registerRequest(values)
        // console.log(res)
        signup(values)
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 text-white p-2 rounded-md my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="text" {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="username"
                />
                {
                    errors.username && (
                        <p className="text-red-500">
                            Username is required
                        </p>
                    )
                }
                <input type="email" {...register("email", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="email"
                />
                {
                    errors.email && (
                        <p className="text-red-500">
                            Email is required
                        </p>
                    )
                }
                <input type="password" {...register("password", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="password"
                />
                {
                    errors.password && (
                        <p className="text-red-500">
                            Password is required
                        </p>
                    )
                }
                <button type="submit">Register</button>
            </form>

            <p className="flex gap-x-2 justify-between">
                ¿Ya  tienes una cuenta? <Link to="/login" className="text-sky-500">Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage