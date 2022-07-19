import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import BasketScreen from "./src/screens/BasketScreen";
import DishDetailsScreen from "./src/screens/DishDetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import RestaurantDetailsScreen from "./src/screens/RestaurantDetailsPage";

export default function App() {
	return (
		<View style={styles.container}>
			{/* <HomeScreen /> */}
			{/* <RestaurantDetailsScreen />
			 */}
			{/* <DishDetailsScreen /> */}
			{/* <BasketScreen /> */}
			<OrdersScreen />
			<StatusBar style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
