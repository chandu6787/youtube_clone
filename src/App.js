import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchVideo from "./components/WatchVideo";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchVideo />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <Head />
        <RouterProvider router={appRouter}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
