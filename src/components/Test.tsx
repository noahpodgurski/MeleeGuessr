import { useEffect, useState } from "react";

export const Test: React.FC = () => {
  const [test, setTest] = useState(0);

  useEffect(() => {
    setTest(test+1);
  }, [])
  return (
    <>
      test
    </>
  )
}