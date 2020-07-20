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
            orderPlaced: []
        }
    }

    componentDidMount() {
        console.log(this.props.cart);
        this.setState({ cartItems: this.props.cart })
    }

    render() {
        if (this.props.loggedIn == "true") {
            return (
                <div>
                    Shopping cart
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                        {this.state.cartItems.map(this.cartTableData.bind(this))}
                    </table>
                    <IonButton onClick={() => this.placeOrder()} >Place Order</IonButton>
                    <table>
                        {this.state.orderPlaced.map(this.cartTableData.bind(this))}
                    </table>
                </div>
            )
        }
        else {
            return (
                <div>Please login</div>
            )
        }
    }

    placeOrder() {
        //place the order
        this.setState({ orderPlaced: this.state.cartItems, cartItems: [] });
        console.log("Placed order: ", this.state.orderPlaced);
    }

    cartTableData({ name, price, quantity }) {
        return (
            <tr key={name} className="cartItemSlide">
                <td>{name}</td>
                <td>{price}</td>
                <td id="itemQuantityCell">{quantity}</td>
                <td>X</td>
            </tr>
        )
    }

    
}

export default ShoppingCart;