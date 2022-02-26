import "./App.css";
import Home from "./Pages/HomePage/Home";
import Details from "./Pages/ViewFullDetails/Details";
import NewPost from "./Pages/New Post/Form";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactUsPage from "./Pages/Contact Us";
import Signup from "./Pages/SignUp-SignIn/Manager";
import Profile from "./Pages/Profile/profile";
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

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route index path="/pending-posts" element={<Pending />} />
					<Route path="/Human-Care/Health" element={<Health />} />
					<Route path="/Human-Care/Health-Form" element={<HealthForm />} />
					<Route path="/Human-Care/Work" element={<Work />} />
					<Route path="/Human-Care/Work-Form" element={<WorkForm />} />
					<Route path="/Human-Care/Education" element={<Education />} />
					<Route
						path="/Human-Care/Education-Form"
						element={<EducationForm />}
					/>
					<Route path="/Animal-Care" element={<Animal />} />
					<Route path="/Animal-Care-Form" element={<AnimalForm />} />
					<Route path="/details/:type/:id" element={<Details />} />
					<Route path="/new-post" element={<NewPost />} />
					<Route path="/contact-us" element={<ContactUsPage />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/profile" element={<Profile />} />
					Profile
					<Route path="/sign-in" element={<Signin />} />
					Profile
					<Route path="/test" element={<Test />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
