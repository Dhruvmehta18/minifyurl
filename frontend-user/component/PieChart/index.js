import React, { memo, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import TelemetryForReferer from "../../lib/chartsOptions/TelemetryForReferrer";

const index = memo(({ data = [] }) => {
  const pieChartOptions = () => {
    let anotherObj = { _id: "name", percentage: "y" };

    let final = data.map((item) => {
      return Object.entries(item).reduce((op, [key, value]) => {
        let newKey = anotherObj[key];
        op[newKey || key] = value || "some";
        return op;
      }, {});
    });
    console.log(final);
    return TelemetryForReferer(final);
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={pieChartOptions()} />
  );
});

export default index;
