import React, { Component } from "react";
import { createTagService } from "../../services/tag";
import _ from "lodash";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ManageTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: ''
        };
    }

    handleTagName = (e) => {
        this.setState({ tagName: e.target.value });
    }

    handleCancel = () => {
        this.props.onHide();
    }

    handleSubmit = () => {
        if(this.state.tagName.length === 0){
            toast('Please enter tag name', { type: "error", autoClose: 2000, position: "bottom-right" });
        }else {
            this.handleCreateTag({'tagName':this.state.tagName , 'filters' : this.props.filtersToTag})
        }
    }

    handleCreateTag = async (payload) => {
            try {
                const response = await createTagService(payload);
                if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
                    toast('Tag created successfully', { type: "success", autoClose: 2000, position: "bottom-right" });
                    setTimeout(() => {
                        this.props.onHide();
                    }, 3000);
                }
            } catch (error) {
                this.setState({ listLoader: false });
                // handleApiError(error, this.props);
            }
        };

    render() {
        return (
            <>
            <div className="tag-popup">
            <div className="filter-popup">
                <input
                    type="text"
                    className="filter-input"
                    //value={this.state.filters[column.accessor] || ""}
                    value={this.state.tagName || ""}
                    onChange={(e) => this.handleTagName(e)}
                    placeholder="Tag Name"
                />
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <button type="button" className="btn btn-xs btn-cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button type="button" className="btn btn-xs btn-next" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default ManageTag;