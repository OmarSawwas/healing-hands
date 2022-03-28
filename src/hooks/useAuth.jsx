import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
const useAuth = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();
	const isAuthenticated = cookies.get("isAuthenticated");

	console.log(isAuthenticated);
	if (!isAuthenticated) {
		console.log("aslkdmkajsdnajksnd");
		// navigate("/");
	}
};

export default useAuth;
