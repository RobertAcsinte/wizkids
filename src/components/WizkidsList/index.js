import './WizkidsList.css';
import WizkidsElement from '../WizkidsElement';
import { useContext, useEffect } from 'react';
import WizkidsContext from "../../context/wizkidsContext";
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import LoadingContainer from '../LoadingContainer';

function WizkidsList() {

  const {wizkids, filteredWizkids , loading, error} = useContext(WizkidsContext);
  let wizkidsToShow = [];

  if(loading) {
    return <LoadingContainer />
  }

  if(filteredWizkids.length > 0) {
    wizkidsToShow = filteredWizkids;
  }
  //just so it won't show nothing found for a split of a second until load is changing in context to fetch data from api
  else if(wizkids.length > 0) {
    return <div>Nothing found</div>
  }

  const renderedWizkids = wizkidsToShow.map((wizkid) => {
    return (
      <div className='center-wizkids-grid' key={wizkid.id}>
        <WizkidsElement wizkid={wizkid}/>
      </div>
    )
  });

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