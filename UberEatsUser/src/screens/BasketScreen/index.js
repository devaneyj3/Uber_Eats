import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";

import { useBasketContext } from "../../contexts/BasketContext";

import { useOrdersContext } from "../../contexts/OrdersContext";

import { useNavigation } from "@react-navigation/native";

const BasketScreen = () => {
	const { restaurant, basketDishes, totalBasketPrice } = useBasketContext();
	const navigation = useNavigation();

	const { createOrder } = useOrdersContext();

	const onOrder = () => {
		createOrder();
		navigation.goBack();
	};

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
			<Pressable onPress={onOrder} style={styles.button}>
				<Text style={styles.buttonText}>
					Create Order &#8226; ${totalBasketPrice.toFixed(2)}
				</Text>
			</Pressable>
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
