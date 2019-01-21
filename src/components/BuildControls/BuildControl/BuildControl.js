import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) =>(   
    
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} 
        onClick={() => props.onClick(props.type, 'REDUCE')}                
        disabled={props.disableLess}>Less</button>
        <button  className={classes.More} onClick={() => props.onClick(props.type, 'ADD')  }>More</button>
    </div>
    );
    

export default buildControl;