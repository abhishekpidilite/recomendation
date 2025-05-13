import React, { useState } from "react";
import { phoneRegex } from "../utils/regex";
import { useLogin } from "../api/auth";
import CascadeLoader from "../utils/components/loader";
import logo from "../assets/logo.png";

const OTP_LENGTH = 4;

const Login = () => {
  const [phone, setPhone] = useState("");
  const { mutate: login, isPending: isPending, isError: isError } = useLogin();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    try {
      login({ username: phone });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value;
    if (!value) {
      setPhone("");
      return;
    }
    if (phoneRegex.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#360133] to-[#4a0147] flex flex-col items-center justify-center p-4">
      <img
        src={logo}
        alt="logo"
        className="w-[250px] mx-auto  brightness-0 invert"
      />
      <div className="w-full max-w-md">
        {isPending ? (
          <CascadeLoader />
        ) : (
          <div className=" rounded-2xl  p-8 space-y-6">
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneInput}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#360133] focus:ring-2 focus:ring-[#360133]/20 outline-none transition-all duration-200"
                />
              </div>

              <button
                disabled={phone.length !== 10}
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
                  phone.length !== 10
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#360133] hover:bg-[#4a0147] "
                }`}
              >
                Continue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
