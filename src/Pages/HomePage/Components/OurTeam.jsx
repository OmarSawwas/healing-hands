import Image1 from "../../../Images/OmarImage.jpeg";
import Image2 from "../../../Images/DoaaImage.jpeg";
import Image3 from "../../../Images/FayezImage.jpeg";
const people = [
	{
		name: "Omar Sawwas",
		role: "Full Stack Developer",
		imageUrl: Image1,
		twitterUrl: "#",
		linkedinUrl: "https://www.linkedin.com/in/omar-sawwas/",
	},
	{
		name: "Doaa Kishly",
		role: "Front-End Developer & Designer ",
		imageUrl: Image2,
		twitterUrl: "#",
		linkedinUrl: "#",
	},
	{
		name: "Fayez Alloush",
		role: "Front-End Developer & Designer",
		imageUrl: Image3,
		twitterUrl: "#",
		linkedinUrl: "https://www.linkedin.com/in/fayez-a-a05790132/",
	},
];

export default function Example() {
	return (
		<div className="bg-[#F2B400]">
			<div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
				<div className="space-y-12">
					<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
						<h2 className="text-[#292524] text-3xl font-extrabold tracking-tight sm:text-4xl mb-10">
							Meet our team
						</h2>
						<p className="text-xl text-gray-500"></p>
					</div>
					<ul
						role="list"
						className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
					>
						{people.map((person) => (
							<li key={person.name}>
								<div className="text-[#F2B400] bg-stone-800 col-span-1 flex flex-col text-center  rounded-lg shadow hover:border-[#e3e638] hover:border-2">
									<img
										className="mt-8 mx-auto h-56 w-56 rounded-full xl:w-60 xl:h-60 hover:border-[#F2B400] hover:border-4"
										src={person.imageUrl}
										alt=""
									/>
									<div className="space-y-2 mt-2 mb-8">
										<div className="text-lg leading-6 font-bold space-y-1">
											<h3>{person.name}</h3>
											<p className="text-blue-600 text-lg underline underline-offset-4">
												{person.role}
											</p>
										</div>
										<ul role="list" className="flex justify-center space-x-5">
											<li>
												<a
													href={person.linkedinUrl}
													target="_blank"
													className="text-white hover:text-gray-600"
												>
													<span className="sr-only">LinkedIn</span>
													<svg
														className="w-5 h-5"
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
															clipRule="evenodd"
														/>
													</svg>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
