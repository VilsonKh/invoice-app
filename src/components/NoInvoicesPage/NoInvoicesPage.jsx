import './NoInvoicesPage.scss'
import illustrationEmpty from '../../assets/illustration-empty.svg'
import darkContext from '../../context/dark/darkContext'
import { useContext } from 'react'
const NoInvoicesPage = () => {
  const {dark} = useContext(darkContext)
  return (
    <div className='container'>
      <div className='nothingPage__container'>
        <img className='nothingPage__img' src={illustrationEmpty} alt="" />
        <p className={`nothingPage__heading ${dark ? "dark-font" : ''}`}>There is nothing here</p>
        <p className='nothingPage__text'>Create an invoice by clicking the <span style={{'fontWeight': 'bold'}}>New</span> button and get started</p>
      </div>
    </div>
  )
}

export default NoInvoicesPage