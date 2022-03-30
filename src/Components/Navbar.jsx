import React, {Fragment, useState, useEffect} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {
	BellIcon,
	MenuIcon,
	XIcon,
	ClockIcon,
	ChatAlt2Icon,
} from "@heroicons/react/outline";
import {PlusSmIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import List2 from "../Pages/New Post/NewpostList";
import {useLogout} from "../firebase/User-log-Manager/useLogout";
import List from "../Pages/New Post/DropList/Drop";
import userState from "../firebase/User-log-Manager/OnAuthState";
import {db} from "../firebase/config";
import {getDoc, doc, onSnapshot, query} from "firebase/firestore";
import {async} from "@firebase/util";
import Logo2 from "../Images/omar logo.png";
import {ContactUs} from "../firebase/config";
import {message} from "antd";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = (props) => {
	const currentURL = window.location.href;
	const {user, userId} = props;
	const [messages, setMessages] = useState(0);

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

	const q = query(ContactUs);
	const getMessages = async () => {
		await onSnapshot(q, (documents) => {
			setMessages(documents.size);
		});
	};
	useEffect(() => {
		getMessages();
		return () => getMessages();
	}, [user]);

	return (
		<div className="sticky inset-0 z-50">
			<Disclosure as="nav" className="bg-stone-800 shadow ">
				{({open}) => (
					<>
						<div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:h-24 items-center flex">
							<div className="flex justify-between h-16 ">
								<div className="flex">
									<div className="-ml-2 mr-2 flex items-center md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-gray-500 hover:bg-stone-800 ">
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
												className="block  h-14 w-14 z-50 rounded-full hover:opacity-75"
												src={Logo2}
												alt="Logo"
												onClick={() => {
													navigate("/");
												}}
											/>
										</Link>
									</div>
									<div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
										{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-yellow-400 hover:text-gray-700" */}
										<Link
											to="/"
											className={classNames(
												currentURL.includes(`/" "`)
													? "inline-flex border-yellow-400 border-b-2 bg-stone-800 text-yellow-400 text-sm font-medium  shadow-sm  mx-2"
													: "relative inline-flex items-center px-4 py-2 border border-transparent bg-stone-800 hover:text-yellow-400 text-sm font-medium rounded-md text-white shadow-sm hover:bg-stone-800 mx-2"
											)}
										>
											Home
										</Link>

										<List className="border-white text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" />

										<Link
											to="/contact-us"
											className={classNames(
												currentURL.includes("contact-us")
													? "inline-flex border-yellow-400 border-b-2 bg-stone-800 text-yellow-400 text-sm font-medium  shadow-sm  mx-2"
													: "relative inline-flex items-center px-4 py-2 border border-transparent bg-stone-800 hover:text-yellow-400 text-sm font-medium rounded-md text-white shadow-sm hover:bg-stone-800 mx-2"
											)}
										>
											Contact Us
										</Link>
										<div className=" relative inline-flex items-center px-4 py-2 flex-shrink-0 ">
											<List2 className="ml-24" />
											{!user && (
												<button
													type="button"
													onClick={() => {
														navigate("/Sign-up");
													}}
													className={classNames(
														currentURL.includes("Sign")
															? "inline-flex border-yellow-400 border-b-2 bg-stone-800 text-yellow-400 text-sm font-medium  shadow-sm  mx-2"
															: "relative inline-flex items-center px-4 py-2 border border-transparent bg-stone-800 hover:text-yellow-400 text-sm font-medium rounded-md text-white shadow-sm hover:bg-stone-800 mx-2"
													)}
												>
													<PlusSmIcon
														className="-ml-1 mr-2 h-5 w-5"
														aria-hidden="true"
													/>
													<span>SignUp/In</span>
												</button>
											)}

											{user && user.isAdmin && (
												<button
													type="button"
													onClick={() => {
														navigate("/pending-posts");
													}}
													className={classNames(
														currentURL.includes("pending-posts")
															? "inline-flex border-yellow-400 border-b-2 bg-stone-800 text-yellow-400 text-sm font-medium  shadow-sm  mx-2"
															: "relative inline-flex items-center px-4 py-2 border border-transparent bg-stone-800 hover:text-yellow-400 text-sm font-medium rounded-md text-white shadow-sm hover:bg-stone-800 mx-2"
													)}
												>
													<ClockIcon
														className="-ml-1 mr-2 h-5 w-5"
														aria-hidden="true"
													/>
													<span>Pending Posts</span>
												</button>
											)}
										</div>

										<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
											{user && user.isAdmin && (
												<button
													type="button"
													className=" p-1 rounded-full text-yellow-400 hover:text-gray-500 focus:outline-none "
													onClick={() => {
														navigate(`${userId}/messages`);
													}}
												>
													<div className="flex">
														<span className="font-bold mr-2">{messages}</span>
														<ChatAlt2Icon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</div>
												</button>
											)}

											{/* Profile dropdown */}
											{user && (
												<Menu as="div" className="ml-3 relative z-50">
													<div>
														<Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
															<span className="sr-only">Open user menu</span>
															<img
																className="h-20 w-20 rounded-full"
																src={user.image}
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
															className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-stone-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
														>
															<Menu.Item>
																{({active}) => (
																	<Link
																		to={`/profile/${userId}`}
																		className={classNames(
																			active ? "bg-stone-800" : "",
																			"block px-4 py-2 text-sm text-white hover:text-yellow-400"
																		)}
																	>
																		Your Profile
																	</Link>
																)}
															</Menu.Item>

															<Menu.Item>
																{({active}) => (
																	<button
																		onClick={handleLogout}
																		className={classNames(
																			active ? "bg-stone-800" : "",
																			"block px-4 py-2 text-sm text-white hover:text-yellow-400"
																		)}
																	>
																		Sign out
																	</button>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</Menu>
											)}
										</div>
									</div>
								</div>
								<div className="flex items-center"></div>
							</div>
						</div>

						<Disclosure.Panel className="md:hidden ">
							<div className="pt-2 pb-3 space-y-1 ">
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent bg-stone-800 text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									<Link to="/">Home</Link>
								</Disclosure.Button>

								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									<Link to="/contact-us">Contact Us</Link>
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									<List />
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									to="#"
									className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
								>
									<List2 />
								</Disclosure.Button>
							</div>
							<div className="pt-4 pb-3 border-t border-yellow-400">
								<div className="mt-3 space-y-1">
									<Disclosure.Button
										as="a"
										to="#"
										className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
									>
										<div className="flex justify-center">
											{user && (
												<img
													className="h-40 w-40 rounded-full justify-center "
													src={user.image}
													alt=""
												/>
											)}
										</div>
									</Disclosure.Button>

									<Disclosure.Button
										as="a"
										to="#"
										className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
									>
										<Link to={`/profile/${userId}`}>Your Profile</Link>
									</Disclosure.Button>
									<Disclosure.Button
										as="a"
										to="#"
										className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
									>
										{user && user.isAdmin && (
											<button
												type="button"
												onClick={() => {
													navigate("/pending-posts");
												}}
												className="inline-flex"
											>
												<ClockIcon
													className="-ml-1 mr-2 h-5 w-5"
													aria-hidden="true"
												/>
												<span>Pending Posts</span>
											</button>
										)}
										{user && user.isAdmin && (
											<button
												type="button"
												className="ml-20 p-1 rounded-full text-yellow-400 hover:text-gray-500 focus:outline-none "
												onClick={() => {
													navigate(`${userId}/messages`);
												}}
											>
												<div className="flex">
													<span className="font-bold mr-2">{messages}</span>
													<ChatAlt2Icon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</div>
											</button>
										)}
									</Disclosure.Button>

									<Disclosure.Button
										as="a"
										to="#"
										className="border-transparent text-yellow-400  hover:border-yellow-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
									>
										{user ? (
											<button onClick={handleLogout}>Sign out</button>
										) : (
											<button
												type="button"
												onClick={() => {
													navigate("/Sign-up");
												}}
												className="inline-flex "
											>
												<PlusSmIcon
													className="-ml-1 mr-2 h-5 w-5"
													aria-hidden="true"
												/>
												<span>SignUp/In</span>
											</button>
										)}
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
