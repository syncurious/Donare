import MainNavigation from "./src/config/navigation";
import { ThemeProvider } from "./src/config/theme";
import {Platform, View} from 'react-native'

const App = () => {
  return (
    <ThemeProvider>
        <View style={{flex : 1,paddingTop : Platform.OS == 'ios' ? 30 : 0}}>
            <MainNavigation />
        </View>
    </ThemeProvider>
  );
};

export default App;