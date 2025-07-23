import { useState } from "react";
import Login from "./Login";
import Register from "./Register";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Event RSVP</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                A simple dashboard to manage users and monitor RSVPs for your events.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Event RSVP
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {isLogin ? "Sign in to access your account" : "Create your account"}
              </p>
            </div>

            <div className="mt-8">
              {isLogin ? <Login /> : <Register />}

              <p className="mt-6 text-sm text-center text-gray-400">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-500 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-blue-500 hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
