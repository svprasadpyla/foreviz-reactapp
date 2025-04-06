import React, { Component } from "react";

class ValueDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="table-responsive res-table mb-5">
        <table className="table hover border-0 tool_listtable Request-table f-table">
          <thead>
            <tr>
              <th rowSpan={2} className="f-table-striped">Value Driver</th>
              <th rowSpan={2} className="f-table-striped">Value Driver Definition</th>
              <th colSpan={2} className="f-table-striped text-center">Underpriced parts</th>
              <th colSpan={2} className="f-table-striped text-center">Overpriced parts</th>
              <th colSpan={2} className="f-table-striped text-center">Exclusive parts</th>
              <th colSpan={2} className="f-table-striped text-center">At market</th>
            </tr>
            <tr className="text-center">
              <th>Yes</th>
              <th className="f-table-striped">No</th>
              <th>Yes</th>
              <th className="f-table-striped">No</th>
              <th>Yes</th>
              <th className="f-table-striped">No</th>
              <th>Yes</th>
              <th className="f-table-striped">No</th>
            </tr>
          </thead>
          <tbody>
          {[
              { label: "Sales Quantity Champion", definitiontitle: "Top", definition: "20" },
              { label: "Revenue Champion", definitiontitle: "Top", definition: "10" },
              { label: "Price Range", definitiontitle: "Market Density", definition: "50" },
              { label: "High Win-Rate", definitiontitle: "Win rate", definition: "> 70" },
              { label: "Low Win-Rate", definitiontitle: "Win rate", definition: "< 20" },
              { label: "Market Density Underpriced Parts", definitiontitle: "Price points", definition: "> 2" },
              { label: "Market Density Overpriced Parts", definitiontitle: "Price points", definition: "> 4" },
              { label: "Consistency", definitiontitle: "", definition: "" },
              { label: "Result Search method Sensor", definitiontitle: "", definition: "" },
              { label: "Result Search method Deepdive", definitiontitle: "", definition: "" },
              { label: "Exclusive Agreement", definitiontitle: "", definition: "" },
              { label: "Average Lead Time Competitors", definitiontitle: "Market lead time", definition: "> 1" },
              { label: "Markup in %", definitiontitle: "Range", definition: "< -50 % > 400 %" }
            ].map((row, index) => (
              <tr key={index}>
                <td>{row.label}</td>
                <td className="d-flex align-items-center">
                  <span>{row.definitiontitle}</span>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder={row.definition} />
                    <span className="input-group-text right-top-redius">%</span>
                  </div>
                </td>
                {[...Array(4)].map((_, i) => (
                  <td key={i}>
                    <div className="input-group m-auto  ">
                      <input type="number" className="form-control w-50" defaultValue={20} />
                    </div>
                  </td>
                ))}
                {[...Array(4)].map((_, i) => (
                  <td key={i}>
                    <div className="input-group m-auto">
                      <input type="number" className="form-control w-50" defaultValue={0} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ValueDriver;
