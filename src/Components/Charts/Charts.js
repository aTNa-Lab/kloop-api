// import React from 'react'
// import ReactEcharts from "echarts-for-react";

// const Charts = (props) => {
//     console.log("GOT", props)
//     return (
//         <div>
//             <ReactEcharts
//             option={{
//               tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                   animation: false
//                 }
//               },
//               toolbox: {
//         feature: {
//             dataZoom: {
//                 yAxisIndex: 'none'
//             },
//             restore: {},
//             saveAsImage: {}
//         }
//     },
//     axisPointer: {
//         link: {xAxisIndex: 'all'}
//     },
//     // dataZoom: [
//     //     {
//     //         show: true,
//     //         realtime: true,
//     //         start: 30,
//     //         end: 70,
//     //         xAxisIndex: [0, 1]
//     //     },
//     //     {
//     //         type: 'inside',
//     //         realtime: true,
//     //         start: 30,
//     //         end: 70,
//     //         xAxisIndex: [0, 1]
//     //     }
//     // ],
//               legend: {
//                 data: ["check", "check1", "check"],/*this.state.nestedData
//                   .filter(d => d.key !== "")
//                   .map(d => d.key),*/
//                 left: 10
//               },
//               xAxis: {
//                 type: "category",
//                 data: props.timeRange
//               },
//               yAxis: {
//                 type: "value"
//               },
//             //   series: props.dates
//             //     .filter(d => d.key !== "")
//             //     .map(d => {
//             //     return {
//             //       name: d.key,
//             //       data: d.values,
//             //       type: "line"
//             //     }
//             //   })
//             series: [{ 
//             data: props.dates,
//             type: "line"
//           }]
//             }}
//           />
//         </div>
//     )
// }

// export default Charts



import React from 'react'
import ReactEcharts from "echarts-for-react";

const Charts = (props) => {
    console.log("GOT", props)
    return (
        <div style={{padding: 20}}>
          <ReactEcharts
        option = {{
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: props.timeRange,
            axisTick: {
                alignWithLabel: true
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        yAxis: {
            // splitLine: {
            //     show: false
            // },
            type: 'value'
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: {},
        dataZoom: [{
            show: true,
        },{
            type: 'inside'
        }],
        series: {
            type: 'line',
            data: props.dates
        }
    }}
          />
        </div>
    )
}

export default Charts