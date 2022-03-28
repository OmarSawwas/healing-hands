import React from "react";
import "./CSS/Banner.css";
import Cards from "../../../Components/Home Grid Cards/Cards";
import "../homeStyle.css";

const Banner = () => {
	return (
		<div className="banner">
			<div className="banner-info">
				<h1>
					Welcome to <br />{" "}
					<span className="text-stone-4n00">HEALING-HANDS</span>
				</h1>
				<div>
					<a href="#content" id="explore">
						Explore
					</a>
				</div>
			</div>
		</div>
	);
};

export default Banner;
