import React, {useState, useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config";
const UserSate = () => {
	const [currentUser, setCurrentUser] = useState();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				setCurrentUser(undefined);
			} else {
				setCurrentUser(user);
			}
		});
	}, []);

	return currentUser;
};

export default UserSate;
