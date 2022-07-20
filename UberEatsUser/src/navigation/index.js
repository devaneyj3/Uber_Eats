import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import BasketScreen from "../screens/BasketScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetails from "../screens/OrderDetailsScreen/OrderDetails";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsPage";

import { Foundation, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Profile from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={HomeTabs} />
		</Stack.Navigator>
	);
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
	return (
		<Tab.Navigator barStyle={{ backgroundColor: "white" }}>
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Foundation name="home" size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Orders"
				component={OrderStackScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="list-alt" size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="user-alt" size={24} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Restaurants" component={HomeScreen} />
			<HomeStack.Screen
				name="Restaurant"
				component={RestaurantDetailsScreen}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen name="Dish" component={DishDetailsScreen} />
			<HomeStack.Screen name="Basket" component={BasketScreen} />
		</HomeStack.Navigator>
	);
};

const orderStack = createNativeStackNavigator();
const OrderStackScreen = () => {
	return (
		<orderStack.Navigator>
			<orderStack.Screen name="Orders" component={OrdersScreen} />
			<orderStack.Screen name="Order" component={OrderDetails} />
		</orderStack.Navigator>
	);
};
export default RootNavigator;
