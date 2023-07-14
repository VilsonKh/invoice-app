import { useContext } from "react";
import "./DeleteConf.scss";
import invoiceContext from "../../context/invoice/invoiceContext";
import darkContext from "../../context/dark/darkContext";
import { deleteInvoice } from "../../firebase/service";


const ConfirmDelete = ({confClose}) => {
	
	const {currentInvoiceNumber,currentInvoiceId,setDeleteConf,setPreviewInvoice} = useContext(invoiceContext);
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
		<div className={`confirmDelete ${dark ? 'dark-header' : ''}`}>
			<div onClick={onCloseClick} className="confirmDelete__overlay" >
				<div className={`confirmDelete__modal ${dark ? 'dark-header' : ''}`}>
					<h2 className="confirmDelete__title">Confirm Deletion</h2>
					<p className="confirmDelete__text">Are you sure you want to delete invoice #{currentInvoiceNumber}? This action cannot be undone.</p>
					<div className="confirmDelete__buttons">
						<button className="confirmDelete__cancel" >Cancel</button>
						<button style={{'color': 'white !important'}} className="confirmDelete__delete" onClick={onDeleteClick}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDelete;
