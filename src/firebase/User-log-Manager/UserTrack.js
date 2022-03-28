import {async} from "@firebase/util";
import userState from "./OnAuthState";
import {db} from "../config";
import {doc, getDoc} from "firebase/firestore";
export const fromAuthUserReturn = async () => {
	const user = userState();
	if (user) {
		return user;
	} else {
		return null;
	}
};

export const fromCollectionUserReturn = async () => {
	if (fromAuthUserReturn) {
		const id = fromAuthUserReturn.id;
		console.log("in file id: " + id);
		const docRef = doc(db, "Users", id);
		const dataDoc = await getDoc(docRef);
		return dataDoc.data();
	} else {
		return null;
	}
};
