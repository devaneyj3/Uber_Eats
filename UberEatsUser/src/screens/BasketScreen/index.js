import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";

import { useBasketContext } from "../../contexts/BasketContext";

const BasketScreen = () => {
	const { restaurant, basketDishes, totalBasketPrice } = useBasketContext();

	return (
		<View style={styles.page}>
			<Text style={styles.title}>{restaurant.name}</Text>
			<Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
				Your items
			</Text>
			<FlatList
				data={basketDishes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <BasketDishItem dish={item} />}
			/>
			<View style={styles.seperator} />
			<View style={styles.button}>
				<Text style={styles.buttonText}>
					Create Order &#8226; ${totalBasketPrice.toFixed(2)}
				</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	page: {
		flex: 1,
		width: "100%",
		paddingVertical: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		marginVertical: 10,
	},
	seperator: {
		height: 1,
		backgroundColor: "lightgrey",
		marginVertical: 10,
	},
	button: {
		backgroundColor: "black",
		padding: 20,
		marginTop: "auto",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
	},
});

export default BasketScreen;
