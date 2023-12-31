"use client";
import { Image } from "@mantine/core";
import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ArrowRightSLine from "@/components/icons/right";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const [unAuthenticated, setUnauthenticated] = useState(false);

  const { data: session } = useSession();

  if (session) {
    redirect("/home");
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,

    // Handle form submission
    onSubmit: async ({ username, email, password }) => {
      try {
        setDisabled(true);
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          throw new Error("Signup failed");
        }

        router.push("/auth/signIn");
      } catch (error) {
        setUnauthenticated(true);
        setDisabled(false);
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center mt-8">
      <div className="container grid grid-cols-2">
        <div className="flex flex-col w-8/12">
          <h1 className="text-4xl font-bold mb-4">Join the CookMate</h1>
          <h1 className="text-4xl font-bold mb-4">Community</h1>
          <h2 className="text-xl mb-24">Create your account</h2>
          {unAuthenticated && (
            <h2 className="text-xl mb-24 text-primary">
              Opps Something Went Wrong! Invalid Credentials
            </h2>
          )}

          <form onSubmit={handleSubmit} method="POST">
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="text-l font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                id="username"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.username && touched.username && (
                <span className="text-red-400">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-l font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                id="email"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.email && touched.email && (
                <span className="text-red-400">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-l font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                id="password"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.password && touched.password && (
                <span className="text-red-400">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="confirmPassword"
                className="text-l font-bold mb-2"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.password && touched.password && (
                <span className="text-red-400">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="text-left mb-4">
              <Link
                href="/auth/resetPassword"
                className="text-blue-600 hover:text-blue-800"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-collection-1-secondary hover:collection-1-secondary-700 text-white font-bold py-3 px-4 rounded-full uppercase mb-4 flex flex-inline justify-center"
              disabled={isDisabled}
            >
              Create New
              <ArrowRightSLine />
            </button>

            <div className="text-left mb-4">
              <Link
                href="/auth/signIn"
                className="text-blue-600 hover:text-blue-800"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
        <div className="flex justify-end items-center">
          <Image
            src="/cook.jpg"
            alt="Chars"
            width={921}
            height={619}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
