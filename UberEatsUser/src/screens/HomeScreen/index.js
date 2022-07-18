import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../../assets/data/restaurants.json";

const HomeScreen = () => {
	return (
		<View style={styles.page}>
			<FlatList
				data={restaurants}
				renderItem={({ item }) => <RestaurantItem restaurant={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	page: {
		padding: 10,
	},
});

export default HomeScreen;
