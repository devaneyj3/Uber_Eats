import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "lightblue",
		flex: 1,
	},
	handleIndicator: {
		backgroundColor: "grey",
		width: 100,
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
	icon: {
		flexDirection: "row",
		marginBottom: 20,
		alignItems: "center",
	},
	restaurantInfo: {
		fontSize: 25,
		letterSpacing: 1,
		paddingVertical: 20,
	},
	address: {
		fontSize: 20,
		color: "grey",
		fontWeight: "500",
		letterSpacing: 0.5,
		marginLeft: 15,
		textAlign: "center",
	},
	foodItemContainer: {
		borderTopWidth: 1,
		borderColor: "lightgrey",
		paddingTop: 20,
	},
	foodItem: {
		fontSize: 18,
		color: "grey",
		fontWeight: "500",
		letterSpacing: 0.5,
		marginBottom: 5,
	},
	btn_container: {
		marginTop: "auto",
		margingVertical: 30,
		marginHorizontal: 10,
		borderRadius: 10,
	},
	btn: {
		color: "white",
		paddingVertical: 15,
		fontSize: 25,
		fontWeight: "500",
		textAlign: "center",
		letterSpacing: 0.5,
	},
	icon_view: {
		backgroundColor: "green",
		padding: 5,
		borderRadius: 15,
	},
});
