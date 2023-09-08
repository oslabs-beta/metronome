import { useState, useEffect } from 'react';

//import css file

const Overview=({data})=>{
    const[version, setVersion]=useState(null);
    const[totalTime, setTotalTime]=useState(null);

    useEffect(()=>{
        const overviewData = async()=>{
            try{
                setVersion(data.version);
                setTotalTime(data.timelineData[0].duration)
            }
            catch(err){
                console.log(err);
            }
        }
        overviewData();
    },[])
    return(
        <div className='Overview'>
            <p>React Version: {version}</p>
            <p>Total Render Duration: {totalTime}</p>
        </div>
    )
}

export default Overview;