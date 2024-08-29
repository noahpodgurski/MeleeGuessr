import { Component } from 'solid-js';
import { Choice } from "../models/Choice";

export type choiceDataType = {
  totalVotes: number;
  label: string;
}

export interface choiceDataProps {
  choiceData: choiceDataType[],
  correctChoice: Choice;
}

const labelFormatter = (value:any, payload:any) => {
  if(value && payload && payload[0]) 
    return <>{value}: {payload[0].value}</> 
  else return <></>
}

export const ChoiceData: Component<choiceDataProps> = ({choiceData, correctChoice}) => {  

  return (
    <div class="row justify-content-center w-100" style={{height: "20vh", width: "100vw"}}>
      {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={choiceData} class="no-icon" >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip labelFormatter={labelFormatter} />
          <Legend />
          <Bar legendType={'circle'} name={"Total Votes"} dataKey="totalVotes" fill={"white"}>
            { choiceData.map((entry) => {
              return (
                <Cell fill={entry.label === correctChoice.label ? '#5a964b' : '#706daa'} />
                )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  )
}