import {MailIcon, PhoneIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
import SingleCard from "./SingleCard";
import {useState, useEffect} from "react";
import {animalFormData, db} from "../../../firebase/config";
import {collection, getDocs} from "firebase/firestore";
import {CheckCircleIcon} from "@heroicons/react/solid";
import Wrapper from "../../../Components/Wrapper";
const people = [
	{
		case: 1,
		age: "12",
		skills: ["array of skills' names"],
		certificates: ["array of certificates's names"],
	},
	{
		case: 2,
		age: "15",
		skills: ["array of skills' names"],
		certificates: ["array of asdcertificates's names"],
	},
	{
		case: 3,
		age: "15",
		skills: ["array of skills' names"],
		certificates: ["array of asdcertificates's names"],
	},
	{
		case: 4,
		age: "15",
		skills: ["array of skills' names"],
		certificates: ["array of asdcertificates's names"],
	},
	{
		case: 5,
		age: "15",
		skills: ["array of skills' names"],
		certificates: ["array of asdcertificates's names"],
	},
	{
		case: 6,
		age: "15",
		skills: ["array of skills' names"],
		certificates: ["array of asdcertificates's names"],
	},
];

const Cards = () => {
	const [data, setData] = useState([]);
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
	return (
		<Wrapper loading={loading}>
			<ul
				role="list"
				className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
			>
				{data.map((person) => (
					<li
						key={person.id}
						className="col-span-1 bg-white rounded-lg  divide-y divide-gray-200"
					>
						<div className="w-full flex items-center justify-between p-6 space-x-6">
							<div className="flex-1 truncate">
								<div className="flex items-center space-x-3">
									<SingleCard
										key={person.case}
										case={person.case}
										age={person.age}
										skills={person.skills}
										certificates={person.certificates}
									/>
								</div>
								<p className="mt-1 text-gray-500 text-sm truncate">
									{person.title}
								</p>
							</div>
						</div>
						<div>
							<div className="-mt-px flex divide-x divide-gray-200 hover:bg-indigo-600 shadow-lg  rounded-b-lg ">
								<div className="w-0 flex-1 flex">
									<Link
										to={`/details/${person.id}`}
										className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 hover:text-white font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
									>
										<span className="ml-3 text-lg ">More Details</span>
									</Link>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</Wrapper>
	);
};
export default Cards;
