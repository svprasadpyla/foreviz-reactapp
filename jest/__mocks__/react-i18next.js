const React = require('react')
const PropTypes = require('prop-types');

const i18nMock = {
  changeLanguage: jest.fn(),
  language: 'en',
}

const useTranslation = () => ({
  t: key => key,
  i18n: {
    changeLanguage: jest.fn(),
    language: 'en',
  },
});

const withTranslation = () => Component => props => <Component t={(key)=>key} i18n={i18nMock} {...props} />

const I18nextProvider = ({ children }) => <>{children}</>;

I18nextProvider.propTypes = {
  children: PropTypes.node,
};

module.exports = {
  useTranslation,
  I18nextProvider,
  withTranslation,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn()
  }
};