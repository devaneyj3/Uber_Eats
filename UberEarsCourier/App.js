import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";

import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure({ ...awsconfig, Analyitics: { disabled: true } });

function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Navigation />
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

export default withAuthenticator(App);
