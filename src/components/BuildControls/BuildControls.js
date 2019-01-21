import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'}

]



const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p> Current Price: {props.price.toFixed(2)} </p>
    {
          controls.map(
              ctl => (
                  <BuildControl key={ctl.type} type={ctl.type} label={ctl.label} onClick={props.onClick} disableLess={props.disableLess[ctl.type]} />
              )
          )
    } 
    <button className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now</button>

    </div>

)


export default buildControls;