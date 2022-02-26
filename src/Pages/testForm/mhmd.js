import {doc, setDoc} from 'firebase/firestore'
import {Users} from '../../firebase/config'

/**
 * Returns a promise void.
 *
 * @remarks
 * This method adds a user document into firestore
* @example const data = {
  	fname,
  	lname
	age,
}
*
 * @param data -Data object with user information
 * @returns promise void
 */
export const AddNewUser = async (data, id) => {
	return setDoc(doc(Users, id), data)
}
