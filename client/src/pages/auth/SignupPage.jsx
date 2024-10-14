import { Link } from "react-router-dom";
import { SignUpFrom } from "../../components/auth/SignupForm";

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-36 w-auto"
          src="/logo.svg"
          alt="linkedin image"
        />
        <h2 className="text-center text-3xl font-extralight text-gray-900 dark:text-white">
          Make the most of your Professional Life
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:max-w-md shadow-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpFrom />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already on LinkedIn?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};