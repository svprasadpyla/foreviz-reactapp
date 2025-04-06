import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DefaultLink extends Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		if (this.props.itemProps.hasSubMenu) {
			this.props.itemProps.toggleSubMenu(e)
		} else {

			this.props.itemProps.activateMe({
				newLocation: this.props.to,
				selectedMenuLabel: this.props.label,
			});
		}
	}
	render() {
		const { itemProps } = this.props
		if (itemProps.id === 'main' || itemProps.id === 'app' || itemProps.id === 'extra' || itemProps.id === 'ui') {
			return (
				itemProps.label
			);
		} else {
			return (
				itemProps.children[0].props.className ?
					<NavLink id = "hasSubMenu" to={`${itemProps.to}`} onClick={(e) => this.onClick(e)} className={`${itemProps.hasSubMenu ? "has-arrow" : ""}`}>
						<i className={itemProps.children[0].props.className} title={itemProps.label}></i>
						<span>{itemProps.label}</span>
					</NavLink> :
					<NavLink id = "label" to={`${itemProps.to}`} onClick={(e) => this.onClick(e)}>
						<span>{itemProps.label}</span>
					</NavLink>
			);
		}
	}
};
const mapStateToProps = state => ({
	subMenuIcon: state.settings.isSubMenuIcon,
	menuIcon: state.settings.isMenuIcon
})

const mapDispatchToProps = dispatch => ({})
DefaultLink.propTypes = {
	to: PropTypes.string,
	label: PropTypes.string, 
	itemProps: PropTypes.oneOfType([
		PropTypes.shape({
			hasSubMenu: PropTypes.bool,
			toggleSubMenu: PropTypes.func,
			activateMe: PropTypes.func,
			to: PropTypes.string,
			label: PropTypes.string,
			id: PropTypes.number,
			children: PropTypes.oneOfType([
				PropTypes.arrayOf(
					PropTypes.oneOfType([
					  PropTypes.shape({
						props: PropTypes.shape({
						  className: PropTypes.string,
						}),
					  }),
					  PropTypes.string,
					  PropTypes.bool,
					])
				),
				PropTypes.oneOf([null, undefined])
			]),
		}),
		PropTypes.oneOf([null, undefined])
	]),
};
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLink);   