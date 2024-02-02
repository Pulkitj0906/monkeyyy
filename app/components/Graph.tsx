import { Chart, registerables, LogarithmicScale } from "chart.js";
Chart.register(...registerables);
import { Line } from "react-chartjs-2";
import GraphTypingSpeed from "../hooks/useGraphWpm";
import TypingSpeed from "../hooks/useWpm";

const Graph = () => {
  const { wpm, err, raw } = GraphTypingSpeed();
  const {NoOfWords} = TypingSpeed()
  const arr:string[] = []
  for(let i = 0; i < NoOfWords; i++) {
    arr.push(`${i+1}`);
  }
  return (
    <Line
      data={{
        labels: arr,
        datasets: [
          {
            data: err,
            borderColor: '#ca4754',
            borderWidth: 2,
            pointBackgroundColor: "#ca4754",
            yAxisID: 'error',
            showLine: false,
            pointStyle: "crossRot",
            pointRadius: err.map((e) => ( e === 0 ? 0 : 3)),
            label: 'errors'
          },
          {
            data: wpm,
            pointBackgroundColor: '#e2b714',
            borderColor: '#e2b714',
            tension: 0.3,
            label: 'wpm'
          },
          {
            data: raw,
            pointBackgroundColor: '#646669',
            borderColor: '#646669',
            tension: 0.3,
            fill: {
              target: 'origin',
              below: '#00000041',
            },
            label: 'raw'
          },
        ],
      }}
      options={{
        interaction: {
          mode: "index"
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            ticks: {
              stepSize: 10,
            },
            title: {
              display: true,
              text: 'Words per Minute',
              font: {
                weight: "normal",
                size: 13,
                family: "'Roboto Mono', monospace"
              },
            }
          },
          error: {
            min: 0,
            ticks: {
              stepSize: 1,
            },
            title: {
              display: true,
              text: 'Errors',
              font: {
                weight: "normal",
                size: 13,
                family: "'Roboto Mono', monospace"
                },
              },
            grid: {
              drawOnChartArea: false
            },
            position: 'right'
          }
        },
        plugins: {
          legend: {
            display: false
          },
        },
      }}
      
    />
  );
};

export default Graph;
