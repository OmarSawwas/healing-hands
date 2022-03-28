import Cards from "../../../Components/Home Grid Cards/Cards";

import "../homeStyle.css";
export default function Example() {
	return (
		<div className="bg-[#F2B400]" id="content">
			<div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
				<div className="space-y-12">
					<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
						<h2 className="text-[#292524] text-6xl font-extrabold tracking-tight  mb-10">
							Our Services
						</h2>
						<p className="text-2xl text-[#292524]">
							Make a change by clicking on one of these services ,and filling
							out the form with the required information.
						</p>
					</div>
					<Cards />
				</div>
			</div>
		</div>
	);
}
