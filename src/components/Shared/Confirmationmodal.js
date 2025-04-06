import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from "prop-types";

const ConfirmationModal = ({ show, title, message, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

ConfirmationModal.propTypes = {
    show:PropTypes.bool,
    title:PropTypes.string,
    message:PropTypes.string,
    onConfirm:PropTypes.func,
    onCancel:PropTypes.func,
}

export default ConfirmationModal;
