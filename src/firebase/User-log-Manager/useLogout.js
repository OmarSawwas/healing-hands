import {auth} from '../config'
import {signOut} from 'firebase/auth'

export const useLogout = () => {
	const logout = () => signOut(auth)

	return {logout}
}
