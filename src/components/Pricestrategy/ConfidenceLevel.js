import React, { Component } from "react";

class ConfidenceLevel extends Component {
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
              <th className="f-table-striped">Value Driver Definition</th>
              <th className="f-table-striped">Quick Win</th>
              <th className="f-table-striped">High Confidence</th>
              <th className="f-table-striped">Low Confidence</th>
              <th className="f-table-striped">Validation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Confidence Score</td>
              <td>
                <div className="input-group">
                <span className="input-group-text left-top-redius">%</span>
                  <input type="number" className="form-control ml-0"  defaultValue={120} />
                </div>
              </td>
              <td>
                <div className="input-group">
                <span className="input-group-text left-top-redius ">%</span>
                  <input type="number" className="form-control ml-0" defaultValue={70} />
                </div>
              </td>
              <td>
                <div className="input-group">
                <span className="input-group-text left-top-redius">%</span>
                  <input type="number" className="form-control ml-0" defaultValue={50} />
                </div>
              </td>
              <td>
                <div className="input-group">
                <span className="input-group-text left-top-redius">%</span>
                  <input type="number" className="form-control ml-0 w-50" defaultValue={20} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ConfidenceLevel;
