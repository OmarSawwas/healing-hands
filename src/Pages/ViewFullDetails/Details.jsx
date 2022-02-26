import React, {useState, useEffect} from "react";
import Navbar from "../../Components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "../../Components/Wrapper";
import {
	animalFormData,
	EducationCases,
	WorkCases,
	HealthCases,
	db,
} from "../../firebase/config";
import {doc, getDoc} from "firebase/firestore";
const Details = () => {
	const {id, type} = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	const navigate = useNavigate();
	const fetchData = async () => {
		setLoading(true);
		switch (type) {
			case "animals":
				const docRef = doc(db, "AnimalCases", id);
				const animalsData = await getDoc(docRef);
				if (!animalsData.exists()) {
					navigate("/404");
				}
				setData(animalsData.data());
				setLoading(false);
				break;
			case "humans":
				break;

			default:
				navigate("/");
				break;
		}
	};
	useEffect(() => {
		if (!id || !type) {
			navigate("/404");
		}
		fetchData();
		return () => fetchData();
	}, []);
	return (
		<>
			<Navbar />
			<Wrapper loading={loading}>
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Information of Case # {id}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Personal details and application.
						</p>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Full name</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Margot Foster
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Application for
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Backend Developer
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Email address
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									margotfoster@example.com
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Salary expectation
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									$120,000
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">About</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
									incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
									consequat sint. Sit id mollit nulla mollit nostrud in ea
									officia proident. Irure nostrud pariatur mollit ad adipisicing
									reprehenderit deserunt qui eu.
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</Wrapper>
		</>
	);
};
export default Details;
