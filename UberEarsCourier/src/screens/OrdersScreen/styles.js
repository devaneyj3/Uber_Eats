import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "lightblue",
		flex: 1,
	},
	map: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
	},
	icon_view: {
		backgroundColor: "green",
		padding: 5,
		borderRadius: 15,
	},
	handleIndicatorContainer: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	routeDetailsText: {
		fontSize: 25,
		letterSpacing: 1,
	},
	deliveryDetailsContainer: {
		paddingHorizontal: 20,
	},
});

export default styles;
