import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data, event) => {
    setLoginLoading(true);
    signIn(data.email, data.password)
      .then((result) => {
        event.target.reset();
        setLoginLoading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In!");
      })
      .catch((error) => {
        setLoginLoading(false);
        if (error.message) {
          toast.error("your email or password is wrong");
        }
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("https://ebay-cars-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(from, { replace: true });
        toast.success("User Created Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        saveUser(result.user.displayName, result.user.email);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex justify-center items-center p-7 pt-16 ">
      <div className="w-full max-w-sm p-8 rounded-lg backdrop-blur-md customBorder">
        <h3 className="text-2xl text-center font-medium mb-8">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full mb-2">
            <label className="label pb-0">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is Required" })}
              type="email"
              className="input w-full"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="form-control w-full mb-3">
            <label className="label pb-0">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              type="password"
              className="input w-full"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <button
            className={`btn btn-primary text-white w-full mt-4`}
            type="submit"
          >
            {loginLoading ? <Loader></Loader> : <span>Login</span>}
          </button>
        </form>
        <p className="my-3 text-sm text-center">
          New to Notion?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Sign Up
          </Link>
        </p>
        <h5 className="text-center my-3">OR</h5>
        <button
          onClick={handleSignInWithGoogle}
          className="btn btn-outline w-full mt-2"
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
