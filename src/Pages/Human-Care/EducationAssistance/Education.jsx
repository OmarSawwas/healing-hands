import {Fragment, useState, useEffect} from "react";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import Navbar from "../../../Components/Navbar";
import Cards from "./Cards";
import Footer from "../../../Components/Footer";
import Filter from "../../../Components/Filter";

import {
	ChevronDownIcon,
	FilterIcon,
	MinusSmIcon,
	PlusSmIcon,
	ViewGridIcon,
} from "@heroicons/react/solid";
import {doc, getDocs, where, query, onSnapshot} from "firebase/firestore";
import {EducationCases} from "../../../firebase/config";
// Filters Functionality:
const severityFilters = {
	id: "severity",
	name: "Severity",
	options: [
		{value: "high", label: "High", checked: false},
		{value: "moderate", label: "Moderate", checked: false},
		{value: "low", label: "Low", checked: false},
		{value: "all", label: "All", checked: false},
	],
};
const moneyFilters = {
	id: "money",
	name: "Money Need",
	options: [
		{value: "money1", label: "<$1000", checked: true, min: 0, max: 999},
		{
			value: "money2",
			label: "$1000-$5000",
			checked: true,
			min: 1000,
			max: 4999,
		},
		{
			value: "money3",
			label: "$5000-$10000",
			checked: false,
			min: 5000,
			max: 9999,
		},
		{
			value: "money4",
			label: ">$10000",
			checked: false,
			min: 10000,
			max: 9999999,
		},
		{
			value: "money5",
			label: "All",
			checked: false,
			min: 0,
			max: 9999999,
		},
	],
};
const certificateFiters = {
	id: "certificate",
	name: "Certificate",
	options: [
		{value: "No education", label: "No education", checked: true},
		{value: "Grade 1-9", label: "Grade 1-9", checked: true},
		{value: "Secondary", label: "Secondary", checked: false},
		{value: "Bachelors", label: "Bachelors", checked: false},
		{value: "Technical School", label: "Technical School", checked: false},
		{value: "Masters+", label: "Masters +", checked: false},
	],
};
const filters = [
	{
		id: "severity",
		name: "Severity",
		options: [
			{value: "high", label: "High", checked: false},
			{value: "moderate", label: "Moderate", checked: false},
			{value: "low", label: "Low", checked: false},
		],
	},
	{
		id: "age",
		name: "Age",
		options: [
			{value: "age1", label: "3-10 years", checked: false},
			{value: "age2", label: "10-18 years", checked: false},
			{value: "age3", label: "18-24 years", checked: false},
			{value: "age4", label: "24-30", checked: false},
			{value: "age5", label: "30-40", checked: false},
			{value: "age6", label: "40-50", checked: false},
			{value: "age7", label: "50+", checked: false},
		],
	},
	{
		id: "certificate",
		name: "Certificate",
		options: [
			{value: "cert1", label: "No education", checked: true},
			{value: "cert2", label: "Grade 1-9", checked: true},
			{value: "cert3", label: "Secondary", checked: false},
			{value: "cert4", label: "Bachelors", checked: false},
			{value: "cert5", label: "Technical School", checked: false},
			{value: "cert6", label: "Masters +", checked: false},
		],
	},

	{
		id: "money",
		name: "Money Need",
		options: [
			{value: "money1", label: "<$1000", checked: true},
			{value: "money2", label: "$1000-$5000", checked: true},
			{value: "money3", label: "$5000-$10000", checked: false},
			{value: "money4", label: ">$10000", checked: false},
		],
	},
];

const MatcherPage = (props) => {
	const {user, userId} = props;
	const currentURL = window.location.href;
	const urlCheck = currentURL.includes("Human-Care/Education");
	const educationQuery = query(
		EducationCases,
		where("isAllowed", "==", urlCheck ? true : false)
	);
	const [loading, setLoading] = useState(true);
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	// Education Posts Start
	const [educationData, setEducationData] = useState([]);
	const getEducationData = async () => {
		setLoading(true);
		await onSnapshot(educationQuery, (documents) => {
			setEducationData(
				documents.docs.map((item) => {
					const docData = item.data();
					return {
						id: item.id,
						...docData,
					};
				})
			);
		});

		setLoading(false);
	};
	const [filter, setFilter] = useState({
		country: "",
		severity: "",
	});

	const handleSubmit = () => {
		const {severity, country} = filter;
		if (country === "") {
			const q = query(
				EducationCases,
				where("severity", "==", severity),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setEducationData(
					res.docs.map((item) => ({id: item.id, ...item.data()}))
				);
			});
		} else if (severity === "") {
			const q = query(
				EducationCases,
				where("country", "==", country),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setEducationData(
					res.docs.map((item) => ({id: item.id, ...item.data()}))
				);
			});
		} else {
			const q = query(
				EducationCases,
				where("country", "==", country),
				where("severity", "==", severity),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setEducationData(
					res.docs.map((item) => ({id: item.id, ...item.data()}))
				);
			});
		}
	};
	useEffect(() => {
		if (filter.severity !== "" || filter.country !== "") {
			handleSubmit();
		} else {
			getEducationData();
		}
	}, [filter]);

	return (
		<div className="bg-[#3a3534]">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="ml-auto relative max-w-xs w-fullbg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
								<div className="px- flex items-center justify-between">
									<h2 className="text-lg font-medium text-gray-900">Filters</h2>
									<button
										type="button"
										className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
										onClick={() => setMobileFiltersOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Filters */}
								<form className="mt-4 border-t border-gray-200">
									<h3 className="sr-only">Categories</h3>
									<Filter filter={filter} setFilter={setFilter} />
									<div className="mt-2">
										<button
											type="button"
											className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
											onClick={() => {
												getEducationData();
												setFilter({
													severity: "",
													country: "",
												});
											}}
										>
											Clear
										</button>
									</div>
								</form>
							</div>
						</Transition.Child>
					</Dialog>
				</Transition.Root>

				<main className="mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative z-10 flex items-baseline justify-between ">
						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div></div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className=" origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white focus:ring-2 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FilterIcon className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pt-6 pb-24">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-10 ">
							{/* Filters */}
							<div className="sticky top-0 lg:col-span-1 ">
								<form className="hidden lg:block ">
									<h3 className="sr-only">Categories</h3>
									<Filter filter={filter} setFilter={setFilter} />
									<div className="mt-2">
										<button
											type="button"
											className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
											onClick={() => {
												getEducationData();
												setFilter({
													severity: "",
													country: "",
												});
											}}
										>
											Clear
										</button>
									</div>
								</form>
							</div>

							{/* Product grid */}
							<div className="lg:col-span-3">
								<Cards
									data={educationData}
									loading={loading}
									user={user}
									userId={userId}
								/>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};
export default MatcherPage;
