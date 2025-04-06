import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { CSVLink } from 'react-csv';
import _ from "lodash";
import { createInventoryService } from "../../services/inventory";

const headers = [
    
]

const userData = [
    
]

const UploadInventory = (props) => {
    const [selectedFile, setSelectedFile] = React.useState({});
    const [isConnecting, setIsConnecting] = React.useState(false);

    const handleFileChange = (event) => {
        if (event?.target?.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast('Please select a file to upload', { type: "error", autoClose: 2000, position: "bottom-right" });
            return;
        }

        if (selectedFile.name.endsWith(".xlsx")) {
            setIsConnecting(true);
            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                const response = await createInventoryService(formData);
                console.log("Upload response:", response);
                if (response && response.status === "success") {
                    toast("File uploaded successfully", { type: "success", autoClose: 2000, position: "bottom-right" });
                    // setSelectedFile({});
                    // props.onHide("File uploaded successfully");
                } else {
                    // setSelectedFile({});
                    // props.onHide("Failed to upload file");
                    toast("Failed to upload file", { type: "error", autoClose: 2000, position: "bottom-right" });
                }
            } catch (error) {
                // setSelectedFile({});
                // props.onHide("Error uploading file");
                console.error("Error uploading file:", error);
                toast("Error uploading file", { type: "error", autoClose: 2000, position: "bottom-right" });
            } finally {
                setIsConnecting(false);
            }
        } else {
            toast('Please select a valid XLSX file', { type: "error", autoClose: 2000, position: "bottom-right" });
        }
    };

    const handleUploadClick = () => {
        document.getElementById("upload-file").click();
    };

    const handleCancel = () => {
        setSelectedFile({});
        props.onHide();
    }

    const handleDownload = () => {
        const data = userData.map(row => ({
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            reportsTo: row.reportsTo,
            empId: row.empId,
            department: row.department,
            orgRole: row.orgRole
        }))
        console.log('data', data)

        const csvdata = csvFile(data);
        download(csvdata);
    }

    const csvFile = (data) => {
        let csvRows = [];
        const headers = Object.keys(Object.assign({}, ...data));
        csvRows.push(headers.join(','));
        data.map((m) => {
            const values = Object.values(m).join(',')
            csvRows.push(values)
            console.log('values', csvRows)
            return csvRows.join('\n')
        })
        return csvRows.join('\n')
    }

    const download = (data) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'Sample.csv');
        a.click()
    }

    return (
        <>
            {isConnecting && <div className='vertical-align-wrap overlay spinner'>
                <div className='vertical-align-middle'>
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-spin font-28'></i> <span>Connecting</span>
                    </div>
                </div>
            </div>}
            <ToastContainer />

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>

                    <div className="upload-file-container">
                        <div
                            id="uploadFileClick"
                            className="text-center upload_document p-4 cursor-pointer"
                            onClick={handleUploadClick}
                        >
                            <span>
                                {/* <i className="fa fa-image"></i> */}
                                <img alt="" src="../../assets/images/Garage_Icons/fileupload.svg" />
                            </span>
                            <h6 className="mb-1">Upload Personnel File</h6>
                            <p className="font-size-12">CSV, XLS</p>
                            <p className="font-size-12">{!$.isEmptyObject(selectedFile) ? selectedFile.name : ''}</p>
                        </div>

                        <input
                            id="upload-file"
                            className="cursor-pointer h-0-px"

                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between border-0 mt-3 p-6">


                    <button name="cancelOnBoardModal" className="btn btn-sm btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button
                        name="employeeOnBoardSubmit"
                        type="button"
                        className="btn btn-sm btn-next ml-2"
                        onClick={handleSubmit}
                    >
                        Finish
                    </button>

                </Modal.Footer>




            </Modal>
        </>
    );
};

export default UploadInventory;