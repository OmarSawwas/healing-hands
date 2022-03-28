import React, {useState, useEffect} from "react";
import {CheckIcon, XIcon} from "@heroicons/react/outline";
import {PencilIcon, CheckCircleIcon} from "@heroicons/react/solid";
import Navbar from "../../Components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "../../Components/Wrapper";
import {db} from "../../firebase/config";
import {doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import RejectPop from "./Pops/reject";
import AllowPop from "./Pops/allow";
const AnimalFormDetail = (props) => {
	const {user, userId} = props;
	const {id} = useParams();
	const [propOpen, setPropOpen] = useState(false);
	const [allowpropOpen, setallowPropOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [percentage, setPercentage] = useState();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const docRef = doc(db, "AnimalCases", id);
	const fetchData = async () => {
		setLoading(true);

		const animalsData = await getDoc(docRef);
		// if (!animalsData.exists()) {
		// 	navigate("/404");
		// }

		setData(animalsData.data());
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
		return () => fetchData();
	}, []);

	const allowClick = async () => {
		setallowPropOpen(true);
	};
	const rejectClick = async () => {
		setPropOpen(true);
	};
	const colorizer = () => {
		if (data.severity === "high") {
			return "bg-red-400 font-bold";
		} else if (data.severity === "moderate") {
			return "bg-orange-400 font-bold";
		} else {
			return "bg-green-400 font-bold";
		}
	};
	const handleChange = (e) => {
		const {value} = e.target;
		setPercentage(value);
	};
	const handleToggleEditMode = () => {
		setEditMode(true);
	};

	const submitPercentage = async () => {
		if (percentage > 0 && percentage < 100) {
			const upDate = async () => {
				if (id) {
					const docRef = doc(db, "AnimalCases", id);
					await updateDoc(docRef, {percentageCompleted: percentage});
				}
			};

			upDate();
		}
		setEditMode(false);
	};
	return (
		<div className="bg-[#3a3534]">
			<Wrapper loading={loading}>
				<RejectPop
					docRef={docRef}
					setPropOpen={setPropOpen}
					propOpen={propOpen}
				/>
				<AllowPop
					docRef={docRef}
					setPropOpen={setallowPropOpen}
					propOpen={allowpropOpen}
				/>
				<div className=" shadow overflow-hidden sm:rounded-lg  mx-8 p-6 flex justify-center">
					<div className="border-t border-gray-200   ">
						<div className=" bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 ">
							<div>
								<img
									className=" mx-auto h-36 w-36 rounded-full xl:w-56 xl:h-56 hover:w-72 hover:h-72 transition-all"
									src={data.files}
									alt=""
								/>
							</div>
							<div className="flex justify-center font-bold">
								Percentage Completed
							</div>
							{!editMode && (
								<div className="flex bg-white border-2 rounded-full">
									<div
										className=" h-5 flex justify-center text-white font-bold bg-[#04AA7D] items-center rounded-full"
										style={{width: `${data.percentageCompleted}%`}}
									>
										{" "}
										{`${data.percentageCompleted} %`}
									</div>{" "}
									{user && user.isAdmin && (
										<PencilIcon
											className="ml-2 w-5 h-5 hover:text-[#f2b400]"
											onClick={handleToggleEditMode}
										/>
									)}
								</div>
							)}
							{editMode && (
								<div className="flex  mt-2">
									<input
										type="text"
										onChange={handleChange}
										value={percentage}
										name="percentage"
										id="percentage"
										min={1}
										max={100}
										required
										placeholder="1-100"
										className=" ml-2 box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-[#f2b400] focus:border-[#f2b400] sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
									<button onClick={submitPercentage}>
										<CheckCircleIcon className="w-5 h-5 text-green-600" />
									</button>
								</div>
							)}
							<div>
								<div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 ">
									<div className="text-sm font-medium text-gray-500">
										Severity:
									</div>

									<div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										<span className={`rounded-lg  ${colorizer()} px-2`}>
											{data.severity}
										</span>
									</div>
								</div>

								<div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Type:</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.type}
									</dd>
								</div>
								<div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Email:</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.Email}
									</dd>
								</div>
								<div className=" bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Permenant Number:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.permenantNumber}
									</dd>
								</div>
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Country:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.country}
									</dd>
								</div>

								<div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Location:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.Location}
									</dd>
								</div>

								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Exact location:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.addressInfo}
									</dd>
								</div>

								<div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Environment Raised In:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.raisedEnvironment}
									</dd>
								</div>
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Vaccinated?
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.isVaccinated}
									</dd>
								</div>
								<div className="bg-gray-100  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Money need:
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{data.money}
									</dd>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* For Admins Only */}
				{user && user.isAdmin && !data.isAllowed && (
					<div className=" flex divide-x divide-gray-200 text-white mt-4  rounded-b-lg ">
						<div className="mb-2 w-0 flex-1 flex justify-center">
							<button
								type="button"
								className="font-bold inline-flex items-center p-4 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								onClick={rejectClick}
							>
								Reject
								<XIcon className="ml-2 h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mb-2 w-0 flex-1 flex justify-center">
							<button
								type="button"
								className="	lg:animate-bounce md:animate-bounce font-bold inline-flex items-center p-4 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								onClick={allowClick}
							>
								Allow
								<CheckIcon className="ml-2 h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</Wrapper>
		</div>
	);
};
export default AnimalFormDetail;
