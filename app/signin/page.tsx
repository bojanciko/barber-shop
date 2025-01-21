"use client";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { signInWithGoogle } from "../_lib/firebase";
import { useAuth } from "@/app/_context/AuthContext";

const auth = getAuth();

export default function SignInPage() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const signInUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;
      setUser(userCredential.user); // Update Context
      console.log("User signed in:", userCredential.user);

      // Check if email is verified
      if (!signedInUser?.emailVerified) {
        throw new Error("Email not verified. Please check your inbox.");
      }

      setSuccessMessage("Sign-in successful! Redirecting...");
      setEmail("");
      setPassword("");

      // Redirect after successful login (optional)
      setTimeout(() => {
        window.location.href = "/appointments"; // Change to your app's dashboard
      }, 1500);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const signedInUser = await signInWithGoogle();
      if (!signedInUser) throw new Error("Google Sign-In failed");

      setUser(signedInUser); // 🔥 Updates Context

      setSuccessMessage(`Signed in as ${signedInUser.displayName}`);
      setTimeout(() => {
        window.location.href = "/appointments"; // Redirect after login
      }, 1500);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signInUser(email, password);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white p-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In with Google"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

      <p className="mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
}
