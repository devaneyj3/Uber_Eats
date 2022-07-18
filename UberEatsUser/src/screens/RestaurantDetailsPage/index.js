import React from "react";
import { View, Text, Image, Flatlist, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import restaurants from "../../../assets/data/restaurants.json";

const restaurant = restaurants[0];
const RestaurantDetailsScreen = () => {
	return (
		<View style={styles.screen}>
			<Image source={{ uri: restaurant.image }} style={styles.image} />
			<View style={styles.iconContainer}>
				<Ionicons
					name="arrow-back-circle"
					size={45}
					color="white"
					style={styles.imageIcon}
				/>
			</View>
			<View style={styles.container}>
				<Text style={styles.title}>{restaurant.name}</Text>
				<Text style={styles.subtitle}>
					${restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
					{restaurant.maxDeliveryTime} minutes
				</Text>
			</View>
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
	title: {
		fontSize: 35,
		fontWeight: "600",
		marginVertical: 10,
	},
	subtitle: {
		fontSize: 15,
		color: "grey",
	},
	container: {
		margin: 10,
	},
});

export default RestaurantDetailsScreen;
