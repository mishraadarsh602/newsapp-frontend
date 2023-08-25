import { useEffect, useState } from 'react';
const Sources = ({filter,setFilter}) => {
    let [sources, setSources] = useState([]);
    let [srcName, setSrcName] = useState([]);

   

 
    // const capitalize = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }
    // document.title = ` ${capitalize(props.category)} - NewsMonkey `;


    const fetchSources = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        try{
          let url = "http://localhost:4000/news/api/sources";
          let data = await fetch(url);
          let parsedData = await data.json();
          // console.log("parsedData source",parsedData.sources);
          const sourcename =  parsedData.sources.map((sourcelist) => {
              return sourcelist.source.name;
          })
        
          const uniqueSources = [...new Set([...sourcename])];
          setSources(uniqueSources);

        }catch(error){
          console.log(error);
        }
    }


    useEffect(() => {
      fetchSources();
   }, [])
    

  const handleCheck = (event)=>{
    let { name, value, checked } = event.target;
    if (checked) {
        const lists = [...srcName].concat(value);
        setSrcName(lists);
        setFilter({ ...filter, sourceLists: lists });
    } else {
        const newSource = srcName.filter(item => item !== value);
        setSrcName(newSource);
        const newFilter2 = {...filter,sourceLists: newSource};
        setFilter(newFilter2);
      

    }
  }


  return (
    <div className="sources">
        <h5 className='mt-3'>Sources</h5>
       
      {sources && sources.map((src) => {
        return <div key={src}>
                  <label>
                      <input type="checkbox"  value={src} name={src} onChange={(event)=>handleCheck(event)} />{src.slice(0,1).toUpperCase()+src.slice(1)}
                 </label>
              </div>
      })}

    </div>
  )
}

export default Sources;