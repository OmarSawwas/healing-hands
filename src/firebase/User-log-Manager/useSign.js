import {useState} from "react";
import {auth} from "../config";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const cookies = new Cookies();
	const navigate = useNavigate();
	const login = (email, password) => {
		setError(null);
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				cookies.set("isAuthenticated", true, {
					path: "/",
						expires: new Date("2023/03/09"),
				});
				cookies.set("id", res.user.uid, {
					path: "/",
					expires: new Date("2023/03/09"),
				});
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				setError(err);
			});
	};
	return {error, login};
};
