import Link from 'next/link'
import React from 'react'
import { Image } from '@mantine/core'
import SignInButton from './SignInButton'

function InitialBar() {
  return (
    <>
    <header className="p-5 flex items-center justify-between">
      <Link href="/">
        <Image src="/cookmate.png" width={200} height={200} alt="Cookmate" />
      </Link>

      <SignInButton />

    </header>
  </>
  )
}

export default InitialBar