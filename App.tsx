import MainNavigation from "./src/config/navigation";
import { ThemeProvider } from "./src/config/theme";

const App = () => {
  return (
    <ThemeProvider>
      <MainNavigation />
    </ThemeProvider>
  );
};

export default App;