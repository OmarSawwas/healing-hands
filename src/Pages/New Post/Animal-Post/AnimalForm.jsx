import Navbar from "../../../Components/Navbar";
import Nationalities from "../../../data/nationality";
import React, {useState} from "react";
import LoadingPop from "../../Pops/LoadingPop";
import {
	animalFormData,
	db as FireStore,
	storage,
} from "../../../firebase/config";
import {doc, setDoc, collection} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import SuccessfullPop from "../../Pops/SuccesfulSubmit";
const AnimalForm = () => {
	const [propOpen, setPropOpen] = useState(false);
	const [formData, setFormData] = useState({
		type: "",
		age: "",
		raisedEnvironment: "",
		isVaccinated: "",
		country: "",
		Location: "",
		permenantNumber: "",
		addressInfo: "",
		files: "",
		severity: "",
		isAllowed: false,
		money: "",
		percentageCompleted: 0,
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
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await setDoc(doc(animalFormData), formData).catch(console.error);
		setPropOpen(true);
	};

	const nationalitiesMap = Nationalities.map((item, index) => {
		return (
			<option value={item.label} key={index}>
				{item.label}
			</option>
		);
	});

	return (
		<div className="bg-[#3a3534]">
			<LoadingPop name="Animal Care" />
			<SuccessfullPop setPropOpen={setPropOpen} propOpen={propOpen} />
			<div>
				<div className="flex justify-center">
					<h2 className="animate-pulse text-2xl font-extrabold tracking-tight  text-[#F2B400] lg:text-2xl ">
						Case Information for{" "}
						<span className="text-red-500">Animal Care</span>
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
						<div className=" m-8 relative rounded-lg border lg:pl-20 border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
							<div className="flex-shrink-1  ">
								<div>
									<label
										htmlFor="name"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Type of Animal:
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="text"
											onChange={handleChange}
											value={formData.type}
											name="type"
											id="type"
											required
											placeholder="example: Cat,Dog,Turtle,etc..."
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										/>
									</div>
								</div>

								{/* Element 2 */}
								<div>
									<div>
										<label
											htmlFor="Enviroment"
											className="lg:text-1.5xl after:content-['*'] after:ml-1 font-bold  after:text-red-600"
										>
											Case's Age (roughly estimate if you dont know)?
										</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<input
												type="radio"
												id="1-2 years"
												name="age"
												onChange={handleChange}
												value="1-2 years"
												checked={formData.age === "1-2 years"}
												required
											/>
											<label htmlFor="1-2 years" className="mr-1 ml-1 ">
												1-2 years
											</label>
										</div>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<input
												type="radio"
												id="2-5 years"
												name="age"
												onChange={handleChange}
												value="2-5 years"
												checked={formData.age === "2-5 years"}
												required
											/>
											<label htmlFor="2-5 years" className="mr-1 ml-1 ">
												2-5 years
											</label>
										</div>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<input
												type="radio"
												id="5-10 years"
												name="age"
												onChange={handleChange}
												value="5-10 years"
												checked={formData.age === "5-10 years"}
												required
											/>
											<label htmlFor="5-10 years" className="mr-1 ml-1 ">
												5-10 years
											</label>
										</div>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<input
												type="radio"
												id="10+ years"
												name="age"
												onChange={handleChange}
												value="10+ years"
												checked={formData.age === "10+ years"}
												required
											/>
											<label htmlFor="10+ years" className="mr-1 ml-1">
												10+ years
											</label>
										</div>
									</div>
								</div>

								{/* Element 3 */}

								<div>
									<label
										htmlFor="Enviroment"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Enviroment raised:
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="radio"
											id="Home animal"
											name="raisedEnvironment"
											onChange={handleChange}
											value="Home animal"
											checked={formData.raisedEnvironment === "Home animal"}
											required
										/>
										<label htmlFor="Home animal" className="mr-1">
											Home animal
										</label>
									</div>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="radio"
											id="Street animal"
											name="raisedEnvironment"
											onChange={handleChange}
											value="Street animal"
											checked={formData.raisedEnvironment === "Street animal"}
											required
										/>
										<label htmlFor="Street animal" className="mr-1">
											Street animal
										</label>
									</div>
								</div>

								{/* Element 4 */}
								<div>
									<label
										htmlFor="Enviroment"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Vaccinated?
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="radio"
											id="Yes"
											name="isVaccinated"
											onChange={handleChange}
											value="Yes"
											checked={formData.isVaccinated === "Yes"}
											required
										/>
										<label htmlFor="Yes" className="mr-1">
											Yes
										</label>
									</div>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="radio"
											id="No"
											name="isVaccinated"
											onChange={handleChange}
											value="No"
											checked={formData.isVaccinated === "No"}
											required
										/>
										<label htmlFor="No" className="mr-1">
											no
										</label>
									</div>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="radio"
											id="Don't know"
											name="isVaccinated"
											onChange={handleChange}
											value="Don't know"
											checked={formData.isVaccinated === "Don't know"}
											required
										/>
										<label htmlFor="Don't know" className="mr-1">
											Don't know
										</label>
									</div>
								</div>
								{/* Element 5 */}
								<div>
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
											placeholder="Number to reach the case"
											required
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										/>
									</div>
								</div>
								{/* Element 6 */}
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
											;{nationalitiesMap}
										</select>
									</div>
								</div>
								{/* Element 7 */}
								<div>
									<label
										htmlFor="Location"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Location:
									</label>
									<div className="mt-1 sm:mt-0 sm:col-span-2">
										<input
											type="text"
											onChange={handleChange}
											value={formData.Location}
											name="Location"
											id="Location"
											placeholder="Home animal(put your address) or put where you last saw it"
											required
											className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#292524] focus:border-[#292524] sm:text-xs border-[#292524] rounded-md"
										/>
									</div>
								</div>

								<div className="mt-2 mb-2">
									<label
										htmlFor="addressInfo"
										className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Extra information on the exact location:
									</label>
									<textarea
										type="text"
										autoComplete="none"
										onChange={handleChange}
										value={formData.addressInfo}
										name="addressInfo"
										id="addressInfo"
										required
										rows={3}
										className="w-60 h-35 box-content resize shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block  py-3 px-4 placeholder-gray-400 focus:ring-[#292524] focus:border-[#292524] border border-[#292524] rounded-md"
										placeholder="Please elaborate on how to get to you/the person you are helping."
									/>
								</div>
							</div>
						</div>
						<div className=" m-8 lg:pl-20 relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
									<div>
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
								{/* Money */}
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
								{/* Element 2*/}

								<div>
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
											rows={3}
											className="w-60 h-40 box-content resize shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) placeholder:italic  block  py-3 px-4 placeholder-gray-400 focus:ring-[#292524] focus:border-[#292524] border border-[#292524] rounded-md"
											placeholder="Please elaborate on what type of help do you/the person you are helping need to continue your/their education."
										/>
									</div>
								</div>

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
								{/* Element 4 */}
								<div className="mt-8 flex justify-center">
									<button
										type="submit"
										className="text-[#F2B400] ml-3 inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#292524] hover:bg-[#3a3534] focus:outline-none focus:ring-2  focus:ring-[#292524]"
										onSubmit={handleSubmit}
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

export default AnimalForm;
