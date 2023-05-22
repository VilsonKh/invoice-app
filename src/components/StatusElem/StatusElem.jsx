import "./StatusElem.scss";

const StatusElem = ({status}) => {

  let statusText = "";

  if(!status) {
    return statusText = 'Processing...'
  } else {
    statusText = status[0].toUpperCase() + status.slice(1)
  }
   
  return (
    <div className={`item__status-container d-flex align-items-center ${status}-bg`}>
      <div className={`item__status-icon ${status}-icon`}></div>
      <p className={`item__status ${status}-ft`}>{statusText}</p>
    </div>
  );
};

export default StatusElem;