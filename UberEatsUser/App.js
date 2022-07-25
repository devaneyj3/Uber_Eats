import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import AuthContextProvider from "./src/contexts/AuthContext";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<RootNavigator />
				<StatusBar style="light" />
			</NavigationContainer>
		</AuthContextProvider>
	);
};

export default withAuthenticator(App);
