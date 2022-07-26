import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrdersContextProvider from "./src/contexts/OrdersContext";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
	return (
		<AuthContextProvider>
			<BasketContextProvider>
				<OrdersContextProvider>
					<NavigationContainer>
						<RootNavigator />
						<StatusBar style="light" />
					</NavigationContainer>
				</OrdersContextProvider>
			</BasketContextProvider>
		</AuthContextProvider>
	);
};

export default withAuthenticator(App);
