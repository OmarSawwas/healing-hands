import React from "react";
import Nationalities from "../data/nationality";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {useState} from "react";
import {
	ChevronDownIcon,
	FilterIcon,
	MinusSmIcon,
	PlusSmIcon,
	ViewGridIcon,
} from "@heroicons/react/solid";
const severityFilters = {
	id: "severity",
	name: "Severity",
	options: [
		{value: "high", label: "High", checked: false},
		{value: "moderate", label: "Moderate", checked: false},
		{value: "low", label: "Low", checked: false},
	],
};

const Filter = (props) => {
	const {filter, setFilter} = props;
	const nationalitiesMap = Nationalities.map((item, index) => {
		return (
			<option value={item.label} key={index}>
				{item.label}
			</option>
		);
	});
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFilter((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div>
			<Disclosure as="div" className="border-b border-gray-200 py-6">
				{({open}) => (
					<>
						<h3 className="-my-3 flow-root">
							<Disclosure.Button className="p-4 rounded-lg focus:ring-1 focus:ring-[#f2b400] focus:border-[#f2b400] hover:border-2 hover:border-[#f2b400] sm:text-sm bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
								<span className="font-medium text-gray-900">Severity</span>
								<span className="ml-6 flex items-center">
									{open ? (
										<MinusSmIcon className="h-5 w-5" aria-hidden="true" />
									) : (
										<PlusSmIcon className="h-5 w-5" aria-hidden="true" />
									)}
								</span>
							</Disclosure.Button>
						</h3>
						<Disclosure.Panel className="pt-6">
							<div className="space-y-2">
								{severityFilters.options.map((option, optionIdx) => {
									return (
										<div key={optionIdx} className="flex items-center">
											<input
												type="radio"
												id={severityFilters.id}
												name="severity"
												value={option.value}
												checked={filter.severity === option.value}
												onChange={handleChange}
												className="focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm text-[#f2b400]"
											/>
											<label
												htmlFor={option.value}
												className="ml-3 text-sm text-white"
											>
												{option.label}
											</label>
										</div>
									);
								})}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			{/* Country Filter */}
			<Disclosure as="div" className="border-b border-gray-200 py-6">
				{({open}) => (
					<>
						<h3 className="-my-3 flow-root">
							<Disclosure.Button className="p-4 rounded-lg focus:ring-1 focus:ring-[#f2b400] focus:border-[#f2b400] hover:border-2 hover:border-[#f2b400] sm:text-sm bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
								<span className="font-medium text-gray-900">Country</span>
								<span className="ml-6 flex items-center">
									{open ? (
										<MinusSmIcon className="h-5 w-5" aria-hidden="true" />
									) : (
										<PlusSmIcon className="h-5 w-5" aria-hidden="true" />
									)}
								</span>
							</Disclosure.Button>
						</h3>
						<Disclosure.Panel className="pt-6">
							<div className="space-y-2">
								<div>
									<div className="mt-2 sm:mt-0 sm:col-span-2">
										<select
											value={filter.country}
											onChange={handleChange}
											name="country"
											required
											className="shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block focus:ring-[#292524] focus:border-[#292524] w-full sm:max-w-xs sm:text-sm border-[#292524] rounded-md"
										>
											<option defaultChecked hidden className="text-gray-400">
												••Specify a Country••
											</option>
											{nationalitiesMap}
										</select>
									</div>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default Filter;
