import {
	PaperClipIcon,
	XCircleIcon,
	PencilIcon,
	ClockIcon,
} from "@heroicons/react/solid";
import Pops from "../../Components/Pops";
import {updateDoc, doc, getDoc} from "firebase/firestore";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {db} from "../../firebase/config";
import React, {useState, useEffect} from "react";
const AnimalCard = (props) => {
	const [propOpen, setPropOpen] = useState(false);
	const {
		Severity,
		Type,
		Age,
		Environment,
		Vaccinated,
		Country,
		Money,
		Id,
		PercentageCompleted,
		user,
		userId,
		post,
	} = props;
	const [interested, setInterested] = useState(false);
	const colorizer = () => {
		if (Severity === "high") {
			return "bg-red-400 font-bold";
		} else if (Severity === "moderate") {
			return "bg-orange-400 font-bold";
		} else {
			return "bg-green-400 font-bold";
		}
	};

	//
	// Percentage edit
	//
	const [editMode, setEditMode] = useState(false);
	const [percentage, setPercentage] = useState();
	const docRef = doc(db, "AnimalCases", Id);
	// Interested Content

	// const interestedClick = async () => {
	// 	if (interested) {
	// 		const filteredPosts = user.favoritePosts.filter((item) => item !== Id);
	// 		await updateDoc(userDocRef, {favoritePosts: filteredPosts});
	// 	} else {
	// 		const newFavoritePosts = [...user.favoritePosts, Id];
	// 		await updateDoc(userDocRef, {favoritePosts: newFavoritePosts});
	// 	}
	// };
	const handleToggleEditMode = () => {
		setEditMode(true);
	};

	const handleChange = (e) => {
		const {value} = e.target;
		setPercentage(value);
	};
	useEffect(() => {
		if (user) {
			setInterested(user.favoritePosts.animalPosts.find((item) => item === Id));
		}
	}, [post, user]);
	// Interested Content

	const interestedClick = async () => {
		if (user) {
			const userDocRef = doc(db, "Users", userId);

			if (interested) {
				const filteredPosts = user.favoritePosts.animalPosts.filter(
					(item) => item !== Id
				);
				await updateDoc(userDocRef, {
					favoritePosts: {
						...user.favoritePosts,
						animalPosts: filteredPosts,
					},
				});
			} else {
				const newFavoritePosts = [...user.favoritePosts.animalPosts, Id];
				await updateDoc(userDocRef, {
					favoritePosts: {
						...user.favoritePosts,
						animalPosts: newFavoritePosts,
					},
				});
			}
		}
	};

	const submitPercentage = async () => {
		if (percentage > 0 && percentage < 100) {
			const upDate = async () => {
				if (Id) {
					await updateDoc(docRef, {percentageCompleted: percentage});
				}
			};

			upDate();
		}
		setEditMode(false);
	};

	const deletePost = async () => {
		setPropOpen(true);
	};
	return (
		<div>
			<Pops docRef={docRef} setPropOpen={setPropOpen} propOpen={propOpen} />
			{user && user.isAdmin && (
				<div className="flex justify-end" onClick={deletePost}>
					<button id="about" value="about">
						<XCircleIcon
							className="flex-shrink-0  h-8 w-8  text-red-500 hover:text-sky-500"
							aria-hidden="true"
						/>
					</button>{" "}
				</div>
			)}

			<div className="bg-white  overflow-hidden sm:rounded-lg border ">
				<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl className="sm:divide-y sm:divide-gray-200">
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500 ">Severity:</dt>
							<dd className="flex  justify-end mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
								<span className={`rounded-lg  ${colorizer()} px-2`}>
									{Severity}
								</span>
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500 ">Type:</dt>
							<dd className="flex  justify-end mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
								{Type}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Age:</dt>
							<dd className="flex  justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{Age}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">
								Environement:
							</dt>
							<dd className=" flex  justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{Environment}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Vaccinated:</dt>
							<dd className="flex  justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{Vaccinated}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Country:</dt>
							<dd className="flex  justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{Country}
							</dd>
						</div>
						<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Money Need:</dt>
							<dd className="flex  justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{Money}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			{/* Heart Icon */}
			{!user ? null : interested ? (
				<div
					className="flex justify-center cursor-pointer mb-2 duration-500 ease-in-out"
					onClick={interestedClick}
					id={Id}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 text-red-600 hover:text-red-700 "
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			) : (
				<div
					className="flex justify-center cursor-pointer mb-2 duration-500 ease-in-out"
					onClick={interestedClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 text-red-600 hover:text-red-700 "
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
			)}
			{!editMode && (
				<div className="flex bg-white border-2 rounded-full">
					<div
						className=" h-5 flex justify-center text-white font-bold bg-[#04AA7D] items-center rounded-full"
						style={{width: `${PercentageCompleted}%`}}
					>
						{" "}
						{`${PercentageCompleted} %`}
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
				<div className="flex  mt-4">
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
		</div>
	);
};

export default AnimalCard;
