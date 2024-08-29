import { Component } from 'solid-js';

interface IMeleeFont {
  number: number;
}

export const MeleeFont:Component<IMeleeFont> = ({number}) => {
  const renderedNum:any = [];
  let stringNum = number.toLocaleString();
  for (let i = 0; i < stringNum.length; i++){
    renderedNum.push(
      <img class="melee-num" src={`numbers/${stringNum[i]}.png`} />
    )
  }

  return (
    <>
      {renderedNum}
    </>
  )
}