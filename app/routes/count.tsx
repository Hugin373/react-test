import { useRef, useState } from 'react'


function Count() {
  let cnt = 0;
  const setCnt = (newNumber: number) => {
    let cnt = newNumber;
    console.log(cnt)
  }


  const cntRef = useRef(0)
  const setCntRef = (newNumber: number) => {
    cntRef.current = newNumber
    console.log(cntRef.current)
  }


  const [cntState, setCntState] = useState(0)


  return (
    <div>
      <h1>Hello React</h1>
      <p>現在のカウント: {cnt}</p>
      <button onClick={() => setCnt(cnt + 1)}>➕ increment variable</button>
      <p>----------</p>
      <p>現在のカウント: {cntRef.current}</p>
      <button onClick={() => setCntRef(cntRef.current + 1)}>➕ increment ref</button>
      <p>----------</p>
      <p>現在のカウント: {cntState}</p>
      <button onClick={() => setCntState(cntState + 1)}>➕ increment state</button>
    </div>
  )
}


export default Count
