import React, {useState, useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config";
const UserSate = () => {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const state = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return state;
	}, []);

	return currentUser;
};

export default UserSate;
