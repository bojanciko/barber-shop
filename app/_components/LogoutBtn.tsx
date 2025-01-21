'use client';
import { auth } from "@/app/_lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/signin");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
