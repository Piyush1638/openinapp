"use client";
import ThemeToggler from "@/components/ThemeToggler";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useMemo } from "react";

const SocialIcon = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    height={32.8}
    width={33.6}
    className="cursor-pointer"
  />
);

const AuthButton = ({
  src,
  alt,
  text,
}: {
  src: string;
  alt: string;
  text: string;
}) => (
  <button className="text-xs font-bold leading-3 text-[#858585] flex items-center justify-center px-3 py-2 dark:bg-black bg-white rounded-lg gap-2">
    <Image src={src} alt={alt} height={15.37} width={15.37} />
    <p>{text}</p>
  </button>
);

const Page = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const toggleMode = () => setIsSignUp((prev) => !prev);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        if (isSignUp) {
          // Sign Up API Call
          const response = await axios.post("/api/signup", {
            username,
            email,
            password,
          });
          console.log(response.data);
          setEmail("");
          setPassword("");
          setIsSignUp(false)
        } else {
          // Sign In API Call
          const response = await axios.post("/api/login", { email, password });
          console.log(response.data);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    },
    [isSignUp, username, email, password]
  );

  const socials = useMemo(
    () => [
      { src: "/login-signup/github.svg", alt: "GitHub Icon" },
      { src: "/login-signup/twitter.svg", alt: "Twitter Icon" },
      { src: "/login-signup/linkedin.svg", alt: "LinkedIn Icon" },
      { src: "/login-signup/discord.svg", alt: "Discord Icon" },
    ],
    []
  );

  return (
    <main className="min-h-screen w-full dark:bg-[#161616] bg-[#f5f5f5] p-6 flex items-center justify-evenly">
      {/* Left Section */}
      <div className="w-1/2 h-screen lg:inline-block hidden bg-[#5f5bf6] rounded-3xl p-8">
        <div className="h-full w-full relative bg-[#777ef5] flex flex-col rounded-2xl px-6 py-8 gap-10">
          <Image
            src={"/login-signup/login-img.svg"}
            className="absolute bottom-0 right-0"
            alt="Login Illustration"
            height={350}
            width={300}
          />
          <div className="absolute bottom-10 left-10">
            <ThemeToggler />
          </div>
          <div className="bg-white flex items-center justify-center gap-3 w-fit px-5 py-3 rounded-full">
            <Image
              src={"/login-signup/brand.svg"}
              alt="Brand Logo"
              height={27.5}
              width={27.5}
            />
            <h3 className="font-bold text-[26px] text-black">Base</h3>
          </div>
          <h3 className="font-bold font-lato text-[45px] leading-[63px] text-white">
            Generate detailed reports with just one click
          </h3>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full h-[45.625rem] flex flex-col items-center justify-between lg:justify-evenly">
        <div className="flex flex-col lg:gap-4 gap-8 md:w-3/5 w-full">
          <h3 className="text-4xl font-bold font-montserrat dark:text-white text-black">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h3>
          <p className="text-base font-bold dark:text-white text-black">
            {isSignUp ? "Create a new account" : "Sign in to your account"}
          </p>
          <div className="flex items-center justify-between">
            <AuthButton
              src="/login-signup/google-auth.svg"
              alt="Google Icon"
              text="Sign in with Google"
            />
            <AuthButton
              src="/login-signup/apple-auth.svg"
              alt="Apple Icon"
              text={isSignUp ? "Sign up with Apple" : "Sign in with Apple"}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-[20px] dark:bg-[#0D0D0D] bg-white p-4 font-lato font-bold flex flex-col gap-4"
          >
            {isSignUp && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="dark:text-white text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full dark:bg-[#161616] bg-[#EAEAEA] dark:text-white text-black outline-none rounded-lg p-2"
                  placeholder="Your username"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="dark:text-white text-black">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full dark:bg-[#161616] bg-[#EAEAEA] dark:text-white text-black outline-none rounded-lg p-2"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="dark:text-white text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full dark:bg-[#161616] bg-[#EAEAEA] dark:text-white text-black outline-none rounded-lg p-2"
                placeholder="Enter your password"
              />
            </div>
            {!isSignUp && (
              <Link href="/#" className="text-[#4979D9]">
                Forgot password?
              </Link>
            )}
            <button className="w-full bg-[#605BFF] rounded-lg py-2 text-white">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="w-full text-center dark:text-white text-black">
            {isSignUp
              ? "Already have an account?"
              : "Don&apos;t have an account?"}{" "}
            <button onClick={toggleMode} className="text-[#346BD4]">
              {isSignUp ? "Sign In" : "Register here"}
            </button>
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {socials.map((social, index) => (
            <SocialIcon key={index} src={social.src} alt={social.alt} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
