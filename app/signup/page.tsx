'use client'
import { sendEmailVerification, createUserWithEmailAndPassword, auth, signInWithGoogle } from "@/app/_lib/firebase";
import { useState } from "react";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const signUpUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null); // Reset errors before new attempt
      setSuccessMessage(null);

      // Validate password match
      if (password !== repeatPassword) {
        throw new Error("Passwords do not match.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);
      setSuccessMessage("Verification email sent! Check your inbox.");

      // Reset form
      setEmail("");
      setPassword("");
      setRepeatPassword("");

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

      const user = await signInWithGoogle();
      setSuccessMessage(`Signed in as ${user.displayName}`);

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
    event.preventDefault(); // Prevent page reload
    await signUpUser(email, password);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>

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
        <input
          className="border p-2 text-black"
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
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
        Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
      </p>
    </div>
  );
}