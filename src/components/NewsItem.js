import React, { Component } from 'react'

const NewsItem =(props)=> {
  

        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props;
        return (
            <div>
                <div className="card" >



                 <div className='' style={{display:"flex",justifyContent:'flex-end',position:"absolute",right:"0"}}>
                 <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>

                 </div>
                 
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">{author ? "by" + author : "unknown"} <br /> {publishedAt ? " at " + new Date(publishedAt).toGMTString() : ""}</small></p>
                        <a rel="noreferrer" target="_blank" href={newsUrl} className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>

            </div>
        )
    
}

export default NewsItem