import React from "react";
import { FlatList, StyleSheet } from "react-native";

import OrderDetailsHeader from "./Header";

import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from "../../components/BasketDishItem";

const restaurant = restaurants[0];

const OrderDetails = () => {
	return (
		<FlatList
			ListHeaderComponent={OrderDetailsHeader}
			data={restaurant.dishes}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <BasketDishItem dish={item} />}
		/>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default OrderDetails;
