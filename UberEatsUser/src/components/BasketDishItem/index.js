import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BasketDishItem = ({ dish }) => {
	return (
		<View style={styles.row}>
			<View style={styles.quantityContainer}>
				<Text>1</Text>
			</View>
			<Text style={styles.name}>{dish.name}</Text>
			<Text style={styles.price}>${dish.price}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
	},
	quantity: {
		fontSize: 25,
		marginHorizontal: 20,
	},
	quantityContainer: {
		backgroundColor: "lightgrey",
		paddingHorizontal: 5,
		marginRight: 10,
		paddingVertical: 2,
		borderRadius: 3,
	},
	name: {
		fontWeight: "bold",
	},
	price: {
		marginLeft: "auto",
	},
});

export default BasketDishItem;
