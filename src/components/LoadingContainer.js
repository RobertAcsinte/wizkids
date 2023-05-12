import { SyncLoader } from 'react-spinners';

function LoadingContainer() {
  return (
    <div className='wizkids-list-container-error-loading'>
      <SyncLoader color="var(--owow-green)" size="80px" />
    </div>
  );
}

export default LoadingContainer;