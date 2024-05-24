import "./App.css";
import FetchMultipleUrls from "./FetchMultipleUrls";
// import ChatComponent from "./ChatComponent";
import MyContextProvider from "./Provider";
import ThemeShower from "./ThemeShower";
import WeightedAverageShow from "./WeightedAverageShow";
import { Provider } from "react-redux";
import { store } from "./state/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <MyContextProvider>
          <ThemeShower />
          <WeightedAverageShow />
          {/* can only uncommnent when server is running. */}
          {/* <ChatComponent /> */}
          <FetchMultipleUrls />
        </MyContextProvider>
      </Provider>
    </>
  );
}

export default App;
