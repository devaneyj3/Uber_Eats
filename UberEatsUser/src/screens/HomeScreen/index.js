import React from "react";
import { StyleSheet, FlatList } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../../assets/data/restaurants.json";

const HomeScreen = () => {
	return (
		<FlatList
			data={restaurants}
			renderItem={({ item }) => <RestaurantItem restaurant={item} />}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
		/>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default HomeScreen;
