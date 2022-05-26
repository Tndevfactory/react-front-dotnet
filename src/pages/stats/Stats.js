import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Box, Container, Typography } from "@mui/material";

function Stats() {
  const [data, setDats] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["incidents ouverts", "incidents cloturés"],
      },
    },
    series: [
      {
        name: "volume incidents",
        data: [30, 40],
      },
    ],
  });
  return (
    <Container sx={{ marginTop: 25 }} maxWidth="xs">
      <Box sx={{ display: "flex" }}>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
            />
          </div>
          <Typography
            sx={{ backgroundColor: "#ddd" }}
            align="center"
            variant="h6"
          >
            {" "}
            Volumetrie des incidents par ingenieur{" "}
          </Typography>
        </div>
      </Box>
    </Container>
  );
}

export default Stats;
