import React, { useState } from "react";
import { phoneRegex } from "../utils/regex";
import { useLogin } from "../api/auth";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#360133] to-[#4a0147] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isPending ? (
          <div className="flex justify-center items-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
            <p className="text-center text-gray-600">Please enter your phone number to continue</p>
            
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
                    : "bg-[#360133] hover:bg-[#4a0147] shadow-lg hover:shadow-xl"
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
