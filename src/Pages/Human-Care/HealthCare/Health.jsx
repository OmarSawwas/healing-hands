import {Fragment, useState, useEffect} from "react";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import Navbar from "../../../Components/Navbar";
import {doc, getDocs, where, query} from "firebase/firestore";
import {HealthCases} from "../../../firebase/config";
import Footer from "../../../Components/Footer";
import Filter from "../../../Components/Filter";
import Cards from "./Cards";
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

const MatcherPage = (props) => {
	const {user, userId} = props;
	const currentURL = window.location.href;
	const urlCheck = currentURL.includes("Human-Care/Health");

	const healthQuery = query(
		HealthCases,
		where("isAllowed", "==", urlCheck ? true : false)
	);
	const [loading, setLoading] = useState(true);
	// Health Posts Start
	const [healthData, setHealthData] = useState([]);
	const getHealthData = async () => {
		setLoading(true);
		const healthPendingData = await getDocs(healthQuery);
		setHealthData(
			healthPendingData.docs.map((item) => {
				const docData = item.data();
				return {
					id: item.id,
					...docData,
				};
			})
		);
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
				HealthCases,
				where("severity", "==", severity),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setHealthData(res.docs.map((item) => ({id: item.id, ...item.data()})));
			});
		} else if (severity === "") {
			const q = query(
				HealthCases,
				where("country", "==", country),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setHealthData(res.docs.map((item) => ({id: item.id, ...item.data()})));
			});
		} else {
			const q = query(
				HealthCases,
				where("country", "==", country),
				where("severity", "==", severity),
				where("isAllowed", "==", urlCheck ? true : false)
			);
			getDocs(q).then((res) => {
				setHealthData(res.docs.map((item) => ({id: item.id, ...item.data()})));
			});
		}
	};
	useEffect(() => {
		if (filter.severity !== "" || filter.country !== "") {
			handleSubmit();
		} else {
			getHealthData();
		}
	}, [filter]);
	//
	// End of Filter Data Collection

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	return (
		<div className="bg-[#3a3534]">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-50 lg:hidden"
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
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
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
									<h2 className="text-lg font-medium text-gray-100">Filters</h2>
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
												getHealthData();
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
				{/*  */}
				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
								className="p-2 -m-2 ml-4 sm:ml-6 text-gray-100 hover:text-gray-100 lg:hidden"
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
												getHealthData();
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
									data={healthData}
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
