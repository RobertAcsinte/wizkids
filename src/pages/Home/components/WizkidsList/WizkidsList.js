import style from './WizkidsList.module.css';
import WizkidCard from '../WizkidCard/WizkidCard';
import { useContext } from 'react';
import WizkidsContext from "../../../../context/wizkidsContext";
import { SyncLoader } from 'react-spinners';
import CenterContainer from '../../../../components/CenterContainer/CenterContainer';


function WizkidsList() {

  const {filteredWizkids, loading, error} = useContext(WizkidsContext);
  
  if(loading) {
    return (
      <CenterContainer>
        <SyncLoader color="var(--owow-green)" size="80px"/>
      </CenterContainer>
    );
  }

  if(error != null) {
    return (
      <CenterContainer>
        {error}
      </CenterContainer>
    );
  }

  if(filteredWizkids.length <= 0) {
    return (
      <CenterContainer>
        No wizkid found :(
      </CenterContainer>
    );
  }

  const renderedWizkids = filteredWizkids.map((wizkid) => {
    return (
      <div className={style.grid}key={wizkid.id}>
        <WizkidCard wizkid={wizkid}/>
      </div>
    )
  });

  return (
    <div className={style.container}>
      {renderedWizkids}
    </div>  
  );
}

export default WizkidsList;