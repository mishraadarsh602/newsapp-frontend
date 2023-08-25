import React from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from 'react';
import Sources from './Sources';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
const News = (props) => {
 
  let Navigate = useNavigate();
    let [articles, setArticles] = useState([]);
    let [loading, setLoading] = useState(true);
    let [page, setPage] = useState(1);
    let [totalResults, setTotalResults] = useState(0);
    let [filter, setFilter] = useState({
        sourceLists: []
    });
    const [search, setSearch] = useState('');

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // document.title = ` ${capitalize(props.category)} - NewsMonkey `;




    const fetchMoreData = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let url = "http://localhost:4000/news/api";
        setLoading(true);
        // this.setState({ loading: true });
        setPage(page + 1);

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
        setTotalResults(parsedData.totalResults);

    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = "http://localhost:4000/news/api"
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);


    }
    const sendFilterData = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        try {
            let url = "http://localhost:4000/news/api";
            let data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filter)
            });
            let parsedData = await data.json();
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (filter.sourceLists.length > 0) {
            sendFilterData();
        } else {
            updateNews();
        }

    }, [filter]);



    useEffect(() => {
        updateNews();
        // fetchMoreData();
    }, [])
    const submitSearch =(e) => {
        e.preventDefault();
      searchFilter();
    }
  

    
    /*navbar*/
    const searchFilter = async() => {
       try{
        // console.log(search)
        props.setProgress(10);
         setLoading(true);
        let data = await fetch(`http://localhost:4000/news/api/search/${search}`);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
       }catch(err){
           console.log(err);
       }
    }
//home authentication
    const callHomePage = async()=>{
        try{
            const res= await fetch("/",{
                methods:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                 },
                credentials:"include"
            })
            const data = await res.json();
            // console.log(data);
            if(!res.status===200){
                const error = new Error(res.error);
            }
        }catch(err){
            console.log(err);
            Navigate("/login");
        }
     }
        // useEffect(() => {
        //     callHomePage();
        // },[]);
    return (
        <>
            {/* <h3 className="text-center m-3 headlines">{`Top  ${capitalize(props.category)}  Headlines`}</h3> */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loader />}
            >
                <NavBar searchFilter={searchFilter} search={search} setSearch={setSearch} submitSearch={submitSearch}/>
                <div className="container my-5 pt-5">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 left-sidebars">
                            <div className=" sidebars">
                                <div className=" top-0 d-flex flex-column flex-shrink-0 p-3 bg-light" >
                                   
                                        <button className="btn btn-primary  d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                            Source Filters
                                        </button>
                                    
                                    <div className="collapse d-md-block" id="collapseExample">
                                        <div className="">
                                        <Sources filter={filter} setFilter={setFilter} />
                                        </div>
                                    </div>

                                    <hr />

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9 right-sidebars">
                            <div className="row">
                                {articles && articles.map((element) => {
                                    return <div className="col-md-12 col-lg-6" key={element._id}>
                                        {/* <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "default-news.jpg"} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}></NewsItem> */}
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "default-news.jpg"} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}></NewsItem>

                                    </div>
                                })}


                            </div>
                        </div>
                    </div>


                </div>
            </InfiniteScroll>




        </>
    )

}

export default News;

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}
