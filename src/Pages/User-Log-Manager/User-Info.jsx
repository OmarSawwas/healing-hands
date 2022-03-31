import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import React, {useState} from "react";
import Nationalities from "../../data/nationality";
import {Users, auth, storage} from "../../firebase/config";
import ErrorToast from "../../Components/ErrorToast";
import {useLogin} from "../../firebase/User-log-Manager/useSign";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
const nationalitiesMap = Nationalities.map((nationality, index) => {
	return <option key={index}>{nationality.code}</option>;
});
const countries = Nationalities.map((nationality, index) => {
	return <option key={index}>{nationality.label}</option>;
});
const UserInfo = (props) => {
	const {error, login} = useLogin();
	const {userData, setUserData} = props;
	const handleChange = (event) => {
		setUserData((prevState) => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const {password, ...rest} = userData;
		createUserWithEmailAndPassword(auth, userData.email, userData.password)
			.then(async ({user}) => {
				if (user) {
					await setDoc(doc(Users, `${user.uid}`), rest);
					login(userData.email, userData.password);
				}
			})
			.catch((err) => {
				switch (err.message) {
					case "Firebase: Error (auth/email-already-in-use).":
						setErrorMessage("Email already in use");
						setShowError(true);
						break;

					default:
						setErrorMessage("Something went wrong please try again");
						setShowError(true);
						break;
				}

				//
				console.log(err.message);
			});
	};
	const [imageUpload, setImageUpload] = useState(false);
	const uploadFile = async (event) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		const storageRef = ref(storage, `images/${file.name}`);
		const metadata = {
			contentType: file.type,
		};
		await uploadBytes(storageRef, file, metadata);
		await getDownloadURL(storageRef).then((res) => {
			setUserData((prevState) => ({
				...prevState,
				image: res,
			}));
		});
		setImageUpload(true);
	};

	return (
		<div className="bg-[#3a3534]">
			<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<div className="flex justify-center"></div>

					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
						Fill here your{" "}
						<span className="font-extrabold underline">Personal</span>{" "}
						Information
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" action="#" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="fName"
									className="block text-sm font-medium text-gray-700"
								>
									First Name
								</label>
								<div className="mt-1">
									<input
										required
										placeholder="First Name"
										type="text"
										id="fName"
										autoComplete="off"
										value={userData.fName}
										onChange={handleChange}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Last Name
								</label>
								<div className="mt-1">
									<input
										required
										placeholder="Last Name"
										type="text"
										autoComplete="off"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
										id="lName"
										value={userData.lName}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="age"
									className="block text-sm font-medium text-gray-700"
								>
									Age
								</label>
								<div className="mt-1">
									<input
										required
										type="text"
										placeholder="age"
										autoComplete="off"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
										id="age"
										value={userData.age}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="phoneCode"
									className="block text-sm font-medium text-gray-700"
								>
									Phone Number
								</label>
								<div className="mt-1 grid grid-cols-4 gap-2">
									<select
										id="phoneCode"
										value={userData.phoneCode}
										onChange={handleChange}
										name="phoneCode"
										required
										autoComplete="nope"
										className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-[#f2b400] focus:border-[#f2b400] w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md  col-span-1"
									>
										<option defaultChecked hidden className="text-gray-400">
											••Specify a Country••
										</option>
										{nationalitiesMap}
									</select>

									<input
										required
										id="phone"
										placeholder="XX XXXXXX"
										type="text"
										onChange={handleChange}
										value={userData.phone}
										autoComplete="off"
										className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm col-span-3"
									/>
								</div>
							</div>
							<div className="w-full">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									Country
								</label>
								<div className="mt-1">
									<select
										id="country"
										value={userData.country}
										onChange={handleChange}
										name="country"
										required
										className="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg  focus:ring-[#f2b400]  focus:border-[#f2b400]  w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
									>
										<option defaultChecked hidden className="text-gray-400">
											••Specify a Country••
										</option>
										{countries}
									</select>
								</div>
							</div>
							<div>
								<label
									htmlFor="address"
									className="block text-sm font-medium text-gray-700"
								>
									Address
								</label>
								<div className="mt-1">
									<input
										required
										type="text"
										autoComplete="off"
										value={userData.address}
										onChange={handleChange}
										id="address"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="work"
									className="block text-sm font-medium text-gray-700"
								>
									Work
								</label>
								<div className="mt-1">
									<input
										required
										type="text"
										autoComplete="off"
										id="work"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm"
										onChange={handleChange}
										value={userData.work}
									/>
								</div>
							</div>
							<div className="mt-4">
								<label
									htmlFor="photo"
									className="block text-sm font-medium text-gray-700"
								>
									Profile image:
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
														autoComplete="off"
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
							<div>
								<button
									type="button"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={props.prev}
								>
									Previous
								</button>
							</div>
							{imageUpload && (
								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
									>
										Sign Up
									</button>
								</div>
							)}
							{!imageUpload && (
								<div>
									<button
										type="button"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-[#292524] font-bold bg-[#8f8b7e]"
									>
										Sign Up
									</button>
								</div>
							)}
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
			<ErrorToast
				show={showError}
				setShow={setShowError}
				title="Failed to sign-up!"
				message={errorMessage}
			/>
		</div>
	);
};

export default UserInfo;
