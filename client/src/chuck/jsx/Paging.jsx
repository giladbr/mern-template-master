import React from 'react';

export const Paging = ({ numPages, onClick, activePage }) => {
  const values = [];
  for (let i = 0; i < numPages; i++) {
    values.push(i);
  }
  
  return <div className="pagingWrapper">
    {values.map((val, i) => {
      let classIfActive = activePage === val ? (" active") : "";
      return (
        <span className={"paging" + classIfActive}
        onClick={() => onClick(val)}
           key={i}>
          {val + 1}
        </span>
      )
    })}
  </div>
}