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
import {doc, getDocs, onSnapshot} from "firebase/firestore";
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
	const [animalData, setData] = useState([]);
	const animalCasesWaiting = animalData.filter((item) => {
		return !item.isAllowed;
	});
	const [loading, setLoading] = useState(true);
	const getData = async () => {
		setLoading(true);
		const animalData = await getDocs(animalFormData);
		setData(
			animalData.docs.map((item) => {
				const docData = item.data();
				return {
					id: item.id,
					...docData,
				};
			})
		);
		setLoading(false);
	};
	useEffect(() => {
		getData();
		return () => getData();
	}, []);
	// Animal Care Posts End
	// Work Posts Start
	const [workData, setWorkData] = useState([]);
	const workCasesWaiting = workData.filter((item) => {
		return !item.isAllowed;
	});
	const getWorkData = async () => {
		setLoading(true);
		const workPendingData = await getDocs(WorkCases);
		setWorkData(
			workPendingData.docs.map((item) => {
				const docData = item.data();
				return {
					id: item.id,
					...docData,
				};
			})
		);
		setLoading(false);
	};
	useEffect(() => {
		getWorkData();
		return () => getWorkData();
	}, []);
	// Work Posts Posts End
	// Health Posts Start
	const [healthData, setHealthData] = useState([]);
	const healthCasesWaiting = healthData.filter((item) => {
		return !item.isAllowed;
	});
	const getHealthData = async () => {
		setLoading(true);
		const healthPendingData = await getDocs(HealthCases);
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
	useEffect(() => {
		getHealthData();
		return () => getHealthData();
	}, []);
	// Health Posts Posts End
	// Education Posts Start
	const [educationData, setEducationData] = useState([]);
	const educationCasesWaiting = educationData.filter((item) => {
		return !item.isAllowed;
	});
	const getEducationData = async () => {
		setLoading(true);
		const educationPendingData = await getDocs(EducationCases);
		setEducationData(
			educationPendingData.docs.map((item) => {
				const docData = item.data();
				return {
					id: item.id,
					...docData,
				};
			})
		);
		setLoading(false);
	};
	useEffect(() => {
		getEducationData();
		return () => getEducationData();
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
									healthcareposts={healthCasesWaiting.length}
									animalcareposts={animalCasesWaiting.length}
									workassistanceposts={workCasesWaiting.length}
									educationassistanceposts={educationCasesWaiting.length}
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
				</main>
			</div>
		</div>
	);
};
export default PendingPosts;
