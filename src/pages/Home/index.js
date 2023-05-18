import Navbar from "../../components/Navbar";
import WizkidsList from "../../components/WizkidsList";
import "./Home.css";
import Searchbar from "../../components/Searchbar";


function Home() {

  return (
    <div>
      <Navbar />
      <Searchbar />
      <WizkidsList />
    </div>
  );
}

export default Home;