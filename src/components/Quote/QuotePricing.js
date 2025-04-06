import React, { Component } from "react";

class QuotePricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      selectedProducts: [],
      products: [],
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      products: this.props.selectedProducts.map(product => ({
        ...product,
        volume: 1, partId: product.id, listPrice: product.price, totalPrice: product.price,
        totalDiscount: ((product.price)*(product.discount))/100
      }))
    });
  }

  //Change of product selection
  handleCheckboxChange = (id) => {
    this.setState((prevState) => {
      const isSelected = prevState.parts.includes(id);
      return {
        selectedProducts: isSelected
          ? prevState.selectedProducts.filter((productId) => productId !== id)
          : [...prevState.selectedProducts, id],
      };
    });
  };

  handleFileUpload = () => {
    this.fileInputRef.current.click();
  };

  handleCancel = () => {
    this.props.onHide();
  };

  handleNext = () => {
    this.props.handleInputs(this.state.products, "parts");
    this.props.onNext();
  };

  //Increment product by 1 
  incrementProductByOne = (position) => {

    const updatedProducts = this.state.products.map((product, index) => {
      if (index === position) {
        let finalPrice = ((product.price)*(product.volume + 1));
        let finalDiscount = finalPrice*(product.discount);
        return { ...product, volume: product.volume + 1, totalPrice: finalPrice, totalDiscount:finalDiscount/100 };
      }
      return product;
    });

    this.setState({ products: updatedProducts });
  };

  //Decrement product by 1
  decrementProductByOne = (position) => {

    const updatedProducts = this.state.products.map((product, index) => {
      if (index === position) {
        let finalPrice = ((product.price)*(product.volume - 1));
        let finalDiscount = finalPrice*(product.discount);
        return { ...product, volume: product.volume - 1, totalPrice: finalPrice, totalDiscount:finalDiscount/100 };
      }
      return product;
    });

    this.setState({ products: updatedProducts });
  };

  render() {
    const { products, selectedProducts } = this.state;

    return (
      <>
        {/* Filter section with icons */}
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
          {/* Search Box */}
          <div className="search-box">
            <input type="text" className="search-input" placeholder="Search Catalogue..." />
            <button className="search-button">🔍</button>
          </div>
          <div className="text-end">
            <ul className="filter-section">
              {/* Icons for filter */}
              <li className="grid filter-item" onClick={this.handleFileUpload}>
                <img src="../assets/images/foreviz/icon-grid.svg" alt="Grid" />
              </li>
            </ul>
            <input type="file" ref={this.fileInputRef} style={{ display: "none" }} />
          </div>
        </div>

        {/* Product Table */}
        <div className="table-responsive">
          <table className="table hover border-0 tool_listtable Request-table f-table">
            <thead>
              <tr>
                <th className="w-20">
                  <div className="custom-check-box">
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          this.setState({
                            selectedProducts: e.target.checked ? products.map((p) => p.id) : [],
                          });
                        }}
                        checked={selectedProducts.length === products.length}
                      />
                    </label>
                  </div>
                </th>
                <th className="pl-0">Product</th>
                <th className="pl-0">Volume</th>
                <th className="pl-0">Price</th>
                <th className="pl-0">Discount</th>
                <th className="pl-0">Total Price</th>
                <th className="pl-0">Total Discount</th>
              </tr>

            </thead>
            <tbody>
              {this.state.products.length !== 0 ? (
                this.state.products.map((product, position) => (
                  <tr key={product.id}>
                    <td className="w-20">
                      <div className="custom-check-box">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => this.handleCheckboxChange(product.id)}
                          />
                        </label>
                      </div>
                    </td>
                    <td className="pl-0">
                      {product.partName}
                    </td>
                    <td className="pl-0 flex-align">
                      <div className="circle" onClick={() => this.decrementProductByOne(position)}>-</div>
                      <div className="circle-values">{product.volume}</div>
                      <div className="circle" onClick={() => this.incrementProductByOne(position)}>+</div>
                    </td>
                    <td className="pl-0">{product.price}</td>
                    <td className="pl-0">{product.discount}%</td>
                    <td className="pl-0">{product.totalPrice}</td>
                    <td className="pl-0">{product.totalDiscount}</td>
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

        {/* Buttons */}
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-cancel btn-sm mr-2" onClick={this.handleCancel}>
            Cancel
          </button>
          <button className="btn btn-next btn-sm" onClick={this.handleNext}>
            Next
          </button>
        </div>
      </>
    );
  }
}

export default QuotePricing;
