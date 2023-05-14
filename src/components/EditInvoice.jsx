import invoiceContext from '../context/invoice/invoiceContext';
import '../styles/EditInvoice.scss';
import ButtonBack from './ButtonBack';
import {useContext} from 'react'
import Form from './Form';



const EditInvoice = () => {
  const {currentInvoice, invoices} = useContext(invoiceContext)

  return (
    <div className='editInvoice container'>
      <ButtonBack></ButtonBack>
      <h1>Edit <span>#</span> {currentInvoice}</h1>
      <Form></Form>
    </div>
  )
}

export default EditInvoice