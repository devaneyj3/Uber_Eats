import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import restaurants from "../../../assets/data/restaurants.json";
import DishListItem from "../../components/DishListItem";
import Header from "./header";
import { useRoute, useNavigation } from "@react-navigation/native";

const RestaurantDetailsScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const { id } = route.params;
	const restaurant = restaurants[0];

	return (
		<View style={styles.screen}>
			<FlatList
				ListHeaderComponent={Header}
				data={restaurant.dishes}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => <DishListItem dish={item} />}
			/>
			<Ionicons
				name="arrow-back-circle"
				size={45}
				color="white"
				style={styles.iconContainer}
				onPress={() => navigation.goBack()}
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
