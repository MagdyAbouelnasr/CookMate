"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-end text-4xl font-bold my-4 p-36">
        <div className="flex justify-end items-center">
          <span className="ml-24">Loading...</span>
          <Image
            src="/cook.jpg"
            alt="Chars"
            width={921}
            height={619}
            className=""
          />
        </div>
      </div>
    ); // Display loading message
  }

  if (!userData) {
    return (
      <h1 className="text-xxlg leading-6 font-medium text-gray-900">
        User not found
      </h1>
    );
  }

  const defaultProfilePic = "/head.jpg"; // Replace with your default profile picture URL

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <Image
              src={defaultProfilePic}
              alt="Profile picture"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">User Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user.username}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {session?.user.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
