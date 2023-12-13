"use client"
import Image from 'next/image';
import { TextInput } from '@mantine/core';
import React from 'react';
import ArrowRightSLine from '../../../components/icons/right';
import { Formik, Form, Field } from 'formik';


interface MyFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  
  const initialValues: MyFormValues = { email: '', password: '' };

  return (
    <div className="grid grid-cols-2 max-[750px]:grid-cols-1 w-screen mt-16">
      <div className="">
        <h1 className="font-montserrat-h font-[number:var(--montserrat-h4-font-weight)] text-dark text-[length:var(--montserrat-h4-font-size)] leading-[var(--montserrat-h4-line-height)] relative tracking-[var(--montserrat-h4-letter-spacing)] [font-style:var(--montserrat-h4-font-style)]">
          Welcome to CookMate!
        </h1>
         <Form>
           <label htmlFor="email">Email Address</label>
           <input type='email' id="email" name="email" placeholder="Email Address" />
           <label htmlFor="password">Password</label>
           <input type='password' id="password" name="firstName" placeholder="Password" />
           <button type="submit">Submit</button>
         </Form>
       </div>
      <Image
        src="/chars.jpg"
        alt="Chars"
        width={617}
        height={619}
        className=''
      />
    </div>
  );
};

export default SignIn;
