import { useSelector } from "react-redux";
import { Login, Navbar } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const isLogged = useSelector((state) => state.auth.status);

  return (
    <>
      {isLogged ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
