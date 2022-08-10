import React, { useRef, useMemo, useEffect, useState } from "react";
import {
	View,
	Text,
	useWindowDimensions,
	ActivityIndicator,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import {
	FontAwesome5,
	Fontisto,
	Entypo,
	MaterialIcons,
} from "@expo/vector-icons";

import orders from "../../../assets/data/orders.json";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { styles } from "./styles";

const order = orders[0];

const OrdersDeliveryScreen = () => {
	const { height, width } = useWindowDimensions();
	const [driverLocation, setDriverLocation] = useState(null);

	const bottomSheetRef = useRef(null);

	const snapPoints = useMemo(() => ["10%", "95%"], []);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (!status === "granted") {
				console.log("Nonono");
				return;
			}

			let location = await Location.getCurrentPositionAsync();
			setDriverLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		})();
	}, []);
	console.log(driverLocation);
	console.log("order delivery");
	if (!driverLocation) {
		return <ActivityIndicator size={"large"} />;
	}

	return (
		<View style={styles.container}>
			<MapView
				style={{ height, width }}
				showsUserLocation
				followUserLocation
				initalRegion={{
					latitude: driverLocation.latitude,
					longitude: driverLocation.longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				}}>
				<Marker
					coordinate={{
						latitude: order.Restaurant.lat,
						longitude: order.Restaurant.lng,
					}}
					title={order.Restaurant.name}
					description={order.Restaurant.address}>
					<View style={styles.icon_view}>
						<Entypo name="shop" size={24} color="white" />
					</View>
				</Marker>
				<Marker
					coordinate={{
						latitude: order.User.lat,
						longitude: order.User.lng,
					}}
					User
					title={order.User.name}
					description={order.User.address}>
					<MaterialIcons name="person-pin" size={24} color="black" />
				</Marker>
			</MapView>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				handleIndicatorStyle={styles.handleIndicator}>
				<View style={styles.handleIndicatorContainer}>
					<Text style={styles.routeDetailsText}>14 min</Text>
					<FontAwesome5
						name="shopping-bag"
						size={30}
						color="#3FC060"
						style={{ marginHorizontal: 10 }}
					/>
					<Text style={styles.routeDetailsText}>5 km</Text>
				</View>
				<View style={styles.deliveryDetailsContainer}>
					<Text style={styles.restaurantInfo}>{order.Restaurant.name}</Text>
					<View style={styles.icon}>
						<Fontisto name="shopping-store" size={22} color="grey" />
						<Text style={styles.address}>{order.Restaurant.address}</Text>
					</View>
					<View style={styles.icon}>
						<FontAwesome5 name="map-marker-alt" size={30} color="grey" />
						<Text style={styles.address}>{order.User.address}</Text>
					</View>
					<View style={styles.foodItemContainer}>
						<Text style={styles.foodItem}>Onion Rings x1</Text>
						<Text style={styles.foodItem}>Big Mac x3</Text>
						<Text style={styles.foodItem}>Big Tasty x2</Text>
						<Text style={styles.foodItem}>Coca-Cola x1</Text>
					</View>
				</View>
				<View style={styles.btn_container}>
					<Text style={styles.btn}>Accept Order</Text>
				</View>
			</BottomSheet>
		</View>
	);
};

export default OrdersDeliveryScreen;
