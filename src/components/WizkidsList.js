import './WizkidsList.css';
import WizkidsElement from './WizkidsElement';
import { useContext } from 'react';
import WizkidsContext from "../context/wizkids";
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

function WizkidsList() {

  const {wizkids, loading, error} = useContext(WizkidsContext);

  const renderedWizkids = wizkids.map((wizkid) => {
    return (
      <div className='center-wizkids-grid' key={wizkid.id}>
        <WizkidsElement wizkid={wizkid}/>
      </div>
    )
  });


  if(loading) {
    return (
      <div className='wizkids-list-container-error-loading'>
        <SyncLoader color="var(--owow-green)" size="80px" />
      </div>
    );
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