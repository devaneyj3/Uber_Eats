import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Restaurant, Dish } from "../../models";
import { Ionicons } from "@expo/vector-icons";

import DishListItem from "../../components/DishListItem";
import Header from "./header";
import { useRoute, useNavigation } from "@react-navigation/native";

const RestaurantDetailsScreen = () => {
	const [restaurant, setRestaurant] = useState(null);
	const [dishes, setDishes] = useState([]);
	const navigation = useNavigation();
	const route = useRoute();

	const { id } = route.params;

	useEffect(() => {
		if (id) {
			getRestaurantDetails();
			getDishes();
		}
		getRestaurantDetails();
	}, [id]);

	const getRestaurantDetails = async () => {
		const restaurantRes = await DataStore.query(Restaurant, id);
		setRestaurant(restaurantRes);
	};
	const getDishes = async () => {
		const dishesRes = await DataStore.query(Dish, (dish) =>
			dish.restaurantID("eq", id)
		);

		setDishes(dishesRes);
	};
	if (!restaurant) {
		return <ActivityIndicator size={"large"} color="grey" />;
	}
	return (
		<View style={styles.screen}>
			<FlatList
				ListHeaderComponent={<Header restaurant={restaurant} />}
				data={dishes}
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
