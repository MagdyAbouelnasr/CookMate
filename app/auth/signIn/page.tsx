"use client";
import Image from "next/image";
import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import ArrowRightSLine from "../../../components/icons/right";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("password is required"),
});

const SignIn = () => {
  const [isDisabled, setDisabled] = useState(false);

  const { data: session } = useSession();
  // console.log(session?.user)

  if (session) {
    redirect("/home");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ email, password }) => {
      setDisabled(true);
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/home",
        });
      } catch (e) {
        setDisabled(false);
      }
    },
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container grid grid-cols-2">
        <div className="flex flex-col w-8/12">
          <h1 className="text-4xl font-bold mb-4">Welcome to CookMate!</h1>
          <h2 className="text-xl mb-24">Sign in to your account</h2>

          <form onSubmit={handleSubmit} method="POST">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-l font-bold mb-2">
                Email Address
              </label>
              <input
                type="e"
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
              className="w-full bg-collection-1-secondary hover:collection-1-secondary-700 text-white font-bold py-2 px-4 rounded-full uppercase mb-4"
              disabled={isDisabled}
            >
              Sign in now
            </button>

            <div className="text-left">
              <Link
                href="/auth/newUser"
                className="text-blue-600 hover:text-blue-800"
              >
                New to Cookmate?
              </Link>
            </div>
          </form>
        </div>
        <div className="flex justify-end items-center ">
          <Image
            src="/chars.jpg"
            alt="Chars"
            width={624}
            height={619}
            className="end-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
