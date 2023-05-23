import Navbar from "../../components/Navbar";
import WizkidsList from "./components/WizkidsList/WizkidsList";
import styles from "./Home.module.css";
import Searchbar from "./components/Searchbar/Searchbar";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown";


function HomePage() {

  return (
    <div className={styles.box}>
      <Navbar />
      <div className={`${styles.row} ${styles.content}`}>
          <div className={styles.container}>
            <div className={styles["search-container"]}><Searchbar placeholder="Search by name..." /></div>
            <div className={styles["filter-container"]}><FilterDropdown /></div>
          </div> 
        <WizkidsList />
      </div>
    </div>

  );
}

export default HomePage;