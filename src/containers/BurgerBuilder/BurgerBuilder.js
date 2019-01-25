import React, {Component} from 'react';
import Aux from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        price : 4.0,
        purchasable: false,
        purchasing: false
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
        //console.log(currentPrice)        
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = currentCount;

        const total = this.totalIngredient(updatedIngredients)            
        const isPurchasable = total>0;        
        this.setState({
            ingredients : updatedIngredients,
            price : currentPrice,
            purchasable : isPurchasable
        })

        
    }

    totalIngredient = (ingredients) =>{
        let total = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0 )
        
        return total;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }



    render() {
        const disableLess = {
            ...this.state.ingredients
        };
        for (let key in disableLess){
            disableLess[key] = disableLess[key] <=0;
        }
 
        return (
           <Aux>
               <Burger ingredients ={this.state.ingredients} />
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
               <BuildControls price={this.state.price} 
               onClick={this.updateHandle} 
               disableLess={disableLess}
               purchasable={this.state.purchasable}
               ordered={this.purchaseHandler}/>               
           </Aux>
       );
    }    
    
}

export default BurgerBuilder;
