import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1)
    console.log("count", count)
  }

  const handleDecrement = () => {
    setCount(count - 1)
    console.log("count", count)
  }
  return (
    <div>Counter
      {console.log("return ", count)}
      <p>{count}</p>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}

export default Counter