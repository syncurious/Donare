import { View, Text } from "react-native";
import SplashScreen from "../SplashScreen";

const HomeScreen = () => {
    return (
        // <SplashScreen onFinish={() => {
        //     console.log("SplashScreen finished");
        // }} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor : "#1E3A8A" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Home Screen</Text>
        </View>
    );
};

export default HomeScreen;