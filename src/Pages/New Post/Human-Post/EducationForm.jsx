import Navbar from "../../../Components/Navbar";
import Nationalities from "../../../data/nationality";
import React, {useState} from "react";
import {EducationCases, storage} from "../../../firebase/config";
import {doc, setDoc, collection} from "firebase/firestore";
import LoadingPop from "../../Pops/LoadingPop";
import Footer from "../../../Components/Footer";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
const EducationForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		certificate: "",
		country: "",
		permenantAddress: "",
		permenantNumber: "",
		email: "",
		extraInfo: "",
		extraAddressInfo: "",
		files: "",
		severity: "",
		isAllowed: false,
		money: "",
		percentageCompleted: 0,
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
		await setDoc(doc(EducationCases), formData).catch(console.error);
	};

	const nationalitiesMap = Nationalities.map((nationality, index) => {
		return <option key={index}>{nationality.label}</option>;
	});
	const uploadFile = async (event) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		const storageRef = ref(storage, `images/${file.name}`);
		const metadata = {
			contentType: file.type,
		};
		await uploadBytes(storageRef, file, metadata);
		getDownloadURL(storageRef).then((res) => {
			setFormData((prevState) => ({
				...prevState,
				files: res,
			}));
		});
	};

	return (
		<div className="bg-[#3a3534]">
			<LoadingPop name="Education-Assistance" />
			<div className="">
				<div className="flex justify-center">
					<h2 className="animate-pulse text-2xl font-extrabold tracking-tight  text-[#F2B400] lg:text-2xl ">
						Case Information for{" "}
						<span className="text-red-500">Education Aid</span>
					</h2>

					<h4 className="mt-1 ml-2 max-w-2xl text-sm text-[#F2B400]">
						Please fill out this form that'll take you 5 minutes to do, so an
						organization(ex:NGOs) or someone can see your/the person you are
						helping case and fund your/their journy of learning. Note that this
						information will be displayed publicly
					</h4>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
						<div className=" bg-white m-4 relative rounded-lg border border-[#292524] bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-[#292524] ">
							<div className="flex-shrink-1">
								<div className="underline underline-offset-2 font-bold text-lg text-[#292524]">
									<span className="text-[#292524]">
										Case's personal information
									</span>
								</div>
								<div>
									<label
										htmlFor="name"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Name
									</label>
									<div className=" sm:mt-0 sm:col-span-2">
										<input
											type="text"
											onChange={handleChange}
											value={formData.name}
											name="name"
											id="name"
											required
											placeholder="Case's Name"
											autoComplete="nope"
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										/>
									</div>
								</div>

								{/* Element 2 */}
								<div className="sm:grid-cols-3 sm:gap-4  sm:pt-5">
									<label
										htmlFor="Age"
										className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Age
									</label>
									<div className="sm:mt-0 sm:col-span-2">
										<input
											type="text"
											autoComplete="nope"
											onChange={handleChange}
											value={formData.age}
											name="age"
											id="age"
											required
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										/>
									</div>
								</div>
								{/* Element 3 */}
								<div className="underline underline-offset-2 mt-4 font-bold text-lg text-[#292524]">
									Contact Information
								</div>
								<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
									<label
										htmlFor="email"
										className="font-bold  font-bold lg:text-1.5xl"
									>
										Email address
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="email"
											autoComplete="nope"
											onChange={handleChange}
											value={formData.email}
											name="email"
											id="email"
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
											placeholder="(optional)"
										/>
									</div>
								</div>

								{/* Element 4 */}
								<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
									<label
										htmlFor="Number"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Permanent Number
									</label>
									<div className="sm:mt-0 sm:col-span-2">
										<input
											type="text"
											autoComplete="nope"
											onChange={handleChange}
											value={formData.permenantNumber}
											name="permenantNumber"
											id="permenantNumber"
											required
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
											placeholder="Number to reach the case"
										/>
									</div>
								</div>
								{/* Element 5 */}
								<div>
									<label
										htmlFor="Country"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Country
									</label>
									<div className="mt-2 sm:mt-0 sm:col-span-2">
										<select
											value={formData.country}
											onChange={handleChange}
											name="country"
											required
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-[#292524] focus:border-[#292524] w-full shadow-sm sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										>
											<option hidden disabled>
												•Specify country•
											</option>
											{nationalitiesMap}
										</select>
									</div>
								</div>
								{/* Element 6 */}
								<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
									<label
										htmlFor="Address"
										className="font-bold  lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Permanent address
									</label>
									<div className=" sm:mt-0 sm:col-span-2">
										<input
											type="text"
											autoComplete="nope"
											onChange={handleChange}
											value={formData.permenantAddress}
											name="permenantAddress"
											id="permenantAddress"
											required
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
											placeholder="City-street address"
										/>
									</div>
								</div>

								{/* Element 7 */}
								<div className="mt-2 mb-2">
									<label
										htmlFor="extraAddressInfo"
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
										className="max-w-xl h-35 box-content resize shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block w-full py-3 px-4 placeholder-gray-400 focus:ring-[#292524] focus:border-[#292524] border border-[#292524] rounded-md"
										placeholder="Please elaborate on how to get to you/the person you are helping."
									/>
								</div>
							</div>
							<div className="flex-1 min-w-0"></div>
						</div>
						<div className=" bg-white m-4 relative rounded-lg border border-[#292524] bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-[#292524] ">
							<div className="flex-shrink-1">
								{/* Column 2 */}
								<div className="underline underline-offset-2 font-bold text-lg text-[#292524]">
									Case Details
								</div>
								<div className="mt-3 ">
									<label
										htmlFor="Case Severity"
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
											className="cursor-pointer"
										/>
										<label
											htmlFor="high"
											className="ml-2 font-bold text-red-500"
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
											className="cursor-pointer"
										/>
										<label
											htmlFor="moderate"
											className="ml-2 font-bold text-cyan-600"
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
											className="cursor-pointer"
										/>
										<label
											htmlFor="low"
											className="ml-2 font-bold text-green-500"
										>
											Low severity
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="name"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Case's Money Estimitation($)
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="text"
											onChange={handleChange}
											value={formData.money}
											name="money"
											id="money"
											required
											placeholder="Amount - /Period(/month)"
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										/>
									</div>
								</div>
								{/* Element 2 */}
								<div>
									<label
										htmlFor="Certificates"
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
											className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-[#292524] focus:border-[#292524] w-full shadow-sm sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										>
											<option>Select here</option>
											<option>No education</option>
											<option>Grade 1-9</option>
											<option>Secondary</option>
											<option>Bachelors</option>
											<option>Technical School</option>
											<option>Masters Degree+</option>
										</select>
									</div>
								</div>
								{/* Element 3 */}
								<div className="rows-1">
									<div className="sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
										<div>
											<label
												htmlFor="message"
												className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
											>
												Information about the case:
											</label>
											<textarea
												type="text"
												onChange={handleChange}
												value={formData.extraInfo}
												name="extraInfo"
												id="extraInfo"
												required
												rows={4}
												className="max-w-xl h-40 box-content resize shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block w-full py-3 px-4 placeholder-gray-400 focus:ring-[#292524] focus:border-[#292524] border border-[#292524] rounded-md"
												placeholder="Please elaborate on what type of help do you/the person you are helping need to continue your/their education."
											/>
										</div>
									</div>
								</div>
								{/* Element 3 */}
								<div className="mt-4">
									<label
										htmlFor="photo"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Please upload a photo of the animal:
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
															onChange={uploadFile}
															className="sr-only"
															required
															accept="image/png,image/jpeg,image/webp"
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

								{/* Element 5 */}
								<div className="mt-8 flex justify-center">
									<button
										type="submit"
										className="text-[#F2B400] ml-3 inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#292524] hover:bg-[#3a3534] focus:outline-none focus:ring-2  focus:ring-[#292524]"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default EducationForm;
