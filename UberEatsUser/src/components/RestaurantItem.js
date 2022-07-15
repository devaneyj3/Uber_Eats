import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const RestaurantItem = ({ restaurant }) => {
	const { name, minDeliveryTime, maxDeliveryTime, deliveryFee, image, rating } =
		restaurant;
	return (
		<View style={styles.restaurantContainer}>
			<Image
				source={{
					uri: image,
				}}
				style={styles.image}
			/>
			<View style={styles.row}>
				<View>
					<Text style={styles.title}>{name}</Text>
					{/* price */}
					<Text style={styles.subtitle}>
						${deliveryFee} &#8226; {minDeliveryTime}-{maxDeliveryTime} minutes
					</Text>
				</View>
				<View style={styles.rating}>
					<Text>{rating}</Text>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	restaurantContainer: {
		width: "100%",
		marginVertical: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 5 / 3,
		marginBottom: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 5,
	},
	subtitle: {
		color: "grey",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	rating: {
		marginLeft: "auto",
		backgroundColor: "lightgray",
		width: 30,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
});

export default RestaurantItem;
