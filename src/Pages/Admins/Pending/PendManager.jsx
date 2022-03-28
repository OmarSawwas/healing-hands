import {Fragment, useState, useEffect} from "react";
import Education from "../../Human-Care/EducationAssistance/Education";
import Health from "../../Human-Care/HealthCare/Health";
import Work from "../../Human-Care/WorkAssistance/Work";
import Animal from "../../Animal-Care/Animal";
import {
	animalFormData,
	EducationCases,
	WorkCases,
	HealthCases,
} from "../../../firebase/config";
import {doc, setDoc, query, getDocs, where, limit} from "firebase/firestore";
const PendManager = (props) => {
	const {user, userId} = props;
	const healthQuery = query(HealthCases, where("isAllowed", "==", false));
	const workQuery = query(WorkCases, where("isAllowed", "==", false));
	const educationQuery = query(EducationCases, where("isAllowed", "==", false));
	const animalQuery = query(animalFormData, where("isAllowed", "==", false));
	// Animal Care Posts Start
	const [animalData, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		setLoading(true);
		const animalData = await getDocs(animalQuery);

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
	const getWorkData = async () => {
		setLoading(true);
		const workPendingData = await getDocs(workQuery);
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
	useEffect(() => {
		getHealthData();
		return () => getHealthData();
	}, []);
	// Health Posts Posts End
	// Education Posts Start
	const [educationData, setEducationData] = useState([]);
	const getEducationData = async () => {
		setLoading(true);
		const educationPendingData = await getDocs(educationQuery);
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

	return (
		<div>
			{props.id === "1" && (
				<Health
					data={healthData}
					loading={loading}
					user={user}
					userId={userId}
				/>
			)}
			{props.id === "2" && (
				<Animal data={workData} loading={loading} user={user} userId={userId} />
			)}
			{props.id === "3" && (
				<Work data={animalData} loading={loading} user={user} userId={userId} />
			)}
			{props.id === "4" && (
				<Education
					data={educationData}
					loading={loading}
					user={user}
					userId={userId}
				/>
			)}
		</div>
	);
};

export default PendManager;
