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
  email: Yup.string().email("Invalid email").required("Email is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmNewPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const ResetPassword = () => {
  const router = useRouter();
  const [isDisabled, setDisabled] = useState(false);
  const [unAuthenticated, setUnauthenticated] = useState(false);

  const { data: session } = useSession();

  if (session) {
    redirect("/home");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: SignupSchema,

    // Handle form submission
    onSubmit: async ({ email, newPassword }) => {
      try {
        setDisabled(true);
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        });

        if (!response.ok) {
          throw new Error("Password Change failed");
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
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <h2 className="text-xl mb-24">
            Enter a new password for your CookMate account
          </h2>
          {unAuthenticated && (
            <h2 className="text-xl mb-24 text-primary">
              Opps Something Went Wrong!
            </h2>
          )}

          <form onSubmit={handleSubmit} method="POST">
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
              <label htmlFor="newPassword" className="text-l font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                id="newPassword"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.newPassword && touched.newPassword && (
                <span className="text-red-400">{errors.newPassword}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="text-l font-bold mb-2"
              >
                Confirm New password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                id="confirmNewPassword"
                className="rounded-full outline p-2 mb-2"
              />
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <span className="text-red-400">
                  {errors.confirmNewPassword}
                </span>
              )}
            </div>

            <div className="text-left mb-4">
              <Link
                href="/auth/newUser"
                className="text-blue-600 hover:text-blue-800"
              >
                New User?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-collection-1-secondary hover:collection-1-secondary-700 text-white font-bold py-3 px-4 rounded-full uppercase mb-4 flex flex-inline justify-center"
              disabled={isDisabled}
            >
              RESET PASSWORD
              <ArrowRightSLine />
            </button>

            <div className="text-left mb-4">
              <Link
                href="/auth/signIn"
                className="text-blue-600 hover:text-blue-800"
              >
                Remember your password?
              </Link>
            </div>
          </form>
          <div className="outline-dashed rounded p-6">
            <ul className="list-disc list-">
              <h1 className="mb-4 font-bold text-xl ">Instructions</h1>
              <li className="text-red-500">
                <div className="text-black">
                  Password must be atleast 8 characters long
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Image
            src="/cake.jpg"
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

export default ResetPassword;
