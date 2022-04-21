interface IMeleeFont {
  number: number;
}

export const MeleeFont:React.FC<IMeleeFont> = ({number}) => {
  const renderedNum:any = [];
  let stringNum = number.toLocaleString();
  for (let i = 0; i < stringNum.length; i++){
    renderedNum.push(
      <img key={`num${i}`} alt={`num${i}`} className="melee-num" src={`numbers/${stringNum[i]}.png`} />
    )
  }

  return (
    <>
      {renderedNum}
    </>
  )
}