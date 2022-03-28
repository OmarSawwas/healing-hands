import {auth} from "../config";
import {signOut} from "firebase/auth";
import Cookies from "universal-cookie";
export const useLogout = () => {
	const logout = () => signOut(auth);
	const cookies = new Cookies();
	cookies.remove("id");
	cookies.remove("isAuthenticated");

	return {logout};
};
