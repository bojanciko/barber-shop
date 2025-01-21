"use client";
import { useEffect } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin"); // Redirect only if user is null
    }
    console.log(user)
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>; // Show loading only while fetching auth state

  return (
    <>
      {user && <>{children}</>}
    </>
  )
};

export default ProtectedRoute;
