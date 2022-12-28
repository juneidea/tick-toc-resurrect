import React from 'react'
import './styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/tick-toc/tick-toc2"
      >
        Tick-Toc
      </a>{' '}
      by{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/juneidea"
      >
        June Suparoek
      </a>,
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/celipas"
      >
        {' '}
        Chris Elipas
      </a>,
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/EvanAlto"
      >
        {' '}
        Evan Alto
      </a>
    </div>
  )
}

export default Footer
