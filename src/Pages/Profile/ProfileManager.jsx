import {
	PencilIcon,
	AtSymbolIcon,
	PhoneIcon,
	IdentificationIcon,
	LocationMarkerIcon,
	BriefcaseIcon,
	FlagIcon,
} from "@heroicons/react/solid";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Sidebar from "../../Components/Layouts/admin.sidebar";
import Wrapper from "../../Components/Wrapper";
import {db, auth, storage} from "../../firebase/config";
import Nationalities from "../../data/nationality";
import useAuth from "../../hooks/useAuth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
const statusStyles = {
	success: "bg-green-100 text-green-800",
	processing: "bg-yellow-100 text-yellow-800",
	failed: "bg-gray-100 text-gray-800",
};

const Manager = () => {
	// const {currentUser} = auth;

	useAuth();

	const [data, setData] = useState({
		email: "",
		age: 1,
		address: "",
		work: "",
		phone: "",
		phoneCode: "",
		isAdmin: false,
		isLoggedIn: false,
		country: "",
		fName: "",
		lName: "",
		image: "",
	});
	const nationalitiesCountryMap = Nationalities.map((item, index) => {
		return (
			<option value={item.label} key={index}>
				{item.label}
			</option>
		);
	});
	const {id} = useParams();
	const [loading, setLoading] = useState(false);
	const profileRef = doc(db, "Users", id);

	const getProfileData = async () => {
		setLoading(true);
		await onSnapshot(profileRef, (document) => {
			const {
				fName,
				lName,
				email,
				age,
				phone,
				phoneCode,
				work,
				address,
				isAdmin,
				image,
				country,
			} = document.data();
			setData((prevState) => ({
				...prevState,
				fName,
				lName,
				email,
				age,
				phone,
				phoneCode,
				work,
				address,
				isAdmin,
				image,
				country,
			}));
			setLoading(false);
		});
	};

	useEffect(() => {
		getProfileData();

		return () => getProfileData();
	}, [id]);
	// EditMode boolean for icons and tag changing
	const [editMode, setEditMode] = useState(false);

	// Value Change
	const handleChange = (e) => {
		const {id, value} = e.target;
		if (id === "fName" || "lName") {
			setData((prevState) => ({
				...prevState,
				[id]: `${value.charAt(0).toUpperCase() + value.slice(1)}`,
			}));
		} else {
			setData((prevState) => ({
				...prevState,
				[id]: value,
			}));
		}
	};
	const changeImage = async (event) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		const storageRef = ref(storage, `images/${file.name}`);
		const metadata = {
			contentType: file.type,
		};

		await uploadBytes(storageRef, file, metadata);
		getDownloadURL(storageRef).then(async (res) => {
			await updateDoc(profileRef, {image: res});
		});
	};
	const handleToggleEditMode = () => {
		setEditMode((prevState) => !prevState);
	};
	const nationalitiesMap = Nationalities.map((nationality, index) => {
		return <option key={index}>{nationality.code}</option>;
	});
	const handleSubmit = async () => {
		setLoading(true);
		await updateDoc(profileRef, data);
		setEditMode(false);
		setLoading(false);
	};
	return (
		<Sidebar>
			<Wrapper loading={loading}>
				<div className="border-1 border-gray-500 w-full flex items-center relative">
					<div>
						<div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
							<div className="mt-1 lg:hidden">
								<div className="flex items-center">
									<div
										className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
										aria-hidden="true"
									>
										<img
											className="rounded-full w-36 h-36 border-2"
											src={data.image}
											alt=""
										/>
									</div>
									<div className="ml-5 rounded-md shadow-sm">
										<div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
											<label
												htmlFor="mobile-user-photo"
												className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
											>
												<span className="font-bold">Change</span>
												<span className="sr-only"> user photo</span>
											</label>
											<input
												id="mobile-user-photo"
												name="user-photo"
												type="file"
												onChange={changeImage}
												className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="hidden relative rounded-full overflow-hidden lg:block">
								<img
									className="relative rounded-full w-36 h-36 border-2"
									src={data.image}
									alt=""
								/>
								<label
									htmlFor="desktop-user-photo"
									className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
								>
									<span className="font-bold">Change</span>
									<span className="sr-only"> user photo</span>

									<input
										htmlFor="desktop-user-photo"
										name="user-photo"
										type="file"
										onChange={changeImage}
										className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
									/>
								</label>
							</div>
						</div>
					</div>
					<div className="">
						{!editMode ? (
							<div className="flex ">
								<h1 className="ml-5 text-2xl font-bold leading-7 text-gray-200 sm:leading-9 sm:truncate justify-center">
									{data.fName}
								</h1>
								<h1 className="ml-2 text-2xl font-bold leading-7 text-gray-200 sm:leading-9 sm:truncate justify-center">
									{data.lName}
								</h1>
							</div>
						) : (
							<div className="flex">
								<input
									type="text"
									onChange={handleChange}
									value={data.fName}
									name="fName"
									id="fName"
									required
									placeholder="FirstName here... "
									className=" ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
								/>
								<input
									type="text"
									onChange={handleChange}
									value={data.lName}
									name="lName"
									id="lName"
									required
									placeholder="LastName here... "
									className="ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						)}
						{data.isAdmin && (
							<div className="flex items-center ml-4 mt-2">
								<CheckCircleIcon className="h-6 w-6 text-green-500" />
								<p className="text-md p-0 ml-2 mb-0 text-gray-200">
									Administrator
								</p>
							</div>
						)}
					</div>
					<div className="flex items-center justify-between absolute top-0 right-0 ">
						<button
							onClick={handleSubmit}
							type="button"
							className="w-24 bg-[#f2b400] hover:bg-[#ecc242]   mx-4 py-4 px-4 inline-flex items-center px-4 py-1.5 border border-transparent text-s font-medium rounded shadow-sm text-white "
						>
							Submit
						</button>
						<button
							onClick={handleToggleEditMode}
							type="button"
							className="w-24 bg-[#f2b400] hover:bg-[#ecc242]  mx-6  mx-2 inline-flex items-center px-4 py-1.5 border border-transparent text-s font-medium rounded shadow-sm text-white  "
						>
							<PencilIcon className="h-4 w-4" />
							Edit
						</button>
					</div>
				</div>

				<div className="mt-16 mb-32 ">
					{/* Element 1 */}
					<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
						<div className=" flex col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-2 pb-1 w-64  hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<IdentificationIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-12">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label htmlFor="age" className="flex ml-2 justify-center">
												Age
											</label>
										</div>
										<div className="ml-4">
											<p className="text-s font-small text-gray-200 p-0 m-0">
												{data.age} years
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<IdentificationIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label htmlFor="age" className="flex ml-2 justify-center">
												Age
											</label>
										</div>
										<div className="ml-2  mb-2">
											<input
												type="text"
												onChange={handleChange}
												value={data.age}
												name="age"
												id="age"
												required
												placeholder={data.age}
												className=" ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Element 2 */}
						<div className="col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-1 pb-1 w-64  hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<AtSymbolIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-4 ">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label htmlFor="email" className="flex  justify-center">
												Email
											</label>
										</div>
										<div className="ml-1">
											<p className="text-s font-small text-gray-200 p-0 m-0">
												{data.email}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<AtSymbolIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 ">
											<label
												htmlFor="email"
												className="flex ml-2 justify-center"
											>
												Email
											</label>
										</div>
										<div className="ml-2  mb-2">
											<input
												type="email"
												onChange={handleChange}
												value={data.email}
												name="email"
												id="email"
												required
												placeholder="Someone@somthing.com... "
												className=" box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-[#f2d17c sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Element 3 */}
						<div className=" flex col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-1 pb-1 w-64 hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<FlagIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-16 ">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label htmlFor="work" className="flex  justify-center">
												Country
											</label>
										</div>
										<div className="ml-2">
											<p className="text-m font-small text-gray-200 p-0 m-0">
												{data.country}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-2 hover:border-gray-900  shadow-xl ">
									<div className="flex items-center">
										<FlagIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="country"
												className="flex ml-2 justify-center"
											>
												Country
											</label>
										</div>
										<div className="ml-2  mb-2">
											<div>
												<label
													htmlFor="country"
													className="font-bold lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600"
												>
													Country
												</label>
												<div className="mt-2 sm:mt-0 sm:col-span-2">
													<select
														id="country"
														value={data.country}
														onChange={handleChange}
														name="country"
														required
														className="col-span-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block  focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md "
													>
														<option hidden disabled>
															•Specify country•
														</option>
														{nationalitiesCountryMap}
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					{/* Element 4 */}
					<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
						<div className=" flex col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-1 pb-1 w-64  hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<BriefcaseIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-16 ">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="work"
												className="flex ml-2 justify-center"
											>
												Work
											</label>
										</div>
										<div className="ml-4">
											<p className="text-m font-small text-gray-200 p-0 m-0">
												{data.work}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-2 hover:border-red-300  shadow-xl ">
									<div className="flex items-center">
										<BriefcaseIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="email"
												className="flex ml-2 justify-center"
											>
												Work
											</label>
										</div>
										<div className="ml-2  mb-2">
											<input
												type="text"
												onChange={handleChange}
												value={data.work}
												name="work"
												id="work"
												required
												placeholder={"Beverely hills 29, 13B"}
												className=" ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className=" flex col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-1 pb-1 w-64  hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<PhoneIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-8 ">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="phone"
												className="flex ml-2 justify-center"
											>
												Phone
											</label>
										</div>
										<div className="ml-2">
											<p className="text-m font-small text-gray-200 p-0 m-0">
												+{data.phoneCode}-{data.phone}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<PhoneIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="phone"
												className="flex ml-2 justify-center"
											>
												Phone
											</label>
										</div>
										<div className="ml-4  mb-2">
											<div className="mt-1 grid grid-cols-4 gap-1">
												<select
													id="phoneCode"
													value={data.phoneCode}
													onChange={handleChange}
													name="phoneCode"
													required
													className="col-span-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block  focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md "
												>
													<option hidden disabled>
														•Specify country•
													</option>
													{nationalitiesMap}
												</select>

												<input
													type="text"
													onChange={handleChange}
													value={data.phone}
													name="phone"
													id="phone"
													required
													placeholder={"000 00 00"}
													className="col-span-2 ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						{/* Element 5 */}
						<div className=" flex col-span-1">
							{!editMode ? (
								<div className="flex items-center rounded-lg border-2 px-1 pb-1 w-64  hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<LocationMarkerIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div className="ml-12">
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label htmlFor="age" className="flex ml-2 justify-center">
												Address
											</label>
										</div>
										<div className="ml-3">
											<p className="text-m font-small text-gray-200 p-0 m-0">
												{data.address}
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-center rounded-lg border-2 p-2 w-64 hover:border-[#e6ad1c]  shadow-xl ">
									<div className="flex items-center">
										<LocationMarkerIcon className="h-6 w-6 ml-1 text-[#f2b400]" />
									</div>
									<div>
										<div className="text-lg font-medium text-gray-100 p-0 m-0">
											<label
												htmlFor="address"
												className="flex ml-2 justify-center"
											>
												Address
											</label>
										</div>
										<div className="ml-2  mb-2">
											<input
												type="text"
												onChange={handleChange}
												value={data.address}
												name="address"
												id="address"
												required
												placeholder={"Beverely hills 29, 13B"}
												className=" ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm  focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Wrapper>
		</Sidebar>
	);
};
export default Manager;
