import { Fragment } from "react";
import { useSelector } from "react-redux";

import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";

import UserProfile from "./components/UserProfile";

function App() {
  const authState = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Header />
      {!authState.isAuthenticated && <Auth />}
      {authState.isAuthenticated && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
