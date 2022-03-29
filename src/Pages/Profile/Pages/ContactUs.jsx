import React from "react";
import Sidebar from "../../../Components/Layouts/admin.sidebar";
import {ContactUs} from "../../../firebase/config";
import {query, onSnapshot, doc} from "firebase/firestore";
import {db} from "../../../firebase/config";
import {async} from "@firebase/util";
import {useState, useEffect} from "react";
import {XCircleIcon} from "@heroicons/react/outline";
import {MailIcon, PhoneIcon} from "@heroicons/react/solid";
import Pops from "../../../Components/Pops";
import Error from "../../NotAuthorized/Error";
const ContactUsPage = (props) => {
	const {user, userId} = props;
	const [propOpen, setPropOpen] = useState(false);
	const [docRef, setDocRef] = useState("");
	const [data, setData] = useState();
	const getData = async () => {
		const q = query(ContactUs);
		await onSnapshot(q, (documents) => {
			setData(
				documents.docs.map((item) => {
					const docData = item.data();
					return {
						id: item.id,
						...docData,
					};
				})
			);
		});
	};
	const deletePost = async (e) => {
		const docRef1 = doc(db, "ContactUs", e.target.id);

		setDocRef(docRef1);
		setPropOpen(true);
	};
	useEffect(() => {
		getData();
		return () => getData();
	}, []);

	return (
		<Sidebar>
			{user && user.isAdmin && (
				<div>
					<Pops docRef={docRef} setPropOpen={setPropOpen} propOpen={propOpen} />
					{data && (
						<ul
							role="list"
							className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ml-4"
						>
							{data.map((item, index) => (
								<li
									key={index}
									className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
								>
									<div className="flex justify-end">
										<button value="about">
											<XCircleIcon
												className="flex-shrink-0  h-8 w-8  text-red-500 hover:text-sky-500"
												aria-hidden="true"
												id={item.id}
												onClick={deletePost}
											/>
										</button>{" "}
									</div>
									<div className="w-full flex items-center justify-between p-6 space-x-6">
										<div className="flex-1 truncate border-2 rounded-md p-2">
											<div className="flex items-center space-x-3 justify-center ">
												<div className="text-gray-900 text-sm font-medium truncate ">
													{item.name}
												</div>
											</div>
											<div className=" mt-2 p-2">
												<p className="mt-1 text-gray-500 text-sm truncate">
													{item.email}
												</p>
												<p className="mt-1 text-gray-500 text-sm truncate">
													{item.phone}
												</p>
												<p className="mt-1 text-gray-500 text-sm flex-wrap">
													{item.message}
												</p>
											</div>
										</div>
									</div>
									<div>
										<div className="-mt-px flex divide-x divide-gray-200">
											<div className="w-0 flex-1 flex">
												<a
													href={`mailto:${item.email}`}
													className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm bg- text-[#292524] font-bold border border-transparent rounded-bl-lg  hover:bg-[#f2b400] focus:ring-[#f2b400] focus:border-[#f2b400] sm:text-sm "
												>
													<MailIcon
														className="w-5 h-5 text-gray-800"
														aria-hidden="true"
													/>
													<span className="ml-3">Email</span>
												</a>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
					{!data && <div>No Messages in your dashboard</div>}
				</div>
			)}
			{user && !user.isAdmin && <Error />}
			{!user && <Error />}
		</Sidebar>
	);
};

export default ContactUsPage;
