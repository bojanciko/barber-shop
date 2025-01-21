// app/_components/Navbar.tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex gap-6 flex-row justify-around items-center">
        <Link href="/" className="text-white hover:text-slate-300">
          Home
        </Link>
        <Link href="/appointments" className="text-white hover:text-slate-300">
          Appointments
        </Link>
        <Link href="/about" className="text-white hover:text-slate-300">
          About
        </Link>
        <Link href="/signup" className="text-white hover:text-slate-300">
          SignUp
        </Link>
        <Link href="/signin" className="text-white hover:text-slate-300">
          SignIn
        </Link>
      </div>
    </nav>
  )
}