const TelemetryForReferer = (data = []) => {
  const pieChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
    },
    colors: [
      "#435f72",
      "#496e84",
      "#4f7e96",
      "#538fa8",
      "#579fba",
      "#5bb0cc",
      "#5ec2de",
      "#62d4ef",
      "#65e6ff",
    ],
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      layout: "proximate",
      align: "right",
      floating: true,
    },
    series: [
      {
        name: "Referer Clicks",
        colorByPoint: true,
        innerSize: "60%",
        data: [...data],
      },
    ],
  };
  return pieChartOptions;
};

export default TelemetryForReferer;
