import "./NoContentFound.css";


function NoContentFound({noContentMessage}){

  return (
    <div className="no-content-found-container">
      <div className="no-content-found">{noContentMessage}</div>
    </div>
  );
}

export default NoContentFound;