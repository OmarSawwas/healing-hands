import {Fragment, useState, useEffect} from "react";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";

import NavSection from "../Components/NavSection";

import PendManager from "./PendManager";
import Error from "../../NotAuthorized/Error";

import {
	animalFormData,
	EducationCases,
	WorkCases,
	HealthCases,
} from "../../../firebase/config";
import {doc, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {
	ChevronDownIcon,
	FilterIcon,
	MinusSmIcon,
	PlusSmIcon,
	ViewGridIcon,
} from "@heroicons/react/solid";

const filters = [
	{
		id: "Severity",
		name: "Severity",
		options: [
			{value: "High", label: "High", checked: false},
			{value: "Moderate", label: "Moderate", checked: false},
			{value: "Low", label: "Low", checked: true},
		],
	},
	{
		id: "Age",
		name: "Age",
		options: [
			{value: "<18", label: "<18", checked: false},
			{value: "18-24", label: "18-24", checked: false},
			{value: "24-35", label: "24-35", checked: true},
			{value: "35-50", label: "35-50", checked: false},
			{value: "50-55", label: "50-55", checked: false},
			{value: ">55", label: ">55", checked: false},
		],
	},
	{
		id: "Skills",
		name: "Skills",
		options: [
			{value: "Blacksmithing", label: "Blacksmithing", checked: false},
			{value: "sales", label: "sales", checked: false},
			{value: "Tailoring", label: "Tailoring", checked: true},
			{value: "Wall-Painting", label: "Wall-Painting", checked: false},
		],
	},
	{
		id: "Certificates",
		name: "Certificates",
		options: [
			{value: "Elementary", label: "Elementary", checked: false},
			{value: "Secondary", label: "Secondary", checked: false},
			{
				value: "Technical Studies",
				label: "Technical Studies",
				checked: false,
			},
			{value: "Bachelors", label: "Bachelors", checked: false},
			{value: "Others", label: "Others", checked: false},
		],
	},
	{
		id: "Country",
		name: "Country",
		options: [
			{value: "AD", label: "Andorra", checked: true},
			{value: "AE", label: "United Arab Emirates", checked: true},
			{value: "AF", label: "Afghanistan", checked: false},
			{value: "AG", label: "Antigua and Barbuda", checked: false},
		],
	},
];

const PendingPosts = (props) => {
	const {user, userId} = props;
	const [tabId, setTabId] = useState("1");

	// Animal Care Posts Start
	const [animalDataSize, setAnimalDataSize] = useState([]);
	const [healthDataSize, setHealthDataSize] = useState([]);
	const [workDataSize, setWorkDataSize] = useState([]);
	const [educationDataSize, setEducationDataSize] = useState([]);

	const [loading, setLoading] = useState(true);
	const getData = async () => {
		setLoading(true);
		const healthQuery = query(HealthCases, where("isAllowed", "==", false));
		const workQuery = query(WorkCases, where("isAllowed", "==", false));
		const educationQuery = query(
			EducationCases,
			where("isAllowed", "==", false)
		);
		const animalQuery = query(animalFormData, where("isAllowed", "==", false));
		await onSnapshot(animalQuery, (documents) => {
			setAnimalDataSize(documents.size);
		});
		await onSnapshot(workQuery, (documents) => {
			setWorkDataSize(documents.size);
		});
		await onSnapshot(healthQuery, (documents) => {
			setHealthDataSize(documents.size);
		});
		await onSnapshot(educationQuery, (documents) => {
			setEducationDataSize(documents.size);
		});
		setLoading(false);
	};
	useEffect(() => {
		getData();
		return () => getData();
	}, []);

	// Education Posts Posts End
	const navCLick = (event) => {
		setTabId(event.target.id);
	};
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<div className="bg-[#3a3534]">
			<div>
				{/* Mobile filter dialog */}

				<main className="mx-auto px-4 sm:px-6 lg:px-8">
					{user && user.isAdmin && (
						<div>
							<div className="relative z-10 flex items-baseline justify-between pt-4  border-b border-gray-200">
								<h1 className="text-4xl font-extrabold tracking-tight text-white">
									Pending Cases
								</h1>

								<NavSection
									healthcareposts={healthDataSize}
									animalcareposts={animalDataSize}
									workassistanceposts={workDataSize}
									educationassistanceposts={educationDataSize}
									handleClick={navCLick}
									tabId={tabId}
								/>
							</div>
							<PendManager id={tabId} user={user} userId={userId} />
							<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-10 ">
								{/* Product grid */}
								<div className="lg:col-span-4">{/* /End replace */}</div>
							</div>
						</div>
					)}
					{user && !user.isAdmin && <Error />}
					{!user && <Error />}
				</main>
			</div>
		</div>
	);
};
export default PendingPosts;
