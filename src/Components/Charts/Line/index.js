import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';


function ChartLine({ data, show }) {

    if (show === undefined || !show) {
        return;
    }

    return (
        <LineChart 
            width={800}
            height={400}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" name='Ano' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Brush />
            <Line type="monotone" dataKey="contribution" stroke="#8884d8" name='Contribuição' />
            <Line type="monotone" dataKey="evolution" stroke="#82ca9d" name='Saldo' />
        </LineChart>
    );
}

class CustomizedLabel extends PureComponent {
    render() {
      const { x, y, stroke, value } = this.props;
  
      return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
          {value}
        </text>
      );
    }
  }

export default ChartLine