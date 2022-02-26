import Navbar from "../../Components/Navbar";
import {useState} from "react";
import Nationalities from "../../data/nationality";
import {checkBoxes, learning, form} from "../../data/NewPost";
export default function Example() {
	const [formData, setFormData] = useState({
		Work: false,
		Education: false,
		Health: true,
		Name: "",
		Age: "",
		Number: "",
		Address: "",
		Email: "",
	});
	const Changed = (event) => {
		const {name, value, type, checked} = event.target;
		setFormData((prevState) => {
			return {
				...prevState,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	};
	// Mapping of nationalities

	const nationalitiesMap = Nationalities.map((nationality) => {
		return (
			<option>
				+{nationality.checked}-{nationality.label}
			</option>
		);
	});
	// Mapping of options for learning
	const certificates = learning.map((certificate) => {
		return <option>{certificate.level}</option>;
	});
	//  Mapping of inputs

	const mappedCheckBoxes = checkBoxes.map((item) => {
		return (
			<div>
				<label htmlFor="Address" className="lg:text-1.5xl ">
					{item.name}
				</label>
				<div className="mt-1 sm:mt-0 sm:col-span-2">
					<input
						type={item.type}
						name={item.name.toLowerCase()}
						placeholder={item.placeholder}
						className={item.class}
						onChange={Changed}
						// value={formData.`${item.name}`}
					/>
				</div>
			</div>
		);
	});

	//Mapped input in form
	const mapped = form.map((item) => {
		return (
			<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
				<label htmlFor="Address" className={item.labelClass}>
					{item.name}
				</label>
				<div className="mt-1 sm:mt-0 sm:col-span-2">
					<input
						type={item.type}
						name={item.name}
						placeholder={item.placeholder}
						className={item.class}
						// checked={formData.{item.name}}
					/>
				</div>
			</div>
		);
	});
	return (
		<div>
			<Navbar />
			<form className="space-y-8 divide-y divide-gray-200">
				<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 ml-8">
					<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Case Information
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Note that this information will be displayed publicly
							</p>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								{mappedCheckBoxes}
							</div>
							{mapped}
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="certificate"
									className="lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Certificates
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										id="certificate"
										name="certificate"
										autoComplete="certificate"
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										{certificates}
									</select>
								</div>
							</div>
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="country"
									className="lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
								>
									Country
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										id="country"
										name="country"
										autoComplete="country-name"
										className="shadow-lg	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										{nationalitiesMap}
									</select>
								</div>
							</div>
							<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
								<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="photo"
										className="lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
									>
										Photo
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

				<div className="pt-5 mr-6">
					<div className="flex justify-center">
						<button
							type="submit"
							className="mb-5 inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
