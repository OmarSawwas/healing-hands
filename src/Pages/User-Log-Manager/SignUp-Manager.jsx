import React from "react";
import Steps from "./Steps";
import {useState} from "react";
import Navbar from "../../Components/Navbar";
import SignUpPage from "../SignUp-SignIn/Components/Signup";
import UserInfo from "./User-Info";

const SignUpManager = () => {
	const [page, setPage] = useState(1);

	const nextClick = () => {
		setPage(2);
	};
	const prevClick = () => {
		setPage(1);
	};
	const [userData, setUserData] = useState({
		fName: "",
		lName: "",
		email: "",
		country: "",
		work: "",
		phone: "",
		phoneCode: "",
		age: "",
		image: "",
		isAdmin: false,
		isLoggedIn: false,
		favoritePosts: {
			animalPosts: [],
			healthPosts: [],
			workPosts: [],
			educationPosts: [],
		},
	});

	return (
		<div className="">
			<div className="flex justify-center items-center  bg-[#3a3534] p-4">
				<Steps page={page} />
			</div>

			{page === 1 && (
				<SignUpPage
					page={page}
					next={nextClick}
					setUserData={setUserData}
					userData={userData}
				/>
			)}

			{page === 2 && (
				<UserInfo
					prev={prevClick}
					setUserData={setUserData}
					userData={userData}
				/>
			)}
		</div>
	);
};

export default SignUpManager;
