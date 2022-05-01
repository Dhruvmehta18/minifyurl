import Highcharts from "highcharts";

const TelemetryByMonth = (data = []) => {
    const options = {
        chart: {
          type: "column",
          backgroundColor: "#2b3d4b",
          height: 225,
        },
        title: {
          text: "",
        },
        xAxis: {
          type: "datetime",
          startOnTick: true,
          tickInterval: 86400000,
          tickWidth: 1,
          tickColor: "#35637C",
          lineColor: "#35637C",
          dateTimeLabelFormats: {
            day: "%b %e",
          },
          labels: {
            step: 7,
          },
        },
        yAxis: {
          min: 0,
          visible: false,
        },
        tooltip: {
          formatter: function () {
            return (
              Highcharts.dateFormat("%A, %b %e", this.x) +
              "<br/>" +
              "Total Clicks: <b>" +
              this.y +
              "</b>"
            );
          },
          nullFormatter: function () {
            return (
              Highcharts.dateFormat("%A, %b %e", this.x) +
              "<br/>" +
              "Total Clicks: 0"
            );
          },
          outside: true,
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            width: 100,
          },
        },
        series: [
          {
            showInLegend: false,
            name: "",
            data: [...data],
          },
        ],
      };

    return options;
}

export default TelemetryByMonth;