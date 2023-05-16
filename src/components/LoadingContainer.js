import { SyncLoader } from 'react-spinners';
import './LoadingContainer.css';

function LoadingContainer() {
  return (
    <div className='wizkids-list-container-loading'>
      <SyncLoader color="var(--owow-green)" size="80px"/>
    </div>
  );
}

export default LoadingContainer;