import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngridient/BurgerIngridient";

const burger = props => {
    const transformIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])];
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
