import {useState} from "react";
import {auth} from "../config";
import {createUserWithEmailAndPassword, createUserwith} from "firebase/auth";
import {Users} from "../config";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [user, setUser] = useState({
		Fname: "",
		Lname: "",
		Email: "",
		Country: "",
		Work: "",
		Phone: "",
		Age: "",
		isAdmin: false,
		isLoggedIn: false,
	});

	const signup = (email, password) => {
		setError(null);
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				console.log("Successfully signedup");
			})
			.catch((err) => {
				setError(err);
			});
	};

	return {error, signup};
};
