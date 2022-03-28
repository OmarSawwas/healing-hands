import {Dialog, Transition} from "@headlessui/react";
import {
	CollectionIcon,
	IdentificationIcon,
	MenuAlt2Icon,
	StarIcon,
	UserGroupIcon,
	XIcon,
	ChatAlt2Icon,
} from "@heroicons/react/outline";
import React, {Fragment, useState, useEffect} from "react";
import OnAuthState from "../../firebase/User-log-Manager/OnAuthState";
import {getDoc, doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/config";
import Footer from "../Footer";
import Navbar from "../Navbar";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Index = (props) => {
	const {children} = props;
	const currentURL = window.location.href;

	//

	const user = OnAuthState();
	const [myUser, setUser] = useState();
	const [id, setId] = useState();
	const getUser = async () => {
		if (user) {
			const id = user.uid;
			setId(id);
			const docRef = doc(db, "Users", id);
			await onSnapshot(docRef, (document) => {
				setUser(document.data());
			});
		}
	};

	useEffect(() => {
		getUser();
		return () => getUser();
	}, [user]);

	//
	//
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigation = [
		{
			name: "Personal Information",
			href: `/profile/${id}`,
			icon: IdentificationIcon,
			current: currentURL.includes("profile") ? true : false,
		},

		{
			name: "Starred Posts",
			href: `/${id}/starred-posts`,
			icon: StarIcon,
			current: currentURL.includes("starred-posts") ? true : false,
		},
		{
			name: "Contact Us",
			href: `/${id}/messages`,
			icon: ChatAlt2Icon,
			current: currentURL.includes("messages") ? true : false,
		},
		{
			name: "Accounts",
			href: `/${id}/accounts`,
			icon: UserGroupIcon,
			current: currentURL.includes("accounts") ? true : false,
		},
	];
	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 md:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-[#292524]">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								<div className="flex-shrink-0 flex items-center px-4"></div>
								<div className="mt-5 flex-1 h-0 overflow-y-auto">
									<nav clasnavisName="px-2 space-y-1 mb-40">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? "bg-[#f2b400] text-black"
														: "text-gray-300 hover:bg-gray-600 hover:text-white",
													"group flex items-center px-2 py-2 text-base font-bold rounded-md "
												)}
											>
												<item.icon
													className={classNames(
														item.current
															? "text-black"
															: "text-gray-400 group-hover:text-gray-300",
														"mr-4 flex-shrink-0 h-6 w-6"
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										))}
									</nav>
								</div>
							</div>
						</Transition.Child>
						<div className="flex-shrink-0 w-14" aria-hidden="true">
							{/* Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}

				<div className="mt-16 hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					{/* Sidebar component, swap this element with another sidebar if you like */}

					<div className="flex-1 flex flex-col min-h-0 bg-[#292524]">
						<div className="flex items-center h-0 flex-shrink-0 px-4 bg-gray-900"></div>
						<div className="flex-1 flex flex-col overflow-y-auto">
							<nav className="flex-1 px-2 py-3 space-y-1">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? "bg-[#f2b400] text-black"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"group flex items-center px-2 py-2 text-sm font-bold rounded-md"
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? "text-black"
													: "text-gray-400 group-hover:text-gray-300",
												"mr-3 flex-shrink-0 h-6 w-6"
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col bg-[#3a3534]">
					<div className="sticky top-0 z-10 flex-shrink-0 flex h-0 bg-white shadow">
						<button
							type="button"
							className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<main className="flex-1  ">
						<div className="py-6">
							<div className="max-w-7xl mx-auto px-1 ">{children}</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};
export default Index;
