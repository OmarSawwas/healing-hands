import React, {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {BellIcon, MenuIcon, XIcon, ClockIcon} from "@heroicons/react/outline";
import {PlusSmIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import List2 from "../Pages/New Post/NewpostList";
import {useLogout} from "../firebase/User-log-Manager/useLogout";
import List from "../Pages/New Post/DropList/Drop";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const {logout} = useLogout();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout()
			.then(() => {
				console.log("user is logged out");
				navigate("/");
			})
			.catch(console.error);
	};
	return (
		<div>
			<Disclosure as="nav" className="bg-white shadow ">
				{({open}) => (
					<>
						<div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
							<div className="flex justify-between h-16 ">
								<div className="flex">
									<div className="-ml-2 mr-2 flex items-center md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XIcon className="block h-6 w-6" aria-hidden="true" />
											) : (
												<MenuIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
									<div className="flex-shrink-0 flex items-center">
										<Link to="/">
											<img
												className="block lg:hidden h-8 w-auto "
												src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
												alt="Workflow"
											/>
											<img
												className="hidden lg:block h-8 w-auto"
												src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
												alt="Workflow"
											/>
										</Link>
									</div>
									<div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
										{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
										<Link
											to="/"
											className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
										>
											Home
										</Link>

										<List className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" />

										<Link
											to="/contact-us"
											className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
										>
											Contact Us
										</Link>
									</div>
								</div>
								<div className="flex items-center">
									<div className=" relative inline-flex items-center px-4 py-2 flex-shrink-0">
										<List2 />

										<button
											type="button"
											onClick={() => {
												navigate("/Sign-up");
											}}
											className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
										>
											<PlusSmIcon
												className="-ml-1 mr-2 h-5 w-5"
												aria-hidden="true"
											/>
											<span>SignUp/In</span>
										</button>
										<button
											type="button"
											onClick={() => {
												navigate("/pending-posts");
											}}
											className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
										>
											<ClockIcon
												className="-ml-1 mr-2 h-5 w-5"
												aria-hidden="true"
											/>
											<span>Pending Posts</span>
										</button>
									</div>

									<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
										<button
											type="button"
											className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											<span className="sr-only">View notifications</span>
											<BellIcon className="h-6 w-6" aria-hidden="true" />
										</button>

										{/* Profile dropdown */}
										<Menu as="div" className="ml-3 relative z-50">
											<div>
												<Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-200"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items
													onhover
													className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
												>
													<Menu.Item>
														{({active}) => (
															<Link
																to="/profile"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Your Profile
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<Link
																to="/settings"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Settings
															</Link>
														)}
													</Menu.Item>
													<Menu.Item>
														{({active}) => (
															<button
																onClick={handleLogout}
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Sign out
															</button>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="md:hidden ">
							<div className="pt-2 pb-3 space-y-1 ">
								{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
								<Disclosure.Button
									as="a"
									to="#"
									className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									Dashboard
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									Team
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									Projects
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									Calendar
								</Disclosure.Button>
							</div>
							<div className="pt-4 pb-3 border-t border-gray-200">
								<div className="flex items-center px-4 sm:px-6">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-gray-800">
											Tom Cook
										</div>
										<div className="text-sm font-medium text-gray-500">
											tom@example.com
										</div>
									</div>
									<button
										type="button"
										className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div className="mt-3 space-y-1">
									<Disclosure.Button
										as="a"
										to="#"
										className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
									>
										Your Profile
									</Disclosure.Button>
									<Disclosure.Button
										as="a"
										to="#"
										className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
									>
										Settings
									</Disclosure.Button>
									<Disclosure.Button
										as="a"
										to="#"
										className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
									>
										Sign out
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};
export default Navbar;
