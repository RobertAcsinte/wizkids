import './WizkidsList.css';
import WizkidsElement from '../WizkidsElement';
import { useContext } from 'react';
import WizkidsContext from "../../context/wizkidsContext";
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import LoadingContainer from '../LoadingContainer';

function WizkidsList() {

  const {wizkids, filteredWizkids, loading, error} = useContext(WizkidsContext);

  let wizkidsToShow = [];
  if(filteredWizkids.length > 0) {
    wizkidsToShow = filteredWizkids;
  }
  else {
    wizkidsToShow = wizkids;
  }

  const renderedWizkids = wizkidsToShow.map((wizkid) => {
    return (
      <div className='center-wizkids-grid' key={wizkid.id}>
        <WizkidsElement wizkid={wizkid}/>
      </div>
    )
  });


  if(loading) {
    return <LoadingContainer />
  }

  if(error != "") {
    return (
      <div className='wizkids-list-container-error-loading'>
        {error}
      </div>
    );
  }

  return (
    <div className='wizkids-list-container'>
      {renderedWizkids}
    </div>  
  );
}

export default WizkidsList;