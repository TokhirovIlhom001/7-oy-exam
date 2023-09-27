import React from 'react'
import Logo from '../../../public/image/Logo.svg'
import EatlyLogo from '../../../public/image/eatly.svg'
import Instagram from '../../../public/image/Instagram.svg'
import Linkedin from '../../../public/image/Linkedin.svg'
import Facebook from '../../../public/image/Facebook.svg'
import Twiter from '../../../public/image/Twiter.svg'

import Image from 'next/image'

import '../../style/style.scss'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='containers'>
            <div className='site_footer-name'>
                <Image src={Logo} alt='Logo' />
                <Image src={EatlyLogo} alt='EatlyLogo' />
            </div>
            <div className='footer_logo'> 
                <p className='footer_logo-p'>© 2023 EATLY All Rights Reserved.</p>
                <div className='footer_logo-div'>
                    <Image className='footer_logo-img' src={Instagram}  alt='Instagram' />
                    <Image className='footer_logo-img' src={Linkedin}  alt='Linkedin' />
                    <Image className='footer_logo-img' src={Facebook}  alt='Facebook' />
                    <Image className='footer_logo-img' src={Twiter}  alt='Twiter' />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Footer