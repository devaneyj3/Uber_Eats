import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DishListItem = ({ dish }) => {
	const { name, image, price, description } = dish;
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.description} numberOfLines={2}>
					{description}
				</Text>
				<Text style={styles.price}>${price}</Text>
			</View>
			{image && <Image source={{ uri: image }} style={styles.image} />}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		margin: 10,
		paddingVertical: 10,
		marginVertical: 10,
		marginHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	name: {
		fontWeight: "600",
		fontSize: 16,
		letterSpacing: 0.5,
	},
	description: {
		color: "grey",
		marginVertical: 5,
	},
	price: {
		fontSize: 16,
	},
	image: {
		height: 100,
		aspectRatio: 1,
	},
});

export default DishListItem;
