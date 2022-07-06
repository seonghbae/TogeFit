import { PieChart, Pie, Cell } from 'recharts';

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name}\n${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CalorieChart = ({
  foods,
}: {
  foods: Array<{ name: string; value: number }>;
}) => (
  <PieChart width={400} height={400}>
    <Pie
      data={foods}
      cx={200}
      cy={200}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {foods.map((entry, index) => (
        <Cell key={`cell-${index + 1}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default CalorieChart;
