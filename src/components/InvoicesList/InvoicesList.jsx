//styles
import './InvoicesList.scss';
//components
import Navigation from '../Navigation/Navigation'
import NoInvoicesPage from '../NoInvoicesPage/NoInvoicesPage';
import InvoicesItem from '../InvoicesItem/InvoicesItem'
//hooks
import { useContext } from 'react';
//context
import invoiceContext from '../../context/invoice/invoiceContext';

const InvoicesList = () => {

  const {invoices, filters,setCurrentInvoiceNumber,setPreviewInvoice} = useContext(invoiceContext);

  const items = () =>{
		if(invoices.length === 0) {
		return <NoInvoicesPage/>
	} else {
		const listItems = invoices.map((invoice) => {
			if(invoice.show === true) {
				const {id, paymentDue, items, clientName, status} = invoice;
					return (
						<InvoicesItem key={id} number={id} dateDue={paymentDue} amount={items[0].price} name={clientName} status={status}></InvoicesItem>
					);
			}
			return false
		});
		return listItems
	}}

	const getCurrentInvoiceNumber = (e) => {
		const target = e.target.closest('.invoicesList__item')
		if(target === null) {
			return
		} else {
			const currentInvoiceNumber = target.getAttribute('number');
			setCurrentInvoiceNumber(currentInvoiceNumber)
		}
		setPreviewInvoice(true);

	}

  return (
    <section className='invoicesList'>
      <Navigation />
      {filters.length > 0 ? <div className='container'>
        {<ul onClick={(e)=>getCurrentInvoiceNumber(e)} className='invoicesList__list'>{items()}</ul>}
      </div> : <NoInvoicesPage/>}
    </section>
  )
}

export default InvoicesList