import React from 'react'

const PortfolioCard = () => {
  // make api call to fetch total value of user portfolio
  return (
    <>
	    <h3>Portfolio</h3>   
      <div className="text-3xl font-bold">RM110,484.53 </div>

      <div className="py-1"/> 

      <div className="flex justify-between items-center text-xl font-semibold">
        <div>Day Gain</div>
        <div>+6.96 (+0.71%)</div>
      </div>
      <div className="flex justify-between items-center text-[#9B9B9B]">
        <div>PLTR</div>
        <div>+2.1 (+0.51%)</div>
      </div>

      <div className="py-1"/>

      <div className="flex justify-between items-center text-xl font-semibold">
        <div>Total Gain</div>
        <div>-1980.63(-24.10%)</div>
      </div>
      <div className="flex justify-between items-center text-[#9B9B9B]">
        <div>Tesla, Inc</div>
        <div>-2.1 (-0.51%)</div>
      </div>



    </>
  )
}

export default PortfolioCard