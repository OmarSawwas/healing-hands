import Navabar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import {useSignup} from "../../../firebase/User-log-Manager/useSignUp"
import { useState } from "react";
import { useLogin } from "../../../firebase/User-log-Manager/useSign";
import { useNavigate } from "react-router-dom";
const SignUpPage =()=>{
  const navigate = useNavigate();
const {error,signup}=useSignup();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [weakPassword, setWeakPassword] = useState(true);

const handleClick= (e)=>{
  e.preventDefault();
  if(password.length>=6){

    setWeakPassword(false)
    signup(email,password)
    
   }
  }
 

  return (
    <div>
      <Navabar />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                     required
                   
                    type="email"
        
                    autoComplete="email"
                 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                 />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                                   required
                   
                                   type="password"
                       
                                   autoComplete="password"
                                
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e)=>setPassword(e.target.value)}
                                 value={password}
          />
                </div>
              </div>
           

    

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClick}
               >
                  Sign up
                </button>
              </div>
              <div className=" text-m font-bold  text-center mt-5 text-red-900">
                  You have an account?
                </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    navigate("/Sign-in");
                  }}
               >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {error&& <p>error.message</p>}
      {weakPassword&& <p>Password less than 6 character</p>}
    </div>
  );
}

export default SignUpPage