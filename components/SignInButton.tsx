"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SignInButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
          <div className="flex gap-4 ml-auto">
            <nav className="flex items-center gap-6 font-semibold">
              <Link href={"/home#recentRecipes"}>Recent recipes</Link>
              <Link href={"/profile"}>Account</Link>
              <Link
                href={"/recipeList/newRecipe"}
                className="bg-collection-1-secondary rounded-full text-white px-8 py-3"
              >
                Add new recipe
              </Link>
            </nav>
            <button
              onClick={() =>
                signOut({ callbackUrl: "/auth/signIn" })
              }
              className="text-red-600"
            >
              Sign Out
            </button>
          </div>
        );
    }
}

export default SignInButton