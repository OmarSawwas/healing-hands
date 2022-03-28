import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import AboutUs from "./Components/AboutUs";
import OurTeam from "./Components/OurTeam";
import GoalsMet from "./Components/GoalsMet";
import Banner from "./Components/Banner";
import Content from "./Components/Content";

const home = (props) => {
	const {user} = props;

	return (
		<div>
			<Banner />
			<Content />
			<OurTeam />
			<GoalsMet />
		</div>
	);
};

export default home;
