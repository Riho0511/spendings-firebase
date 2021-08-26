import React from 'react';
import { makeStyles } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;

const colorsCode = ['#06F', '#F33', '#FC3', '#FF6', '#3F9', '#3CF', '#006', '#C299FF'];

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const useStyles = makeStyles({
  graph: {
    margin: '0 auto',
  },
});

const PieCharts = (props) => {
  const classes = useStyles();
  const data = props.data;
  let col = [];

  const pushColor = () => {
    let colors = [];
    for (let i=0; i < data.length; i++) {
      if (i === data.length-1) {
        if (props.total !== undefined) {
          colors.push(colorsCode[i]);
        } else {
          colors.push('#CCC');
        }
        return colors;
      } else {
        colors.push(colorsCode[i]);
      }
    }
  };
  col = pushColor();

  return (
    <PieChart width={180} height={180} className={classes.graph}>
      <Pie
        data={data}
        cx={85}
        cy={90}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="white"
        dataKey="value"
      >
        {data.map((entry, index) => 
          <Cell key={`cell-${index}`} fill={col[index % col.length]} />
        )}
      </Pie>
    </PieChart>
  );
}

export default PieCharts
