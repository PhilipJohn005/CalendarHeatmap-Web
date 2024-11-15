
import React from 'react'

const Heat= ({width,year,month,dateValues}) => {
    const getDaysInMonth=(month)=>new Date(year,month+1,0).getDate();

    const highestValue=(dateValues||[]).reduce((a,b)=>Math.max(a,b.count),0);

    const getIntensity = (activityCount)=>{
        return highestValue !==0?activityCount/highestValue:0;
    };
    const getColorBasedOnIntensity=(intensity)=>{
        const colorCodes=['#FFEEEE','#FFCCCC','#FFAAAA','#FF8888','#FF6666','#FF4444'];
        const colorIndex = Math.min(Math.floor(intensity * colorCodes.length),colorCodes.length-1);
        return colorCodes[colorIndex];
    };

    const rectSize=width/14;
    const textSize=rectSize*0.6;
    const gap=rectSize/5
    const viewBoxWidth=(rectSize+gap)*7;
    const viewBoxHeight=(rectSize+gap)*6+30;
    const cornerRadius=rectSize*0.1;
    
    let firstDay=new Date(year,month,1).getDay()
    const calendarGrid=Array.from({length:getDaysInMonth(month)},(_,i)=>{
        const date=new Date(year,month,i+1)
        return date.toISOString().slice(0,10)
    })

  return (
    <div
        style={{width:width,maxWidth:'100%',}}>
      <svg width='100%' height='auto' viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        {calendarGrid.map((day,index)=>{
            const activityCount = (dateValues||[]).find((item) => item.date === day)?.count||0;
            const intensity = getIntensity(activityCount);
            const color = getColorBasedOnIntensity(intensity);

            const x=((index+firstDay)%7)*(rectSize+gap)
            const y=Math.floor((index+firstDay)/7)*(rectSize+gap)

            return(
                <g key={day}>
                <rect width={rectSize} height={rectSize} x={x} y={y} rx={cornerRadius} ry={cornerRadius} style={{fill:activityCount===0?'#ffffff50':color}}/>
                <title>{`${activityCount} on ${day}`}</title>
                </g>
            )
        })}
        <text x={viewBoxWidth / 2} y={viewBoxHeight-rectSize-20} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={textSize}>
          {new Date(year,month).toLocaleString('default',{month:'long'})}
        </text>
        <text x={viewBoxWidth/2} y={viewBoxHeight-20} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={textSize}>
          {year}
        </text>
      </svg>
    </div>
  )
}

export default Heat