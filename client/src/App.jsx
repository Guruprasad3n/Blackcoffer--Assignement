import "./App.css";
import { Chart as ChartJS } from "chart.js/auto";
import Chart from "./Component/Chart";
import Piechart from "./Component/Piechart";

import { Box, Flex, useToast } from "@chakra-ui/react";
import Dotchart from "./Component/Dotchart.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BubbleChart from "./Component/Bubblechart.jsx";
import Radarchart from "./Component/Radar.jsx";

function App() {
  const [data, setData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        toast({
          title: "Error Occoured",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <div className="App">
     <Flex>
     <Box textAlign={"center"} width={"50%"}>
        <Chart data={data} />
      </Box>
      <Box textAlign={"center"}  width={"50%"}>
        <BubbleChart data={data} />
      </Box>
     </Flex>
      <Flex width={"100%"} >
      <Box textAlign={"center"} width={"50%"}>
        <Dotchart data={data} />
      </Box>
      <Box textAlign={"center"} width={"50%"}>
        <Piechart data={data} />
      </Box>
      </Flex>
      <Box textAlign={"center"}>
        <Radarchart data={data} />
      </Box>
    </div>
  );
}

export default App;
