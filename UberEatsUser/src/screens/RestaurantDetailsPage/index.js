import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Restaurant, Dish } from "../../models";
import { Ionicons } from "@expo/vector-icons";

import DishListItem from "../../components/DishListItem";
import Header from "./header";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useBasketContext } from "../../contexts/BasketContext";

const RestaurantDetailsScreen = () => {
	const [restaurant, setRestaurant] = useState(null);
	const [dishes, setDishes] = useState([]);

	const route = useRoute();
	const navigation = useNavigation();

	const id = route.params?.id;

	const {
		setRestaurant: setBasketRestaurant,
		basket,
		basketDishes,
	} = useBasketContext();
	useEffect(() => {
		if (!id) {
			return;
		}
		setBasketRestaurant(null);
		// fetch the restaurant with the id
		DataStore.query(Restaurant, id).then(setRestaurant);

		DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
			setDishes
		);
	}, [id]);

	useEffect(() => {
		setBasketRestaurant(restaurant);
	}, [restaurant]);

	if (!restaurant) {
		return <ActivityIndicator size={"large"} color="gray" />;
	}

	const viewBasket = () => {
		navigation.navigate("Basket");
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
			{basket && (
				<Pressable style={styles.button} onPress={viewBasket}>
					<Text style={styles.buttonText}>
						Open basket #({basketDishes.length})
					</Text>
				</Pressable>
			)}
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

export default RestaurantDetailsScreen;
