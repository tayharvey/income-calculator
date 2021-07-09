import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {formatMoney} from "../../utils/formatting";
import highchartsMore from 'highcharts/highcharts-more';
import ChartMarker from "../../../icons/chart-marker.svg";
import ChartMarkerSecondary from "../../../icons/chart-marker-secondary.svg";

highchartsMore(Highcharts);

export const Chart = ({data}) => {

  const xCategories = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "" // Extra value to have extra space on the right side of chart
  ];

  const round = (number) => {
    return Math.round(number * 100) / 100
  }

  const toSumArray = (currentArray) => {
    if (!currentArray.length) return []

    let newArray = [];
    let prevVal = 0;


    for (let value of currentArray) {
      let newVal = value + prevVal;
      newArray.push(round(newVal));
      prevVal = newVal;
    }
    return newArray;
  };

  /* This function properly formats data for arearange series
     Format: [[key, lower, upper]]

     The whole range from January to December is calculated.
     The data from past months will be hidden in chart series options
  */
  const rangeData = (projected, lower, upper) => {
    let range = []
    let prevLower = 0
    let prevUpper = 0
    const currentMonth = (new Date()).getMonth() + 1

    for (let key of Object.keys(lower)) {
      let newUpper = 0
      let newLower = 0

      // The range should be computed so as to grow starting from "Today", not Jan.
      if (key < currentMonth) {
        newUpper = prevUpper + projected[key]
        newLower = prevLower + projected[key]
      } else {
        newUpper = prevUpper + upper[key]
        newLower = prevLower + lower[key]
      }
      const x = parseInt(key)  //x values are calculated from 0, whereas keys start from 1, so we need to handle it

      prevLower = newLower
      prevUpper = newUpper
      range.push([x, newLower, newUpper])

    }
    return range
  }

  const getPrevxCategoriesElem = (val) => {
    const nameIndex = xCategories.indexOf(val)
    if (nameIndex === -1 || nameIndex - 1 < 0)
      return 'ERROR'
    return xCategories[nameIndex - 1]
  }

  const getMonthIndex = (month) => {
    return xCategories.indexOf(month)
  }

  const currentDayPosition = () => {
    let currentDate = new Date()

    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    let maxDayInMonth = months[currentMonth]

    if (currentYear % 4 === 0 && currentMonth === 1) {
      maxDayInMonth = 29
    }

    return currentMonth + currentDay / maxDayInMonth
  }

  const options = {
    title: null,
    chart: {
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 15,
    },
    credits: {
      enabled: false,
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      useHTML: true,
      itemStyle: {
        textTransform: "uppercase",
        color: "#4C4F56"
      }
    },
    yAxis: {
      title: null,
      min: 0,
      floor: 0,
      endOnTick: true,
      startOnTick: true,
      lineWidth: 1,
      lineColor: "#E9EEF4",
      gridLineDashStyle: "longdash",
      gridLineColor: "#E9EEF4",
      labels: {
        style: {
          fontWeight: "bold",
          color: "#98A0B2",
          textTransform: "uppercase",
          textAlign: "left"
        }
      }
    },
    xAxis: {
      categories: xCategories,
      type: 'category',
      title: null,
      labels: {
        step: 1,
        style: {
          fontWeight: "bold",
          color: "#98A0B2"
        }
      },
      lineColor: "#E9EEF4",
      gridLineWidth: 0,
      showLastLabel: true,
      startOnTick: true,
      endOnTick: true,
      tickmarkPlacement: 'on',
      plotLines: [{
        label: {
          text: "TODAY",
          align: "center",
          verticalAlign: "center",
          textAlign: "center",
          useHTML: true,
          y: -13,
          x: -8,
          style: {
            color: "white",
            backgroundColor: "#60D1FA",
            boxShadow: "0px 4px 12px #dadbe0",
            borderRadius: "21px",
            padding: "5px 8px",
          },
          rotation: 0
        },
        color: '#60D1FA',
        width: 1,
        value: currentDayPosition()
      }]
    },
    series: [
      {
        name: "Last Year",
        type: "line",
        data: toSumArray(!!data && data["LAST_YEAR"]),
        color: "#6563FF"
      },
      {
        name: "YTD",
        type: "line",
        data: toSumArray(!!data && data["CURRENT_YEAR"]),
        color: "#60D1FA"
      },
      {
        name: 'StDevRange',
        data: rangeData(!!data && data["PROJECTED"], !!data && data["PROJECTED_STDEV_LOWER"], !!data && data["PROJECTED_STDEV_UPPER"]),
        type: 'arearange',
        lineWidth: 0.5,
        fillOpacity: 0.5,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "#62D649"],
            [1, Highcharts.Color("#A0D649").setOpacity(0).get('rgba')]
          ]
        },
        showInLegend: false,
        zoneAxis: 'x',
        color: "#62D649",
        // hiding displaying data before currentDayPosition
        zones: [
          {
            value: currentDayPosition(),
            color: 'none'
          }
        ],
        marker: {
          symbol: `url(${ChartMarkerSecondary})`,
          width: 40,
          height: 40
        },
        states: {
          hover: {
            enabled: true,
            halo: {
              size: 0
            }
          }
        }
      },
      {
        name: "Projected",
        type: "line",
        lineWidth: 3,
        data: toSumArray(!!data && data["PROJECTED"]),
        color: "#62D649",
        marker: {
          symbol: `url(${ChartMarker})`
        },
        states: {
          hover: {
            enabled: true,
            halo: {
              size: 0
            }
          }
        },
        zoneAxis: 'x',
        // hiding displaying data before currentDayPosition
        zones: [
          {
            value: currentDayPosition(),
            color: 'transparent',
          }
        ]
      },
    ],
    tooltip: {
      shared: true,
      valuePrefix: '$',
      distance: 20,
      useHTML: true,
      backgroundColor: false,
      shadow: false,
      borderColor: {
        color: false
      },
      formatter: function () {
        let styles = this.points.filter(({point}) => point.color !== 'none').reduce(function (s, point) {
          // Do not display the tooltip for the first point
          if (point.x === xCategories[0])
            return false
          // here we are handling the Range series and formatting tooltip for these lines
          if (point.point.low && point.point.high) {
            return `${s}<div style="margin-top: 8px"><span style="color: #62D649; opacity: 0.5;">● </span> Projected + 1 year stdev: ${formatMoney(point.point.high)}</div>
                        <div style="margin-top: 8px"><span style="color: #62D649; opacity: 0.3;">● </span> Projected - 1 year stdev: ${formatMoney(point.point.low)}</div>`;
          }
          if (getMonthIndex(point.x) < currentDayPosition() && point.series.name === 'Projected') {
            return s
          }
          return `${s}<div style="margin-top: 8px"><span style="color:${point.color}">● </span> ${point.series.name}: ${formatMoney(point.y)}</div>`;
        }, `<div> ${getPrevxCategoriesElem(this.x)} ● Gross Income </div>`);

        if (!styles) return false
        return `<div class="custom-tooltip">${styles}</div>`
      },
    },
    plotOptions: {
      series: {
        pointPlacement: 'on',
        marker: {
          borderWidth: 0,
          lineWidth: 2,
          zIndex: 9999
        }
      }
    },
  };

  // Reset drawPoints function- it allows us to display bullets only on hover, not display bullets all the time
  Highcharts.Series.prototype.drawPoints = function () {
  };

  return (
    <div style={{padding: 10}}>
      <HighchartsReact highcharts={Highcharts} options={options}
                       constructorType={'chart'}/>
    </div>
  );
};
