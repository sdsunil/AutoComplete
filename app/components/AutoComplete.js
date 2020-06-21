import React, { useState, useRef, useEffect } from 'react';
import '../../app/app.css'

let AutoComplete = (props) => {
    const [isListShow, setListShow] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [inputValue, stInputValue] = useState('');
    const [selectedMovie, setSelectedMovie] = useState([]);
    let style = { gridTemplateColumns: "auto" }
    const wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setListShow(false)
        }
    };

    const debounce = () => {
        let delay = null;
        return event => {
            setListShow(true)
            if (delay) {
                clearTimeout(delay)
            }
            let savedTarget = event.target
            stInputValue(savedTarget.value)
            delay = setTimeout(() => {
                if (savedTarget.value.length >= 3) {
                    fetch(`https://omdbapi.com/?s=${savedTarget.value}&apikey=98d6f429&type=movie`)
                        .then(response => response.json())
                        .then(data => {setMovieList(data.Search);  stInputValue('')}
                        );
                       
                }
            }, 1000)
        }
    }

    const selcectText = (event) =>{
        if(!selectedMovie.includes(event.target.id) && selectedMovie.length<6){
            console.log(event.target.id,"++++++++++++++++++",selectedMovie.length)
            setSelectedMovie([...selectedMovie,event.target.id])
        }
  
    }

    const deleteMovie =(event)=>{
        let idArr = [...selectedMovie];
        let ind = idArr.indexOf(event.target.id)
        if(ind>=0){
          idArr.splice(ind,1);
          setSelectedMovie([...idArr])
        }
    }


    return (
        <React.Fragment>
            <div ref={wrapperRef} style={{width:"30%",margin: "auto"}}>
                <div  className="input-container" style={style}>
                <div>
                        <input placeholder='Serch by atleast three character' value ={inputValue} onChange={debounce()} style={{ border: "none", width: "100%", height: "100%" }} type="text"  ></input>
                    </div>
                  {selectedMovie.length>0 && selectedMovie.map(title=>{
                    
                         return <div className="selected-text-container">
                         <div style={{ float: "left", display: "flex" }}>
                             <span >{title.slice(0,-4)}</span>
                             <span id={title} style={{ cursor:"pointer"}} onClick={deleteMovie}>&#10005;</span>
                         </div>
                     </div>
                  }) }
                   
                </div>
                {(isListShow && movieList.length>0) && <div className="list-container">
              { movieList.map((ele)=> 
                    <div style={{ cursor:"pointer"}} onClick={selcectText} key ={ele.Title + ele.Year} id={ele.Title + ele.Year} className="list">
                        <p className='main-text' id={ele.Title +ele.Year} >{ele.Title}</p>
                        <p className='sub-text' id={ele.Title + ele.Year}>{ele.Year}</p>
                    </div>
                )
              }
                    
                </div>
                }
            </div>
        </React.Fragment>
    );



}

export default AutoComplete;