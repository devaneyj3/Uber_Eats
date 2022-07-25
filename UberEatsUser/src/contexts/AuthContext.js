import { createContext, useEffect, useState, useContext } from "react";

import { Auth, DataStore } from "aws-amplify";

import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [dbUser, setDbUser] = useState(null);

	useEffect(() => {
		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then(setAuthUser)
			.catch((err) => console.log(err));
	}, []);
	const sub = authUser?.attributes?.sub;

	useEffect(() => {
		DataStore.query(User, (user) => user.sub("eq", sub)).then((users) =>
			setDbUser(users[0])
		);
	}, [sub]);

	return (
		<AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
