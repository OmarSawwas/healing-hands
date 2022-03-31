import React from "react";
import {useState} from "react";
import {
	MailIcon,
	PhoneIcon,
	XIcon,
	CheckCircleIcon,
} from "@heroicons/react/outline";
import {doc, setDoc} from "firebase/firestore";
import {ContactUs} from "../../firebase/config";
import Pops from "./Pop";

const ContactUsPage = () => {
	const [popStatus, setPopStatus] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await setDoc(doc(ContactUs), data).catch(console.error);
		setPopStatus(true);
	};
	const cancelPop = () => {
		setPopStatus(false);
	};
	console.log(popStatus);
	return (
		<div className="">
			<div className="relative bg-[#3a3534]">
				<div className="flex justify-end">
					{popStatus && <Pops setPop={setPopStatus} />}
				</div>
				<div className="absolute inset-0">
					<div className="bg-[#F2B400]absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
				</div>

				<div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
					<div className=" bg-[#3a3534] py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
						<div className="max-w-lg mx-auto">
							<h2
								title="Feel Free to contact us and know much more!"
								className="text-white text-7xl font-extrabold tracking-tight  text-black-900 lg:text-4xl animate-pulse	animation: pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
							>
								Get in Touch !
							</h2>
							<p className="mt-3 text-xl leading-6 text-white">
								Email us with any question or inquiries.
							</p>
							<p className=" text-xl  text-white">
								We would be happy to answer your
							</p>
							<p className=" text-xl  text-white">
								questions and set up meeting with you.
							</p>
							<dl className="mt-8 text-base text-gray-100">
								<div></div>
								<div className="mt-6">
									<dt className=" sr-only">Phone number</dt>
									<dd className="flex">
										<PhoneIcon
											className="text-xl leading-6  flex-shrink-0 h-6 w-6 text-gray-100"
											aria-hidden="true"
										/>
										<span className="text-lg leading-6 text-gray-100 ml-3">
											+961 123-4567
										</span>
									</dd>
								</div>
								<div className="mt-3 ">
									<dt className="sr-only">Email</dt>
									<dd className="flex">
										<MailIcon
											className="text-xl leading-6 flex-shrink-0 h-6 w-6 text-gray-100"
											aria-hidden="true"
										/>
										<span className="text-lg leading-6 text-gray-100 ml-3 hover:text-sky-600 ">
											Healinghands@gmail.com
										</span>
									</dd>
								</div>
							</dl>
						</div>
					</div>

					<div className="bg-[#3a3534] py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
						<div className="max-w-lg mx-auto lg:max-w-none">
							<form
								action="#"
								method="POST"
								className="grid grid-cols-1 gap-y-6"
								onSubmit={handleSubmit}
							>
								<div>
									<label className=" font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600 text-white">
										Full name
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="text"
											name="name"
											id="name"
											onChange={handleChange}
											value={data.name}
											placeholder="Full Name"
											required
											autoComplete="off"
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic  placeholder-gray-400 focus:ring-black focus:border-black  rounded-md"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="email"
										className="text-white font-bold color:text-gray-900 lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Email
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="email"
											name="email"
											id="email"
											onChange={handleChange}
											value={data.email}
											placeholder="Email"
											required
											autoComplete="off"
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic  placeholder-gray-400 focus:ring-black focus:border-black  rounded-md"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="text-white font-bold color:text-gray-900 lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Phone
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="text"
											name="phone"
											id="phone"
											onChange={handleChange}
											value={data.phone}
											placeholder="+XXX XXXXXXXX"
											required
											autoComplete="off"
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  block w-full py-3 px-4 placeholder:italic  placeholder-gray-400 focus:ring-black focus:border-black  rounded-md"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="message"
										className="text-white font-bold color:text-gray-900 lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Message
									</label>
									<textarea
										type="text"
										autoComplete="none"
										onChange={handleChange}
										value={data.message}
										name="message"
										id="message"
										required
										rows={4}
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block w-full py-3 px-4 placeholder-gray-400 focus:ring-black focus:border-black  rounded-md"
										placeholder="Leave a message here."
									/>
								</div>
								<div>
									<button
										type="submit"
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) inline-flex justify-center py-3 px-8 ml-64	margin-left: 16rem; border border-transparent ;shadow-sm text-base  rounded-md text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ContactUsPage;
