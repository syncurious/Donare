import { View, Text } from "react-native";
import SplashScreen from "../SplashScreen";
import ThemeExample from "../../components/ThemeExample";
import BaseComponentsExample from "../../components/base/Example";
import GetStarted from "./GetStarted";

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