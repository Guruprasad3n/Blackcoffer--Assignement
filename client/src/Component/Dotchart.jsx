import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { PolarArea } from 'react-chartjs-2';
const formatChartData=(data)=>{
   
    const labels = data.map(item=>item.insight)
    
    const values = data.map(item=>item.intensity)
    const backgroundColors = [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      ];
    return {
        labels:[
          "Energy",
          "Environment",
          "Government",
          "Aerospace & defence",
          "Manufacturing",
          "Retail",
          "Financial services",
          "Support services",
         
      ],
      datasets:[
            {
                label:'Intensity',
                borderWidth:0,
                backgroundColor: backgroundColors.slice(0, values.length),
                data: values
            }
        ]
    }
}
const Dotchart = ({data,}) => {
    const [filter,setFilter] = useState('All')
    const filteredData = filter === 'All' ? data : data.filter(item => item.sector === filter);
    const chartdata = formatChartData(filteredData)
    const options = {
        animations: {
            tension: {
              duration: 1000,
              easing: 'easeInCubic',
              from: 1,
              to: 0,
              loop:true
            }
          },
      scales: {
      
      },
    };
    return (
      <Box w={{base:"full",md:"40%"}} >

        <Heading as='h3' size={'lg'} mb='10px'>Intensity Chart</Heading>
        <Box mb='10px'>
           
            <Select  id='filterSelect' value={filter} onChange={(e)=>setFilter(e.target.value)}>
                <option value='All'>Intensity</option>
                <option value='Energy'>Energy</option>
                <option value='Government'>Government</option>
                <option value='Retail'>Retail</option>
                <option value='Information Technology'>Information Technology</option>
                <option value='Manufacturing'>Manufacturing</option>
            </Select>
        </Box>
        <Flex justifyContent={'center'} >
        <PolarArea data={chartdata} options={options}/>
        </Flex>
      
      </Box>
    )
}

export default Dotchart