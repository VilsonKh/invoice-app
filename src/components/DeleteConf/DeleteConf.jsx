import { useContext } from "react";
import "./DeleteConf.scss";
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
import { deleteInvoice } from "../../firebase/service";
import { CSSTransition } from "react-transition-group";


const ConfirmDelete = ({confClose}) => {
	
	const {currentInvoiceNumber,currentInvoiceId,setDeleteConf,setPreviewInvoice, isDeleteConf} = useContext(invoiceContext);
	const {dark} = useContext(darkContext)
	
  const onDeleteClick = () => {
    setDeleteConf(false);
    setPreviewInvoice(false);
		deleteInvoice(currentInvoiceId)
  }

  const onCloseClick = () => {
    setDeleteConf(false)
  }

	return (
		<CSSTransition
			in={isDeleteConf}
			timeout={500}
			classNames="confirmation"
			mountOnEnter
			unmountOnExit
		>
		<div className={`confirmDelete`} onClick={onCloseClick}>
				<div className={`confirmDelete__modal ${dark ? 'dark-header' : ''}`}>
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{currentInvoiceNumber}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" >Cancel</button>
						<button style={{'color': 'white !important'}} className="confirmDelete__delete" onClick={onDeleteClick}>Delete</button>
					</div>
				</div>
		</div>
		</CSSTransition>
	);
};

export default ConfirmDelete;
