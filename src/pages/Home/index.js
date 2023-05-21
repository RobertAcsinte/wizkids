import Navbar from "../../components/Navbar";
import WizkidsList from "../../components/WizkidsList";
import "./Home.css";
import Searchbar from "../../components/Searchbar";
import FilterDropdown from "../../components/FilterDropdown";


function Home() {

  return (
    <div>
      <Navbar />
      <div className="searchbar-container">
        <div className="search"><Searchbar placeholder="Search by name..." /></div>
        <div className="filter-search"><FilterDropdown /></div>
      </div>    
      <WizkidsList />
    </div>
  );
}

export default Home;