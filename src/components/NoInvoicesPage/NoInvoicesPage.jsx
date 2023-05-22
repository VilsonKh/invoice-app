import './NoInvoicesPage.scss'
import illustrationEmpty from '../../assets/illustration-empty.svg'
const NoInvoicesPage = () => {
  return (
    <div className='container'>
      <div className='nothingPage__container'>
        <img className='nothingPage__img' src={illustrationEmpty} alt="" />
        <p className='nothingPage__heading'>There is nothing here</p>
        <p className='nothingPage__text'>Create an invoice by clicking the <span style={{'fontWeight': 'bold'}}>New</span> button and get started</p>
      </div>
    </div>
  )
}

export default NoInvoicesPage