import React from 'react';

//A generic numeric dropdown that shows values according to props
export default ({maxNumber, selectedValue, numValues,onChange,descText, marginBottom, marginLeft}) => {
  const values = [];
  const step = maxNumber / numValues;
  for (let i=1 ; i <= numValues ; i++ ) {
    values.push(step * i)
  }
  return <span style={{marginBottom, marginLeft, display: "inline-block"}}>
    <span>{descText}:</span>
      <select value={selectedValue} style={{marginLeft}} onChange={(e)=> onChange(parseInt(e.target.value))}>
        {values.map((val,i) => (
          <option value={val} key={i}>{val}</option>
        ))}
      </select>
  </span>
}