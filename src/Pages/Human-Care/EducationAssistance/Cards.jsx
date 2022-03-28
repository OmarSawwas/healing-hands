import {MailIcon, PhoneIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

import SingleCard from "./SingleCard";
import {useState, useEffect} from "react";

import {CheckCircleIcon} from "@heroicons/react/solid";
import Wrapper from "../../../Components/Wrapper";

const EducationCards = (props) => {
	const {data, loading, user, userId} = props;
	return (
		<Wrapper loading={loading}>
			<ul
				role="list"
				className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 "
			>
				{data.map((item) => (
					<li
						key={item.id}
						className="col-span-1 bg-white rounded-lg  divide-y divide-gray-200"
					>
						<div className="w-full flex items-center justify-between p-6 space-x-6">
							<div className="flex-1 ">
								<div>
									<SingleCard
										key={item.id}
										Age={item.age}
										Info={item.extraInfo}
										Country={item.country}
										Certificate={item.certificate}
										Severity={item.severity}
										Money={item.money}
										Id={item.id}
										PercentageCompleted={item.percentageCompleted}
										user={user}
										userId={userId}
										post={item}
									/>
								</div>

								<p className="mt-1 text-gray-500 text-sm truncate">
									{item.title}
								</p>
							</div>
						</div>
						<div>
							<div className="-mt-px flex divide-x divide-gray-200 hover:bg-indigo-600 shadow-lg  rounded-b-lg ">
								<div className="w-0 flex-1 flex">
									<Link
										to={`/human/education-case/details/${item.id}`}
										className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm bg- text-[#292524] font-bold border border-transparent rounded-bl-lg  hover:bg-[#f2b400] focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm "
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
export default EducationCards;
