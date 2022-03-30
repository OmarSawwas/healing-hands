import {useState, useEffect} from "react";
import {
	PencilIcon,
	TrashIcon,
	SearchCircleIcon,
	UserIcon,
} from "@heroicons/react/solid";
import {useNavigate} from "react-router-dom";
import Sidebar from "../../../Components/Layouts/admin.sidebar";
import Wrapper from "../../../Components/Wrapper";
import {db, Users} from "../../../firebase/config";
import {BadgeCheckIcon} from "@heroicons/react/solid";
import Error from "../../NotAuthorized/Error";
import {
	doc,
	onSnapshot,
	query,
	getDocs,
	deleteDoc,
	where,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import {deleteUser, getAuth} from "firebase/auth";

import classNames from "classnames";
const Accounts = (props) => {
	const navigate = useNavigate();
	const {user, userId} = props;

	const [search, setSearch] = useState();
	const [accounts, setAccounts] = useState([]);
	const [adminOnPage, setAdminOnPage] = useState(false);

	const handleChange = (e) => {
		const {value} = e.target;
		setSearch(value);
		if (value === "") {
			getData();
		} else {
			setAccounts(
				accounts.filter((item) =>
					item.email.toLowerCase().trim().includes(value.toLowerCase().trim())
				)
			);
		}
	};

	const getData = async () => {
		if (user) {
			setAdminOnPage(user.isAdmin);
		}
		onSnapshot(Users, (snap) => {
			setAccounts(snap.docs.map((item) => item.data()));
		});
	};

	useEffect(() => {
		getData();
		return () => getData();
	}, [user]);

	const redirectFunction = async (email) => {
		const q = query(Users, where("email", "==", email));
		const document = await getDocs(q);
		document.docs.map(async (item) => {
			navigate(`/profile/${item.id}`);
		});
	};
	const makeAdmin = async (email) => {
		const q = query(Users, where("email", "==", email));
		const document = await getDocs(q);
		document.docs.map(async (item) => {
			const updateRef = doc(Users, item.id);
			await updateDoc(updateRef, {isAdmin: true});
		});
	};
	return (
		<Sidebar>
			{user && user.isAdmin && (
				<div className="px-4 sm:px-6 lg:px-8 ">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto ">
							<div className="text-4xl font-semibold text-white flex justify-center">
								Accounts
							</div>
							<div className="mt-2 text-md text-gray-200 flex justify-center">
								A list of all the users in your account including their name,
								title, email and role.
							</div>
						</div>
					</div>
					<div className="mt-8 flex flex-col">
						<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2  md:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-opacity-100 md:rounded-lg bg-stone-800 ">
									<div className="w-full sm:max-w-xs  justify-center flex-3   ">
										<div className="flex items-center transition-transform py-4 px-2 space-x-2  ">
											<div>
												<input
													type="text"
													value={search}
													name="search"
													id="search"
													onChange={handleChange}
													className={
														"box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block shadow-sm  focus:ring-[#f2b400] focus:border-[#f2b400] sm:max-w-xs sm:text-sm border-gray-300 rounded-md transition-all duration-500 ease-in-out w-[200px] focus:w-[250px]"
													}
													placeholder="search for an email"
												/>
											</div>
										</div>
									</div>
									<div>
										<table className="min-w-full divide-y divide-gray-100 min-h-screen">
											<thead className="bg-[#f2b400] rounded-full">
												<tr>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
													>
														Name
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														Title
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														Account Type
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														Number of Successfull Stories
													</th>
													<th
														scope="col"
														className="relative py-3.5 pl-3 pr-4 sm:pr-6"
													>
														<span className="sr-only">
															{" "}
															<PencilIcon className="w-4 h-4" />
															Edit
														</span>
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white min-h-screen">
												{accounts.map((item) => {
													return (
														<tr key={item.email}>
															<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
																<div className="flex items-center">
																	<div className="h-10 w-10 flex-shrink-0">
																		<img
																			className="h-10 w-10 rounded-full"
																			src={item.image}
																			alt=""
																		/>
																	</div>
																	<div className="ml-4">
																		<div className="font-medium text-gray-900">
																			{`${item.fName} ${item.lName}`}
																		</div>
																		<div className="text-gray-500">
																			{item.email}
																		</div>
																	</div>
																</div>
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																<div className="text-gray-900">{item.work}</div>
																<div className="text-gray-500">
																	{item.department}
																</div>
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																<span className="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 font-bold">
																	{item.isAdmin && (
																		<div className="flex font-bold">
																			<BadgeCheckIcon className="w-5 h-5 text-green-600" />{" "}
																			Admin
																		</div>
																	)}{" "}
																	{!item.isAdmin && (
																		<div className="font-bold">Regular</div>
																	)}
																</span>
															</td>
															<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																{item.role}
															</td>
															<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
																{adminOnPage && (
																	<div className="flex">
																		<button
																			href="#"
																			className="mx-8 text-green-600 font-bold hover:text-green-900 flex"
																			onClick={() => makeAdmin(item.email)}
																		>
																			Make Admin
																		</button>

																		<button
																			href="#"
																			className="text-red-600 hover:text-indigo-900 flex"
																			onClick={() =>
																				redirectFunction(item.email)
																			}
																		>
																			<UserIcon
																				className="w-5 h-5"
																				id={item.email}
																			/>
																			<span className="ml-2">
																				{" "}
																				More Information
																			</span>

																			<span className="sr-only">
																				, {item.name}
																			</span>
																		</button>
																	</div>
																)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{user && !user.isAdmin && <Error />}
			{!user && <Error />}
		</Sidebar>
	);
};

export default Accounts;
