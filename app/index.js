import React from 'react';
import ReactDOM from 'react-dom';
import MyAutoComplete from './components/MyAutoComplete'

let App =(props)=>{
    return <MyAutoComplete/>
}

ReactDOM.render(<App/>,document.getElementById('app'));