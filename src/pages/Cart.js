import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonItem, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import * as $ from 'jquery';

import './cart.css';


class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartItems: [],
            orderPlaced: [],
            total: 0
        }
        this.addonTableData = this.addonTableData.bind(this);
    }

    componentDidMount() {
        console.log(this.props.cart);
        let tempOrder = this.props.cart;
        let tempPrice = 0;
        for (var i = 0; i < tempOrder.length; i++)
        {
            if (tempOrder[i].addons.length > 0)
            {
                for (var x = 0; x < tempOrder[i].addons.length; x++)
                {
                    tempPrice = parseFloat(tempPrice) + parseFloat(tempOrder[i].addons[x].price);
                }
            }
            tempPrice = parseFloat(tempPrice) + parseFloat(tempOrder[i].price);
        }
        this.setState({ cartItems: this.props.cart, total: tempPrice })

    }

    render() {
        return (
            <div>
                <h2>Order Cart</h2>
                <table className="orderTable">
                    {this.state.cartItems.map(this.cartTableData.bind(this))}
                    <div className="orderDiv">
                    </div>
                    <div className="nameDiv">Total: ${this.state.total}</div>
                </table>
                <div className="tableCode">
                    Please enter your table code:
                    <input type="text" size="20" /><br />
                    <IonButton onClick={() => this.placeOrder()} >Place Order</IonButton>
                </div>
                <table>
                    {this.state.orderPlaced.map(this.cartTableData.bind(this))}
                </table>
            </div>
        )
    }


    placeOrder() {
        //place the order
        this.setState({ orderPlaced: this.state.cartItems, cartItems: [] });
        console.log("Placed order: ", this.state.orderPlaced);
    }

    addonTableData({ name, price }) {
        return (
            <div class="addonSlide">
                <tr key={name}>
                    <td className="orderTD">Add {name} <div className="priceSlide">${price}</div></td>
                </tr>
            </div>
        )
    }

    cartTableData({ name, price, quantity, addons }) {
        console.log(this.state.cartItems);
        console.log(this.state.cartItems[0].addons);
        return (
            <div className="orderDiv">
                <tr key={name}>
                    <div className="nameDiv">{name} x {quantity}
                    </div>
                    <div className="priceDiv">${price}</div>
                    {addons.map(this.addonTableData.bind(this))}
                </tr>
            </div>
        )
    }


}

export default ShoppingCart;