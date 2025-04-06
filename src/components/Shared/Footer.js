import React, { Component } from 'react';


class Footer extends Component {

    render() {

        return (

            <div className='footer-section'>
            <div className='footer-align'>
                <div className='d-flex align-items-center justify-content-between px-3 py-2'>
                    <div className='fs-8'>Copyright ©2025 FOREVIZ. All rights reserved.</div>
                    <div className='footer-icons'>
                        <img src="../assets/images/icons/icon-footer1.svg"/>
                        <img src="../assets/images/icons/icon-footer2.svg"/>
                        <img src="../assets/images/icons/icon-footer3.svg"/>
                        <img src="../assets/images/icons/icon-footer4.svg"/>
                    </div>
                </div>
                </div>
            </div>

        )

    }

}

export default Footer;