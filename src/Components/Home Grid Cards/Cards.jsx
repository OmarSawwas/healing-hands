import {useNavigate} from "react-router-dom";
const data = [
	{
		Title: "Health-Care",
		description:
			"Help others find their suitable health-care sharing their story",
		href: "/Human-Care/Health-Form",
	},
	{
		Title: "Work-Assistant",
		description:
			"Help others find their suitable work based on their skills and/or their certificates sharing their story",
		href: "/Human-Care/Work-Form",
	},
	{
		Title: "Education Assistant",
		description:
			"Help others continue their journy of education sharing their story",
		href: "/Human-Care/Education-Form",
	},
	{
		Title: "Animal-Care",
		description: "Help animals find a family to be adopted",
		href: "/Animal-Care-Form",
	},
];

export default function Example() {
	const navigate = useNavigate();
	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{data.map((item) => (
				<li className="bg-stone-800 col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
					<div className="flex-1 flex flex-col p-8">
						<h3 className="mt-6 text-[#F2B400] text-2xl font-medium">
							{item.Title}
						</h3>
						<dl className="mt-1 flex-grow flex flex-col justify-between">
							<dt className="sr-only">Title</dt>
							<dd className="text-[#fff] text-lg">{item.description}</dd>
						</dl>
					</div>
					<div>
						<div className="-mt-px flex divide-x divide-gray-200">
							<div className="w-0 flex-1 flex">
								<button
									className="text-[#F2B400] relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-lg text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
									onClick={() => {
										navigate(item.href);
									}}
								>
									View more details
								</button>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
