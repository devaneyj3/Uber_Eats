import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import restaurants from "../../../assets/data/restaurants.json";
import DishListItem from "../../components/DishListItem";
import Header from "./header";

const restaurant = restaurants[0];
const RestaurantDetailsScreen = () => {
	return (
		<View style={styles.screen}>
			<FlatList
				ListHeaderComponent={Header}
				data={restaurant.dishes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <DishListItem dish={item} />}
			/>
			<Ionicons
				name="arrow-back-circle"
				size={45}
				color="white"
				style={styles.iconContainer}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	iconContainer: {
		position: "absolute",
		top: 40,
		left: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 5 / 3,
	},
});

export default RestaurantDetailsScreen;
