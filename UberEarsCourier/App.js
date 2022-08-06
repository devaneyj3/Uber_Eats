import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import OrdersScreen from "./src/screens/OrdersScreen";

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<OrdersScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		flex: 1,
	},
});
