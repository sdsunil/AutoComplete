import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './components/AutoComplete'

let App =(props)=>{
    return <AutoComplete/>
}

ReactDOM.render(<App/>,document.getElementById('app'));