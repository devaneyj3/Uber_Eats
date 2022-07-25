import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "@aws-amplify/datastore";
import { Dish } from "../../models";

const DishDetailsScreen = () => {
	const [dish, setDish] = useState(null);

	const navigation = useNavigation();
	const [quantity, setQuantity] = React.useState(1);

	const route = useRoute();

	const { id } = route.params;

	useEffect(() => {
		if (id) {
			getDishDetails();
		}
	}, [id]);
	const getDishDetails = async () => {
		const dishRes = await DataStore.query(Dish, id);
		setDish(dishRes);
	};

	const onMinus = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const onPlus = () => {
		setQuantity(quantity + 1);
	};
	//  calculate total price
	const getTotalPrice = () => {
		return (quantity * dish.price).toFixed(2);
	};
	const onPress = () => {
		navigation.navigate("Basket");
	};
	if (!dish) {
		return <ActivityIndicator size={"large"} color="grey" />;
	}
	return (
		<View style={styles.page}>
			<Text style={styles.title}>{dish.name}</Text>
			<Text style={styles.description}>{dish.description}</Text>
			<View style={styles.seperator} />
			<View style={styles.row}>
				<AntDesign
					name="minuscircleo"
					size={60}
					color={"black"}
					onPress={onMinus}
				/>
				<Text style={styles.quantity}>{quantity}</Text>
				<AntDesign
					name="pluscircleo"
					size={60}
					color={"black"}
					onPress={onPlus}
				/>
			</View>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonText}>
					Add {quantity} to basket &#8226; ${getTotalPrice()}
				</Text>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	page: {
		flex: 1,
		width: "100%",
		paddingVertical: 30,
	},
	title: {
		fontSize: 30,
		fontWeight: "600",
		marginVertical: 10,
	},
	seperator: {
		height: 1,
		backgroundColor: "lightgrey",
		marginVertical: 10,
	},
	description: {
		color: "grey",
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50,
	},
	quantity: {
		fontSize: 25,
		marginHorizontal: 20,
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

export default DishDetailsScreen;
