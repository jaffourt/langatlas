import React from "react";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";

const data = [
  {
    name: "Sentence1",
    uv: 590,
    sentence: 800,
    Corpora: 1400,
    cnt: 490
  },
  {
    name: "Sentence2",
    uv: 868,
    sentence: 967,
    Corpora: 1506,
    cnt: 590
  },
  {
    name: "Sentence3",
    uv: 1397,
    sentence: 1098,
    Corpora: 989,
    cnt: 350
  },
  {
    name: "Sentence4",
    uv: 1480,
    sentence: 1200,
    Corpora: 1228,
    cnt: 480
  },
  {
    name: "Sentence5",
    uv: 1520,
    sentence: 1108,
    Corpora: 1100,
    cnt: 460
  },
  {
    name: "Sentence6",
    uv: 1400,
    sentence: 680,
    Corpora: 1700,
    cnt: 380
  }
];

export function Pretty_plots(props) {
  return (
    <ComposedChart
      width={550}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="Corpora" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="sentence" barSize={20} fill="red" />
    </ComposedChart>
  );
}