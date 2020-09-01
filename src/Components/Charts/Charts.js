import React from 'react'
import ReactEcharts from "echarts-for-react";

const Charts = (props) => {
    console.log("GOT", props)
    return (
        <div>
            <ReactEcharts
            option={{
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  animation: false
                }
              },
              legend: {
                data: ["check", "check1", "check"],/*this.state.nestedData
                  .filter(d => d.key !== "")
                  .map(d => d.key),*/
                left: 10
              },
              xAxis: {
                type: "category",
                data: props.timeRange
              },
              yAxis: {
                type: "value"
              },
            //   series: props.dates
            //     .filter(d => d.key !== "")
            //     .map(d => {
            //     return {
            //       name: d.key,
            //       data: d.values,
            //       type: "line"
            //     }
            //   })
            series: [{ 
            data: props.dates,
            type: "line"
          }]
            }}
          />
        </div>
    )
}

export default Charts