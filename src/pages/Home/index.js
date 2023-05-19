import Navbar from "../../components/Navbar";
import WizkidsList from "../../components/WizkidsList";
import "./Home.css";
import Searchbar from "../../components/Searchbar";
import FilterDropdown from "../../components/FilterDropdown";


function Home() {

  return (
    <div>
      <Navbar />
      <Searchbar />
      <FilterDropdown />
      <WizkidsList />
    </div>
  );
}

export default Home;