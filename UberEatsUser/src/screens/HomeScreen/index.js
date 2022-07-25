import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { DataStore } from "@aws-amplify/datastore";
import { Restaurant } from "../../models";

const HomeScreen = () => {
	const [restaurants, setRestaurants] = React.useState([]);

	useEffect(() => {
		DataStore.query(Restaurant).then((results) => {
			setRestaurants(results);
		});
	}, []);

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
