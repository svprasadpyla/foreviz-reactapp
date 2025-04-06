import React, { Component } from "react";
import { getInventoryListService } from "../../services/inventory";
import _ from "lodash";
import PaginatedList from "../Shared/pagination";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteDetails: {},
      activeIndex: null,
      selectedProductIds: [],
      selectedProductList: [],
      page: 0,
      size: 10,
      totalRecords: 10,
      filterToTagList: [],
      catalogueItems: [
        { id: 1, name: "X-ray Scanner Parts", icon: "🔍", active: true },
        { id: 2, name: "Power Supply Unit & Batteries", icon: "🔋", active: false },
        { id: 3, name: "Metal Detector Parts", icon: "🟧", active: false },
        { id: 4, name: "Baggage Handling System Parts", icon: "📦", active: false },
        { id: 5, name: "Explosives & Narcotics Detector Parts", icon: "🚨", active: false },
      ],
      products: [],
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ quoteDetails: this.props.quoteDetails });
    this.handleInventoryData({ "page": 0, "size": this.state.size, "filters": this.state.filterToTagList });
  }

  handlePageClick = (page) => {
    this.handleInventoryData({ "page": page.selected, "size": this.state.size, "filters": this.state.filterToTagList });
  }

  handleInventoryData = async (payload) => {
    try {
      const response = await getInventoryListService(payload);
      if (response && !_.isEmpty(response.data) && response.status.toLowerCase() === "success") {
        console.log("Inventory List", response.data);
        this.setState({ products: response.data.parts, totalRecords: response.data.totalItems });
      }
    } catch (error) {
      this.setState({ listLoader: false });
      // handleApiError(error, this.props);
    }
  };

  handleClick = (index) => {
    this.setState({
      activeIndex: index,
      catalogueItems: this.state.catalogueItems.map((item, i) => ({
        ...item,
        active: i === index,
      })),
    });
  };

  handleFileUpload = () => {
    this.fileInputRef.current.click();
  };

  handleCancel = () => {
    this.props.onHide();
  }

  handleNext = () => {
    if (this.state.selectedProductIds.length === 0) {
      toast('Select atleast one part', { type: "error", autoClose: 2000, position: "bottom-right" });
    } else {
      this.props.handleInputs(this.state.selectedProductList, "partIds");
      this.props.productsSelected(this.state.selectedProductList, "selectedProductList");
      this.props.onNext();
    }
  }

  handleInputs = (e, field) => {
    this.props.handleInputs(e.target.value, field);
  };

  handleCheckboxChange = (id, position) => {
    this.setState((prevState) => {
      // Find the product object by id
      const product = prevState.products.find((product) => product.id === id);

      // Check if the product is already in the selectedProductList
      const isSelected = prevState.selectedProductList.some(
        (selectedProduct) => selectedProduct.id === id
      );

      return {
        // Toggle product selection
        selectedProductList: isSelected
          ? prevState.selectedProductList.filter(
            (selectedProduct) => selectedProduct.id !== id
          ) // Remove product if already selected
          : [...prevState.selectedProductList, product], // Add product if not selected
        // Additionally, toggle the product id in selectedProductIds for consistency
        selectedProductIds: isSelected
          ? prevState.selectedProductIds.filter((productId) => productId !== id)
          : [...prevState.selectedProductIds, id],
      };
    });
  };


  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const isAllSelected = prevState.selectedProductIds.length === prevState.products.length;
      return {
        selectedProductIds: isAllSelected ? [] : prevState.products.map((product) => product.id),
        selectedProductList: prevState.products
      };
    });
  };

  render() {
    // const iconTypes = [
    //   { className: "grid filter-item", src: "../assets/images/foreviz/icon-grid.svg", alt: "Grid" },
    //   { className: "list filter-item", src: "../assets/images/foreviz/icon-list.svg", alt: "List" },
    //   { className: "sort filter-item", src: "../assets/images/foreviz/icon-az.svg", alt: "Sort A-Z" },
    //   { className: "upload filter-item", src: "../assets/images/foreviz/icon-upload.svg", alt: "Upload", onClick: this.handleFileUpload },
    // ];

    const { products, selectedProductIds, catalogueItems } = this.state;

    return (
      <>
        {/* Filter section with icons */}
        {/* <div className="text-end">
          <ul className="filter-section">
            {iconTypes.map((icon, index) => (
              <li key={index} className={icon.className} onClick={icon.onClick || null}>
                <img src={icon.src} alt={icon.alt} />
              </li>
            ))}
          </ul>
          <input type="file" ref={this.fileInputRef} style={{ display: "none" }} />
        </div> */}

        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
          {/* Search Box */}
          <div className="search-box">
            <input type="text" className="search-input" placeholder="Search Catalogue..." />
            <button className="search-button">🔍</button>
          </div>

          {/* Catalogue Items */}
          {/* <div className="catalogue-names">
            {catalogueItems.map((item, index) => (
              <div
                key={item.id}
                className={`catalogue-item ${item.active ? "active" : ""}`}
                onClick={() => this.handleClick(index)}
              >
                <span className="icon">{item.icon}</span>
                <span className="name">{item.name}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Product Table */}
        <div className="table-container">
          <table className="table hover border-0 tool_listtable Request-table f-table">
            <thead>
              <tr>
                <th className="w-20">
                  <div class="custom-check-box">
                    <label>
                      <input
                        type="checkbox"
                        onChange={this.handleSelectAllChange}
                        checked={selectedProductIds.length === products.length}
                      />
                    </label>
                  </div>
                </th>
                <th className="pl-0">Product</th>
                <th className="pl-0">Price</th>
                <th className="pl-0">Discount</th>
              </tr>
            </thead>
            <tbody>
              {products.length !== 0 ? (
                products.map((product, position) => (
                  <tr key={product.id}>
                    <td className="w-20">
                      <div class="custom-check-box">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedProductIds.includes(product.id)}
                            onChange={() => this.handleCheckboxChange(product.id, position)}
                          />
                        </label>
                      </div>

                    </td>
                    <td className="pl-0">
                      {product.partName}

                    </td>
                    <td className="pl-0">
                      {product.price}

                    </td>
                    <td className="pl-0">
                      {product.discount}%

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Data not available</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
        {this.state.totalRecords > 10 &&
          (
            <div className='Onboard-pagenation multi-pagenation pagination-container mt-3'>
              <PaginatedList
                previousClassName="pagination-prev"
                nextClassName="pagination-next"
                breakLabel="..."
                page={this.state.page}
                size={this.state.size}
                totalRecords={this.state.totalRecords}
                handlePageClick={this.handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          )
        }
        <div className=" mt-3 d-flex justify-content-end">

          <button className="btn btn-cancel btn-sm mr-2" onClick={() => this.handleCancel()}>Back</button>
          <button className="btn btn-next btn-sm" onClick={() => this.handleNext()}>Next</button>
        </div>
        {this.state.totalRecords > 10 &&
          (
            <div className='Onboard-pagenation multi-pagenation pagination-container mt-3'>
              <PaginatedList
                previousClassName="pagination-prev"
                nextClassName="pagination-next"
                breakLabel="..."
                page={this.state.page}
                size={this.state.size}
                totalRecords={this.state.totalRecords}
                handlePageClick={this.handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          )
        }
      </>
    );
  }
}

export default ProductSelection;
