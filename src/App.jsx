import "./App.css";
import Home from "./Pages/HomePage/Home";

import NewPost from "./Pages/New Post/Form";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactUsPage from "./Pages/Contact Us";
import Signup from "./Pages/User-Log-Manager/SignUp-Manager";
import ProfileManager from "./Pages/Profile/ProfileManager";
import Accounts from "./Pages/Profile/Pages/Accounts";
import Signin from "./Pages/SignUp-SignIn/Components/Signin.jsx";
import Test from "./Pages/testForm";
import Health from "./Pages/Human-Care/HealthCare/Health";
import HealthForm from "./Pages/New Post/Human-Post/HealthForm";
import Work from "./Pages/Human-Care/WorkAssistance/Work";
import WorkForm from "./Pages/New Post/Human-Post/WorkForm";
import Education from "./Pages/Human-Care/EducationAssistance/Education";
import EducationForm from "./Pages/New Post/Human-Post/EducationForm";
import Animal from "./Pages/Animal-Care/Animal";
import AnimalForm from "./Pages/New Post/Animal-Post/AnimalForm";
import Pending from "./Pages/Admins/Pending/PendingPosts";
import AnimalFormDetail from "./Pages/ViewFullDetails/Animal Form View Details";
import HealthFormDetails from "./Pages/ViewFullDetails/HealthFormDetails";
import WorkFormDetails from "./Pages/ViewFullDetails/WorkFormDetails copy";
import EducationFormDetail from "./Pages/ViewFullDetails/EducationFormDetails";

import Profile from "./Pages/Profile/ProfileManager";
import StarredCases from "./Pages/Profile/Pages/StarredCases";
import ContactUsMessages from "./Pages/Profile/Pages/ContactUs";
import {useState, useEffect} from "react";
import {auth, db} from "./firebase/config";
import {getDoc, doc, onSnapshot} from "firebase/firestore";
import OnAuthState from "./firebase/User-log-Manager/OnAuthState";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {onAuthStateChanged} from "firebase/auth";
function App() {
	// User Configuration
	const [myUser, setUser] = useState();
	const [id, setId] = useState();
	const getUser = async (user) => {
		if (!user) {
			setUser(undefined);
			setId(undefined);
		} else {
			const id = user.uid;
			setId(id);
			const docRef = doc(db, "Users", id);
			await onSnapshot(docRef, (document) => {
				setUser(document.data());
			});
		}
	};
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			getUser(user);
		});

		return () => getUser();
	}, []);

	return (
		<BrowserRouter>
			<Navbar user={myUser} userId={id} />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route
					index
					path="/pending-posts"
					element={<Pending user={myUser} userId={id} />}
				/>
				<Route
					index
					path="/:id/messages"
					element={<ContactUsMessages user={myUser} userId={id} />}
				/>
				<Route
					path="/Human-Care/Health"
					element={<Health user={myUser} userId={id} />}
				/>
				<Route path="/Health-Form" element={<HealthForm />} />
				<Route
					path="/Human-Care/Work"
					element={<Work user={myUser} userId={id} />}
				/>
				<Route path="/Work-Form" element={<WorkForm />} />
				<Route
					path="/Human-Care/Education"
					element={<Education user={myUser} userId={id} />}
				/>
				<Route path="/Education-Form" element={<EducationForm />} />
				<Route
					path="/Animal-Care"
					element={<Animal user={myUser} userId={id} />}
				/>
				<Route path="/Animal-Form" element={<AnimalForm />} />
				<Route path="/new-post" element={<NewPost />} />
				<Route path="/contact-us" element={<ContactUsPage />} />
				<Route path="/sign-up" element={<Signup />} />
				<Route path="/sign-in" element={<Signin />} />

				<Route path="/test" element={<Test />} />
				<Route
					path="animal/details/:id"
					element={<AnimalFormDetail user={myUser} userId={id} />}
				/>
				<Route
					path="/human/health-case/details/:id"
					element={<HealthFormDetails user={myUser} userId={id} />}
				/>
				<Route
					path="/human/work-case/details/:id"
					element={<WorkFormDetails user={myUser} userId={id} />}
				/>
				<Route
					path="/human/education-case/details/:id"
					element={<EducationFormDetail user={myUser} userId={id} />}
				/>

				<Route path="/profile/:id" element={<Profile />} />
				<Route
					path="/:id/accounts"
					element={<Accounts user={myUser} userId={id} />}
				/>
				<Route
					path="/:id/starred-posts"
					element={<StarredCases user={myUser} userId={id} />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
