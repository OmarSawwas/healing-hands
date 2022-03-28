import React from "react";
import Goal1 from "../../../Images/Goal1.jpeg";
import Goal2 from "../../../Images/Goal2.jpeg";
import Goal3 from "../../../Images/Goal3.jpeg";
import Goal4 from "../../../Images/Goal4.jpeg";
import Goal8 from "../../../Images/Goal8.png";
import Goal17 from "../../../Images/Goal17.png";
const GoalsPage = () => {
	const goals = [
		{
			src: {Goal1},
			alt: "Goal1",
		},

		{
			src: {Goal2},
			alt: "Goal2",
		},
		{
			src: {Goal3},
			alt: "Goal3",
		},
		{
			src: {Goal4},
			alt: "Goal4",
		},
	];
	return (
		<div className="bg-[#F2B400]">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<h2 className="text-[#292524] text-3xl font-extrabold tracking-tight sm:text-4xl howuse2 mb-10">
					UN Goals Met
				</h2>

				<div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
					<div className="bg-[#292524] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal1} alt="Goal1" />
					</div>
					<div className="bg-[hsl(12,6%,15%)] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal2} alt="Goal2" />
					</div>
					<div className="bg-[#292524] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal3} alt="Goal3" />
					</div>
					<div className="bg-[#292524] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal4} alt="Goal4" />
					</div>
					<div className="bg-[#292524] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal8} alt="Goal8" />
					</div>
					<div className="bg-[#292524] col-span-1 flex justify-center py-8 rounded-lg">
						<img className="w-64 h-36 rounded-lg" src={Goal17} alt="Goal17" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoalsPage;
