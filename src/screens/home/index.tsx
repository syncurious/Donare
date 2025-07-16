import { View, Text } from "react-native";
import SplashScreen from "../SplashScreen";
import ThemeExample from "../../components/ThemeExample";
import BaseComponentsExample from "../../components/base/Example";
import GetStarted from "./GetStarted";
import Donate from "./Donate";

export { default as HomeScreen } from "./Home";
export { default as GetStarted } from "./GetStarted";
export { default as Login } from "./Login";
export { default as SignUp } from "./SignUp";
export { default as Volunteer } from "./Volunteer";
export { default as NewPaymentMethod } from "./NewPaymentMethod";
export { Donate };

const HomeScreen = () => {
    return (
        <GetStarted />
        // <SplashScreen isLoading={true} />
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor : "#1E3A8A" }}>
        //     <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Home Screen</Text>
        // </View>
    );
};

export default HomeScreen;