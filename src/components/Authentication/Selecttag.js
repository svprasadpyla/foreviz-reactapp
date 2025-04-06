import React, { useEffect , useRef } from 'react'
import i18n from '../../lang/i18n';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

function Selecttag(props) {

    const Language = useRef(props?.i18n.language);

    useEffect(() => {
        i18n.changeLanguage(Language.current);
    },[])

    return (
            <Dropdown>
                <Dropdown.Toggle variant="default language-menu p-0" id="dropdown-basic">
                    <img
                        src="../../assets/images/translation/translationIcon.png"
                        alt=""
                        className="dropdown-toggle w26 cursor-pointer" data-toggle="dropdown"

                    />
                </Dropdown.Toggle>

                <Dropdown.Menu className='text-center'>
                    <Dropdown.Item >
                        <button id="changeLanguageEn" className="dropdown-item pt-2 pb-2 cursor-pointer settings-sidebar-button" type="button" 
                            onClick={() => {
                                Language.current = 'en';
                                i18n.changeLanguage('en')
                            }} >
                            English </button>
                    </Dropdown.Item>
                    <Dropdown.Item><button id="changeLanguageJa" className="dropdown-item pt-2 pb-2 cursor-pointer settings-sidebar-button" type="button"
                        onClick={() => { Language.current = 'ja'; i18n.changeLanguage('ja') }}>
                        日本語 </button></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    )
}

Selecttag.propTypes = {
    i18n: PropTypes.shape({
        language: PropTypes.string,
    }),
}

export default withTranslation()(Selecttag)