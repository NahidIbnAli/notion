import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../contexts/AuthProvider";

const SignUp = () => {
  const { signUp, signInWithGoogle, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signUpLoading, setSignUpLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data, event) => {
    setSignUpLoading(true);
    signUp(data.email, data.password)
      .then((result) => {
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
            event.target.reset();
          })
          .catch((error) => {
            setSignUpLoading(false);
            console.error(error);
          });
      })
      .catch((error) => {
        if (error.message) {
          setSignUpLoading(false);
          toast.error("email already exists");
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
        setSignUpLoading(false);
        toast.success("User Created Successfully");
        navigate("/");
      })
      .catch((error) => {
        setSignUpLoading(false);
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
        <h3 className="text-2xl text-center font-medium mb-8">Sign Up</h3>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full mb-2">
            <label className="label pb-0">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is Required" })}
              type="text"
              className="input w-full"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
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
          <div className="form-control w-full mb-2">
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
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special character",
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
            {signUpLoading ? <Loader></Loader> : <span> Sign Up</span>}
          </button>
        </form>
        <p className="my-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
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

export default SignUp;
