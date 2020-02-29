import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios
            .get(
                "https://react-my-burger-9f977.firebaseio.com/ingredients.json"
            )
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ err: true });
            });
    }

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

    _PurchaseContinueHandler = () => {
        // alert("You Continue!");
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            costumer: {
                name: "Hammam Al-Hakim",
                address: {
                    street: "Teststreet 22",
                    zipCode: "82916",
                    country: "Indonesia"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        };
        axios
            .post("/orders.json", order)
            .then(res => {
                // console.log(res);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                // console.log(err)
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? (
            <p>Ingredients can't be loaded!</p>
        ) : (
            <Spinner />
        );

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
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

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this._PurchaseCancelHandler}
                    purchaseContinued={this._PurchaseContinueHandler}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this._PurchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
