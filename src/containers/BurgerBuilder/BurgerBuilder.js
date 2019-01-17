import React, {Component} from 'react';
import Aux from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const UNIT_PRICE = {
    salad : 0.42,
    meat : 0.89,
    cheese : 0.65,
    bacon : 0.88
};

const TYPE_LIMIT = {
    salad : 3,
    meat : 4,
    cheese : 4,
    bacon : 4
};
const ACTIONS = {
    ADD : 1,
    REDUCE : -1
};

const ADD_ACTION = 'ADD';
const REDUCE_ACTION = 'REDUCE';

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price : 0.0
    }

    updateHandle = (type, action)=> {
        console.log(type, action);
        const previousCount = this.state.ingredients[type];
        let currentCount = previousCount;
        const previousPrice = this.state.price;
        let currentPrice = previousPrice;
       
        if(action === REDUCE_ACTION){
            if(currentCount >=1 ){
                currentCount = previousCount + ACTIONS[REDUCE_ACTION];
                currentPrice = previousPrice + ACTIONS[REDUCE_ACTION] * UNIT_PRICE[type];
            }
        }else{
            currentCount = previousCount + ACTIONS[ADD_ACTION];
            currentPrice = previousPrice + ACTIONS[ADD_ACTION] * UNIT_PRICE[type];
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = currentCount;

       
        this.setState({
            ingredients : updatedIngredients,
            price : currentPrice
        })
        
    }


    render() {
       return (
           <Aux>
               <Burger ingredients ={this.state.ingredients} />
               <BuildControls onClick={this.updateHandle}/>
           </Aux>
       );
    }    
    
}

export default BurgerBuilder;
