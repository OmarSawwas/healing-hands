import Navbar from "../../../Components/Navbar";
import Nationalities from "../../../data/nationality";
import React, {useState} from "react";
import {WorkCases, db as FireStore} from "../../../firebase/config";
import {doc, setDoc, collection} from "firebase/firestore";
import Pop from "../../Pops/pop";
import LoadingPop from "../../Pops/LoadingPop";
const HealthForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		certificate: "",
		country: "",
		permenantAddress: "",
		permenantNumber: "",
		email: "",

		extraAddressInfo: "",
		files: "",
		severity: "",
		isAllowed: false,
	});
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await setDoc(doc(WorkCases), formData).catch(console.error);
		next();
	};
	const next = () => {
		return <Pop />;
	};
	const nationalitiesMap = Nationalities.map((nationality, index) => {
		return <option key={index}>{nationality.label}</option>;
	});
	console.log(formData);
	return (
		<div>
			<Navbar />
			<LoadingPop name="Work-Assistance" />
			<form className="mr-2 space-y-8 divide-y divide-gray-200">
				<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 ml-8">
					<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
						<div>
							<h2
								className="text-2xl font-extrabold tracking-tight  text-indigo-900 lg:text-2xl animate-pulse	animation: pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
@keyframes pulse {
  0%, 100% {
    opacity: 5;   
  }
  50%,75% {
    opacity: 2;  
  }
}"
							>
								Case Information for <span className="text-red-500">Work</span>
							</h2>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Please fill out this form that'll take you 5 minutes to do, so
								an organization(ex:NGOs) or someone can see your/the person you
								are helping case and fund your/their journy of learning. Note
								that this information will be displayed publicly
							</p>
						</div>
						<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="Enviroment"
								className="lg:text-1.5xl after:content-['*'] after:ml-1 font-bold  after:text-red-600"
							>
								Case Severity?
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="radio"
									id="high"
									name="severity"
									onChange={handleChange}
									value="high"
									checked={formData.severity === "high"}
									required
								/>
								<label
									htmlFor="yes"
									className="mr-1 ml-1 font-bold text-red-500"
								>
									High severity
								</label>
							</div>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="radio"
									id="moderate"
									name="severity"
									onChange={handleChange}
									value="moderate"
									checked={formData.severity === "moderate"}
									required
								/>
								<label
									htmlFor="no"
									className="mr-1 ml-1 font-bold text-yellow-500"
								>
									Moderate severity
								</label>
							</div>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="radio"
									id="low"
									name="severity"
									onChange={handleChange}
									value="low"
									checked={formData.severity === "low"}
									required
								/>
								<label
									htmlFor="don'tKnow"
									className="mr-1 ml-1 font-bold text-green-500"
								>
									Low severity
								</label>
							</div>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="name"
									className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Name
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										onChange={handleChange}
										value={formData.name}
										name="name"
										id="name"
										required
										placeholder="Case's Name"
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="age"
									className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Age
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										onChange={handleChange}
										value={formData.age}
										name="age"
										id="age"
										required
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className=" sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="certificate"
									className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Certificates
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										value={formData.certificate}
										onChange={handleChange}
										name="certificate"
										required
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										<option>Select here</option>
										<option>no education</option>
										<option>Grade 1-9</option>
										<option>Secondary</option>
										<option>Bachelors</option>
										<option>Technical School</option>
										<option>Masters Degree+</option>
									</select>
								</div>
							</div>
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="country"
									className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Country
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										value={formData.country}
										onChange={handleChange}
										name="country"
										required
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										<option hidden disabled>
											•Specify country•
										</option>
										;{nationalitiesMap}
									</select>
								</div>
							</div>
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="Address"
									className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Permanent address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										onChange={handleChange}
										value={formData.permenantAddress}
										name="permenantAddress"
										id="permenantAddress"
										required
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
										placeholder="City-street address"
									/>
								</div>
							</div>
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="Number"
									className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Permanent Number
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										onChange={handleChange}
										value={formData.permenantNumber}
										name="permenantNumber"
										id="permenantNumber"
										required
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
										placeholder="Number to reach the case"
									/>
								</div>
							</div>
							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="email"
									className="font-bold  font-bold lg:text-1.5xl"
								>
									Email address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="email"
										onChange={handleChange}
										value={formData.email}
										name="email"
										id="email"
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
										placeholder="(optional)"
									/>
								</div>
							</div>

							<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="message"
									className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Extra information on the exact location:
								</label>
								<textarea
									type="text"
									onChange={handleChange}
									value={formData.extraAddressInfo}
									name="extraAddressInfo"
									id="extraAddressInfo"
									required
									rows={4}
									className="max-w-xl h-40 box-content resize shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block w-full py-3 px-4 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
									placeholder="Please elaborate on how to get to you/the person you are helping."
								/>
							</div>
							<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
								<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="photo"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Please upload a profile photo of you/the person you are
										helping:
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
											<div className="space-y-1 text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-400"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 48 48"
													aria-hidden="true"
												>
													<path
														d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<div className="flex text-sm text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
													>
														<span>Upload a file</span>
														<input
															id="file-upload"
															name="file-upload"
															type="file"
															className="sr-only"
															required
														/>
													</label>
													<p className="pl-1">or drag and drop</p>
												</div>
												<p className="text-xs text-gray-500">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="pt-5">
					<div className="flex justify-center">
						<button
							type="submit"
							className="ml-3 inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							onClick={handleSubmit}
						>
							Submit
						</button>
						{/* <Pop /> */}
					</div>
				</div>
			</form>
		</div>
	);
};
export default HealthForm;
