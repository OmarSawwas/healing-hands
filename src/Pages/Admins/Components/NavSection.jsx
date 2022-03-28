function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const NavSection = (props) => {
	const {
		healthcareposts,
		animalcareposts,
		workassistanceposts,
		educationassistanceposts,
		tabId,
	} = props;

	const tabs = [
		{
			id: 1,
			name: "Health-Care",
			href: "#",
			count: healthcareposts,
			current: tabId === "1" ? true : false,
		},
		{
			id: 2,
			name: "Animal-Care",
			href: "#",
			count: animalcareposts,
			current: tabId === "2" ? true : false,
		},
		{
			id: 3,
			name: "Work-Assistance",
			href: "#",
			count: workassistanceposts,
			current: tabId === "3" ? true : false,
		},
		{
			id: 4,
			name: "Education-Assistance",
			href: "#",
			count: educationassistanceposts,
			current: tabId === "4" ? true : false,
		},
	];
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id="tabs"
					name="tabs"
					className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
					defaultValue={tabs.find((tab) => tab.current).name}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{tabs.map((tab) => (
							<button
								key={tab.name}
								id={tab.id}
								onClick={props.handleClick}
								className={classNames(
									tab.current
										? "border-[#f2b400] text-[#f2b400]"
										: "border-transparent text-white font-bold hover:text-[#f2b400] hover:border-[#f2b400]",
									"whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
								)}
								aria-current={tab.current ? "page" : undefined}
							>
								{tab.name}
								{tab.count ? (
									<span
										className={classNames(
											tab.current
												? "bg-indigo-100 text-[#f2b400]"
												: "bg-gray-100 text-gray-900",
											"hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
										)}
									>
										{tab.count}
									</span>
								) : null}
							</button>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};
export default NavSection;
