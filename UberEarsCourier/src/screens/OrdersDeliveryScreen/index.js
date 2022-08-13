import React, { useRef, useMemo, useEffect, useState } from "react";
import {
	View,
	Text,
	useWindowDimensions,
	ActivityIndicator,
	Pressable,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import {
	FontAwesome5,
	Fontisto,
	Entypo,
	MaterialIcons,
	Ionicons,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import orders from "../../../assets/data/orders.json";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { styles } from "./styles";

import MapViewDirections from "react-native-maps-directions";

import { REACT_APP_DIRECTIONS_API } from "@env";

const order = orders[0];

const ORDER_STATUSES = {
	READY_FOR_PICKUP: "READY_FOR_PICKUP",
	ACCEPTED: "ACCEPTED",
	PICKED_UP: "PICKED_UP",
};

const OrdersDeliveryScreen = () => {
	const navigation = useNavigation();
	const { height, width } = useWindowDimensions();
	const [driverLocation, setDriverLocation] = useState(null);
	const [deliveryStatus, setDiveryStatus] = useState(
		ORDER_STATUSES.READY_FOR_PICKUP
	);
	const [totalMinutes, setTotalMinutes] = useState(0);
	const [totalMiles, setTotalMiles] = useState(0);

	const [isDriverClose, setIsDriverClose] = useState(false);

	const bottomSheetRef = useRef(null);
	const mapRef = useRef(null);

	const restaurantLocation = {
		latitude: order.Restaurant.lat,
		longitude: order.Restaurant.lng,
	};

	const deliveryLocation = {
		latitude: order.User.lat,
		longitude: order.User.lng,
	};

	const snapPoints = useMemo(() => ["12%", "95%"], []);

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

		const foregroundSubscription = Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				distanceInterval: 100,
			},
			(updatedLocation) => {
				setDriverLocation({
					latitude: updatedLocation.coords.latitude,
					longitude: updatedLocation.coords.longitude,
				});
			}
		);
		return foregroundSubscription;
	}, []);

	if (!driverLocation) {
		return <ActivityIndicator size={"large"} />;
	}

	const onButtonPress = (order) => {
		if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
			bottomSheetRef.current?.collapse();
			mapRef.current.animateToRegion({
				latitude: driverLocation.latitude,
				longitude: driverLocation.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});
			setDiveryStatus(ORDER_STATUSES.ACCEPTED);
		}
		if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
			bottomSheetRef.current?.collapse();
			setDiveryStatus(ORDER_STATUSES.PICKED_UP);
		}
		if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
			bottomSheetRef.current?.collapse();
			navigation.goBack();
			console.warn("Order finished");
		}
	};

	const renderButtonTitle = () => {
		if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
			return "Accept Order";
		} else if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
			return "Pickup Order";
		} else if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
			return "Complete Delivery";
		}
	};
	const isButtonDisabled = () => {
		if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
			return false;
		}
		if (deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose) {
			return false;
		}
		if (deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose) {
			console.log("Order Picked up and driver is close to destination");
			return false;
		}
		return true;
	};
	return (
		<View style={styles.container}>
			<MapView
				style={{ height, width }}
				ref={mapRef}
				showsUserLocation
				followsUserLocation
				initialRegion={{
					latitude: driverLocation.latitude,
					longitude: driverLocation.longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				}}>
				<MapViewDirections
					origin={driverLocation}
					destination={
						deliveryStatus === ORDER_STATUSES.ACCEPTED
							? restaurantLocation
							: deliveryLocation
					}
					strokeWidth={10}
					waypoints={
						deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP
							? [restaurantLocation]
							: []
					}
					strokeColor="#3FC060"
					apikey={REACT_APP_DIRECTIONS_API}
					onReady={(result) => {
						setIsDriverClose(result.distance <= 0.1);
						setTotalMinutes(result.duration);
						setTotalMiles(result.distance);
					}}
				/>
				<Marker
					coordinate={restaurantLocation}
					title={order.Restaurant.name}
					description={order.Restaurant.address}>
					<View style={styles.icon_view}>
						<Entypo name="shop" size={24} color="white" />
					</View>
				</Marker>
				<Marker
					coordinate={deliveryLocation}
					title={order.User.name}
					description={order.User.address}>
					<MaterialIcons name="person-pin" size={24} color="black" />
				</Marker>
			</MapView>
			{deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP && (
				<Ionicons
					onPress={() => navigation.goBack()}
					name="arrow-back-circle"
					size={45}
					color="black"
					style={{ top: 40, left: 15, position: "absolute" }}
				/>
			)}
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				handleIndicatorStyle={styles.handleIndicator}>
				<View style={styles.handleIndicatorContainer}>
					<Text style={styles.routeDetailsText}>
						{totalMinutes.toFixed(1)} min
					</Text>
					<FontAwesome5
						name="shopping-bag"
						size={30}
						color="#3FC060"
						style={{ marginHorizontal: 10 }}
					/>
					<Text style={styles.routeDetailsText}>
						{totalMiles.toFixed(1)} miles
					</Text>
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
				<Pressable
					onPress={onButtonPress}
					disabled={isButtonDisabled()}
					style={styles.btn_container}>
					<Text
						style={{
							...styles.btn,
							backgroundColor: isButtonDisabled() ? "grey" : "#3FC060",
						}}>
						{renderButtonTitle()}
					</Text>
				</Pressable>
			</BottomSheet>
		</View>
	);
};

export default OrdersDeliveryScreen;
