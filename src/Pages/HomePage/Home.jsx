import React from "react";
import Navbar from "../../Components/Navbar";
import Content from "./Components/Content";
import Footer from "../../Components/Footer";
import AboutUs from "./Components/AboutUs";
import OurTeam from "./Components/OurTeam";
import HowToUse from "./Components/HowToUse";
import GoalsMet from "./Components/GoalsMet";

const home = () => {
	return (
		<div>
			<Navbar />
			<Content />
			<AboutUs />
			<HowToUse />
			<OurTeam />
			<GoalsMet />
			<Footer />
		</div>
	);
};

export default home;
