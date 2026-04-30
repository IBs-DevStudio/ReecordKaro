"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="sign-in">
      {/* ✅ LEFT SIDE */}
      <aside className="testimonial">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            alt="SnapCast Logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        <div className="description">
          <section>
            {/* ⭐ Stars */}
            <figure className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="rating star"
                  width={20}
                  height={20}
                  key={index}
                />
              ))}
            </figure>

            <p>
              SnapCast makes screen recording easy. From quick walkthroughs to
              full presentations, it’s fast, smooth, and shareable in seconds.
            </p>

            <article className="flex items-center gap-3">
              <Image
                src="/assets/images/jason.png"
                alt="Jason Rivera"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2>Jason Rivera</h2>
                <p className="text-sm text-gray-500">
                  Product Designer, NovaByte
                </p>
              </div>
            </article>
          </section>
        </div>

        {/* ✅ Dynamic year */}
        <p>© {new Date().getFullYear()} SnapCast</p>
      </aside>

      {/* ✅ RIGHT SIDE */}
      <aside className="google-sign-in">
        <section className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              alt="SnapCast Logo"
              width={40}
              height={40}
            />
            <h1>SnapCast</h1>
          </Link>

          <p>
            Create and share your very first{" "}
            <span className="font-semibold">SnapCast video</span> in no time!
          </p>

          {/* ✅ Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* ✅ Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Image
              src="/assets/icons/google.svg"
              alt="Google"
              width={22}
              height={22}
            />
            <span>
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </span>
          </button>
        </section>
      </aside>

      {/* ✅ Overlay */}
      <div className="overlay" />
    </main>
  );
};

export default SignIn;