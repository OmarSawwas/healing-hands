import {initializeApp} from "firebase/app";

import {collection, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage, ref} from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBu04Jiy03hJZvfZRBLOrUwOV2BThgjSzo",
	authDomain: "help-match-summit-challenge.firebaseapp.com",
	projectId: "help-match-summit-challenge",
	storageBucket: "help-match-summit-challenge.appspot.com",
	messagingSenderId: "108353193854",
	appId: "1:108353193854:web:c2ff2de16d39d0e0dad52f",
};
initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();

const auth = getAuth();
const Users = collection(db, "users");
const animalFormData = collection(db, "AnimalCases");
const EducationCases = collection(db, "EducationCases");
const HealthCases = collection(db, "HealthCases");
const WorkCases = collection(db, "WorkCases");
export {
	db,
	auth,
	Users,
	animalFormData,
	EducationCases,
	HealthCases,
	WorkCases,
};
