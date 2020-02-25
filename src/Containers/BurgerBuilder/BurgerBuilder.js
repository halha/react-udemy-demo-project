import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    };

    _UpdatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });
    };

    _AddIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this._UpdatePurchaseState(updatedIngredients);
    };

    _RemoveIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this._UpdatePurchaseState(updatedIngredients);
    };
    // { salad: true, meat: false, ...}

    _PurchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    _PurchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this._PurchaseCancelHandler}
                >
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this._AddIngredientHandler}
                    ingredientRemoved={this._RemoveIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this._PurchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
