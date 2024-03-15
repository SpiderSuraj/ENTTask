import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // Import ECharts library

function ChartComponent({ chartarray }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartarray) {
      const myChart = echarts.init(chartRef.current);

      
      const option = {
        title: {
          text: 'Products and Quantity',
          subtext: 'Visualization',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: chartarray.map(item => ({ value: item.value, name: item.name })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowColor: 'rgba(0, 0, 9, 9.5)'
              }
            }
          }
        ]
      };

      myChart.setOption(option);

    
      return () => {
        myChart.dispose();
      };
    }
  }, [chartarray]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}

export default ChartComponent;
