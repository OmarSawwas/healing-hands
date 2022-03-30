import Navabar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import {useLogin} from "../../../firebase/User-log-Manager/useSign";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function Example() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {error, login} = useLogin();
	const logInClick = (e) => {
		e.preventDefault();
		login(email, password);
	};
	return (
		<div className="bg-[#3a3534]">
			<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
						Sign in to your account
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
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
										onChange={(e) => setEmail(e.target.value)}
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
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
								</div>
							</div>

							<div>
								{error && (
									<div className=" text-m font-bold  text-center mt-1 mb-2 text-red-900">
										Wrong Email/Password
									</div>
								)}
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
									onClick={logInClick}
								>
									Sign in
								</button>
								<div className=" text-m font-bold  text-center mt-5 text-green-500">
									No account?
								</div>
							</div>
							<div>
								<button
									type="button"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => {
										navigate("/Sign-up");
									}}
								>
									Create New Account
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
