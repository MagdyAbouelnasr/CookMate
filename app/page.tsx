"use client"
import { useSession } from "next-auth/react";
import Home from "./home/page";


export default function Main() {
  const {data: session} = useSession({
    required: true
  })
  return (
    <>
      <Home/>
    </>
  );
}
