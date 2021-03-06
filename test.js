import React from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { getData } from "./utils";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    getData().then(data => {
      this.setState({ data },console.log(data[0]));
    });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      console.log();
      <TypeChooser>
        {type => <AreaChartWithEdge type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

render(<ChartComponent />, document.getElementById("root"));
