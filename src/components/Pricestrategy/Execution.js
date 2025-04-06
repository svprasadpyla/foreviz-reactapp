import React, { Component } from "react";

class Execution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minMargin: { underpriced: 120, overpriced: 70, exclusive: 50, market: 20 },
      maxMargin: { underpriced: 100, overpriced: 60, exclusive: 40, market: 15 },
      maxPriceIncrease: { underpriced: 80, overpriced: 50, exclusive: 30, market: 10 },
      maxPriceReduction: { underpriced: 70, overpriced: 40, exclusive: 20, market: 5 }
    };
  }

  handleChange = (category, type, event) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      [category]: { ...prevState[category], [type]: value }
    }));
  };

  render() {
    return (
      <>
      <h6 className="table-heading mt-4 mb-2">Edge case settings</h6>
      <div className="table-responsive res-table mb-5">
        <table className="table hover border-0 tool_listtable Request-table f-table">
          <thead>
            <tr>
              <th className="f-table-striped">Edge case settings</th>
              <th className="f-table-striped">Underpriced parts</th>
              <th className="f-table-striped">Overpriced parts</th>
              <th className="f-table-striped">Exclusive parts</th>
              <th className="f-table-striped">At market</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state).map((category, index) => (
              <tr key={index}>
                <td>{category.replace(/([A-Z])/g, " $1").trim()}</td>
                {Object.keys(this.state[category]).map((type) => (
                  <td key={type}>
                    <div className="input-group">
                      <span className="input-group-text left-top-redius">%</span>
                      <input
                        type="number"
                        className="form-control ml-0"
                        value={this.state[category][type]}
                        onChange={(event) => this.handleChange(category, type, event)}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
  }
}

export default Execution;
