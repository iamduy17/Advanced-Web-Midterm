import React from "react";
import { BarChart, XAxis, Bar, ResponsiveContainer, Cell } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

import "./style.css";

const colors = scaleOrdinal(schemeCategory10).range();

function SlideDetail({ slideType, title, dataChart }) {
  // lay data tu thang id cua param :v
  return (
    <div className="slide__chart">
      <h2>{title}</h2>

      {slideType === 1 ? (
        <>
          <ResponsiveContainer
            margin={{
              top: 20,
              right: 0,
              bottom: 0,
              left: 0
            }}
            width="80%"
            height="80%"
          >
            <BarChart
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: 0
              }}
              height={350}
              data={dataChart}
            >
              <XAxis dataKey="name" />
              <Bar dataKey="count" fill="#8884d8" label={{ position: "top" }}>
                {dataChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : slideType === 2 ? (
        <>
          <div
            style={{
              width: "95%",
              textAlign: "center",
              marginTop: "1rem",
              overflow: "hidden"
            }}
          >
            {dataChart[0].Subheading}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "70%",
              textAlign: "center",
              marginTop: "1rem",
              overflow: "hidden"
            }}
          >
            {dataChart[0].Paragraph}
          </div>
        </>
      )}
    </div>
  );
}

export default SlideDetail;
