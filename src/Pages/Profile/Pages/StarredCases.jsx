import React from "react";
import Sidebar from "../../../Components/Layouts/admin.sidebar";

import {useState, useEffect} from "react";
import {db, Users} from "../../../firebase/config";
import {
	doc,
	getDocs,
	where,
	query,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import EducationCards from "../../Human-Care/EducationAssistance/Cards";
import HealthCards from "../../Human-Care/HealthCare/Cards";
import WorkCards from "../../Human-Care/WorkAssistance/Cards";
import AnimalCards from "../../Animal-Care/Cards";
import {async} from "@firebase/util";
import Wrapper from "../../../Components/Wrapper";

const StarredCases = (props) => {
	const {user, userId} = props;
	const [loading, setLoading] = useState(true);
	const [firstHealthData, setFirstHealthData] = useState([]);
	const [workDocs, setWorkDocs] = useState([]);
	const [healthDocs, setHealthDocs] = useState([]);
	const [educationDocs, setEducationDocs] = useState([]);
	const [animalDocs, setAnimalDocs] = useState([]);

	const getData = async () => {
		await user;

		if (user) {
			const userRef = doc(db, "Users", userId);

			if (user.favoritePosts.healthPosts) {
				await onSnapshot(userRef, async (userDoc) => {
					const healthPosts = userDoc.data().favoritePosts.healthPosts;
					const fbPosts = await Promise.all(
						healthPosts.map(async (item) => {
							const postRef = doc(db, "HealthCases", item);
							const post = await getDoc(postRef);
							return {id: post.id, ...post.data()};
						})
					);
					setHealthDocs(fbPosts);
				});
			}
			if (user.favoritePosts.workPosts) {
				await onSnapshot(userRef, async (userDoc) => {
					const workPosts = userDoc.data().favoritePosts.workPosts;
					const fbPosts = await Promise.all(
						workPosts.map(async (item) => {
							const postRef = doc(db, "WorkCases", item);
							const post = await getDoc(postRef);
							return {id: post.id, ...post.data()};
						})
					);
					setWorkDocs(fbPosts);
				});
			}
			if (user.favoritePosts.educationPosts) {
				await onSnapshot(userRef, async (userDoc) => {
					const educationPosts = userDoc.data().favoritePosts.educationPosts;
					const fbPosts = await Promise.all(
						educationPosts.map(async (item) => {
							const postRef = doc(db, "EducationCases", item);
							const post = await getDoc(postRef);
							return {id: post.id, ...post.data()};
						})
					);
					setEducationDocs(fbPosts);
				});
			}
			if (user.favoritePosts.animalPosts) {
				await onSnapshot(userRef, async (userDoc) => {
					const animalPosts = userDoc.data().favoritePosts.animalPosts;
					const fbPosts = await Promise.all(
						animalPosts.map(async (item) => {
							const postRef = doc(db, "AnimalCases", item);
							const post = await getDoc(postRef);
							return {id: post.id, ...post.data()};
						})
					);
					setAnimalDocs(fbPosts);
				});
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
		return () => getData();
	}, [user]);
	console.log(loading);
	return (
		<Sidebar>
			<Wrapper loading={loading}>
				<div>
					<div>
						<div className="flex justify-center ">
							<div className=" font-xl w-60 text-white  flex justify-center bg-[#292524] border-2 border-[#e6ad1c] mb-2 rounded-lg ">
								Health Care Cases
							</div>
						</div>
						<hr></hr>
						<div className="mt-2">
							{user && healthDocs && (
								<HealthCards data={healthDocs} user={user} userId={userId} />
							)}
						</div>
					</div>

					<div>
						<div className="flex justify-center ">
							<div className=" font-xl w-60 text-white  flex justify-center bg-[#292524] border-2 border-[#e6ad1c] mb-2 rounded-lg ">
								Work Assistance Cases
							</div>
						</div>
						<hr></hr>
						<div className="mt-2">
							{user && workDocs && (
								<WorkCards data={workDocs} user={user} userId={userId} />
							)}
						</div>
					</div>

					<div>
						<div className="flex justify-center ">
							<div className=" font-xl w-60 text-white  flex justify-center bg-[#292524] border-2 border-[#e6ad1c] mb-2 rounded-lg ">
								Education Assistance Cases
							</div>
						</div>
						<hr></hr>
						<div className="mt-2">
							{user && educationDocs && (
								<EducationCards
									data={educationDocs}
									user={user}
									userId={userId}
								/>
							)}
						</div>
					</div>

					<div>
						<div className="flex justify-center ">
							<div className=" font-xl w-60 text-white  flex justify-center bg-[#292524] border-2 border-[#e6ad1c] mb-2 rounded-lg ">
								Animal Care Cases
							</div>
						</div>
						<hr></hr>
						<div className="mt-2">
							{user && animalDocs && (
								<AnimalCards data={animalDocs} user={user} userId={userId} />
							)}
						</div>
					</div>
				</div>
			</Wrapper>
		</Sidebar>
	);
};

export default StarredCases;
