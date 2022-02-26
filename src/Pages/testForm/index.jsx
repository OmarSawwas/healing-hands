import React, {useState} from "react";
import countries from "../../data/nationality";
import {
	doc,
	setDoc,
	collection,
	getDoc,
	deleteDoc,
	updateDoc,
	query,
	getDocs,
	orderBy,
	limit,
	where,
} from "firebase/firestore";
import {Users, db as FireStore} from "../../firebase/config";
import {AddNewUser} from "./mhmd";
const TestingForm = () => {
	const [formData, setFormData] = useState({
		id: 1,
		fname: "",
		lname: "",
		age: "",
		nationality: "",
	});
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// await setDoc(doc(Users, formData.fname), formData).catch(console.error)
		const docRef = doc(FireStore, "users", "omar");
		// await updateDoc(docRef, {fname: 'Mhmd'})
		// await deleteDoc(docRef)

		const q = query(
			Users,
			orderBy("age"),
			limit(2),
			where("fname", "==", "omar")
		);
		const allUsers = await getDocs(q);
		allUsers.docs.map((item) => {
			console.log(item.data());
		});
		// const data = await getDoc(docRef)
		// console.log(data.data())
		// First parameter is the data to be set
		// Second parameter is the document (doc) id
		await AddNewUser(formData, formData.fname);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="fname">First name</label>
					<input
						type="text"
						onChange={handleChange}
						value={formData.fname}
						name="fname"
						id="fname"
					/>
				</div>
				<div>
					<label htmlFor="lname">Last name</label>
					<input
						type="text"
						onChange={handleChange}
						value={formData.lname}
						name="lname"
						id="lname"
					/>
				</div>
				<div>
					<label htmlFor="age">Age</label>
					<input type="text" onChange={handleChange} name="age" id="age" />
				</div>
				<div>
					<label htmlFor="nationality">Nationality</label>
					<select
						value={formData.nationality}
						onChange={handleChange}
						name="nationality"
					>
						<option hidden disabled selected>
							Select your nationality
						</option>
						{countries.map((item, index) => {
							return (
								<option value={item.value} key={index}>
									{item.label}
								</option>
							);
						})}
					</select>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default TestingForm;
