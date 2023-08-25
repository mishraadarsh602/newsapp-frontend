import React from 'react'
import loading from './loading-waiting.gif'

const Loader=()=>{
 
    return (
      <div className='text-center'><img style={{width:"120px"}} src={loading} alt="loader"/>
      </div>
    )
  
}

export default Loader