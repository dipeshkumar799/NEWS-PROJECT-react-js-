import Nav from "./component/Nav";
import "./App.css";
import Newsitem from "./component/Newsitem";

function App() {
  return (
    <>
      <Nav />
      <Newsitem pageSize="12" country="us" />
    </>
  );
}

export default App;
