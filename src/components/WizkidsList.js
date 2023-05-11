import './WizkidsList.css';
import WizkidsElement from './WizkidsElement';
import { useContext } from 'react';
import WizkidsContext from "../context/wizkids";

function WizkidsList() {

  const {wizkids} = useContext(WizkidsContext);

  const renderedWizkids = wizkids.map((wizkid) => {
    return (
      <div className='center-wizkids-grid' key={wizkid.id}>
        <WizkidsElement wizkid={wizkid}/>
      </div>
    )
  });

  return (
    <div className='wizkids-list-container'>
      {renderedWizkids}
    </div>
  );
}

export default WizkidsList;