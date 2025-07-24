"use client";
import supabase from "@/utils/supabaseClient";
import { useState } from "react";

export default function AuthForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

 
  async function handleSignIn(e) {
    e.preventDefault();
    // lógica de login
  }

   async function handleSignUp(e) {
    e.preventDefault();
    const { data, error} = await supabase.auth.signUp({
      email,
      password
    });
    if(!error) {
      setIsSigningUp(true);
    }
    console.log({data, error});
  }


  let signInMesage = "Sign In";
  if (isSigningIn) {
    signInMesage = "Signing In...";
  } else if (isNewUser) {
    signInMesage = "Sign Up";
  }

  const signUpMessage = (
    <p className="text-green-600 mt-4 text-sm">
      Email sent! Check your inbox to confirm sign up.
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={isNewUser ? handleSignUp : handleSignIn}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isNewUser ? "Create an account" : "Welcome back"}
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {signInMesage}
        </button>

        <div className="text-center text-sm text-gray-600">
          {isNewUser ? (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => setIsNewUser(false)}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <span>Don’t have an account? </span>
              <button
                type="button"
                onClick={() => setIsNewUser(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {isSigningUp && signUpMessage}
      </form>
    </div>
  );
}