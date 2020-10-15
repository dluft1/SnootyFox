import React from 'react';


import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import { IonContent, IonHeader, IonMenu, IonToolbar, IonItem, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonApp, IonTitle, IonList, IonMenuButton } from '@ionic/react';

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

import './MenuItem.css';
import * as $ from 'jquery';
import { finished } from 'stream';

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: "",
            itemAddons: [],
            itemSide: [],
            addonIndex: [],
            quantity: 1,
            sideLength: 0,
            selectedSide: -1

        }
        this.addOptional = this.addOptional.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }
    // increase item count
    // on mount get add-ons list

    menuItemAddOns({ name, price }) {
        return (
            <div className="addonDiv" onClick={() => this.addOptional(name, price)}>
                <tr key={name}>{name} - add ${price} <input className="selectAddon" id={name} type="radio" /></tr>
            </div>
        )
    }

    menuItemSides({ name, price, dressing }) {
        return (
            <div className="addonDiv" onClick={() => this.addSide(name, price)}>
                <tr key={name}>{name} - add ${price} <input className="selectAddon" id={name} type="radio" /></tr>
                {dressing.map(this.dressingItemData.bind(this))}
            </div>
        )
    }

    dressingItemData({name, price})
    {
        return (
            <div className="addonDiv" onClick={() => this.addDressing(name)}>
                <tr key={name}>{name} - add ${price}<input className="selectAddon" id={name} type="radio" /></tr>
            </div>
        )
    }

    addDressing(name) {
        this.setState({ itemSide:  name });

    }

    addSide(name, price) {
        // set the selected side (if one has not already been selected)
        if (parseInt(this.state.selectedSide) < 0) {
            for (let i = 0; i < this.state.sideLength; i++) {
                if (this.props.selectedItem.sides[i].name == name) {
                    // add the side to the order
                    let tempTotal = parseFloat(this.state.total);
                    tempTotal = tempTotal + parseFloat(price);
                    this.setState({ itemSide: this.props.selectedItem.sides[i], total: tempTotal, selectedSide: i });
                }
            }
        }
        else {
            // remove the item from the list and update total
            var tempTotal = parseFloat(this.state.total);

            let oldSideIndex = parseInt(this.state.selectedSide);
            let oldSidePrice = parseFloat(this.props.selectedItem.sides[oldSideIndex].price)
            tempTotal = tempTotal - parseFloat(oldSidePrice);

            for (let i = 0; i < this.state.sideLength; i++) {
                if (this.props.selectedItem.sides[i].name == name) {
                    tempTotal = tempTotal + parseFloat(price);
                    this.setState({ itemSide: this.props.selectedItem.sides[i], total: tempTotal, selectedSide: i })
                }
            }
        }

    }

    addOptional(name, price) {
        // copy the addons from state
        let tempAddons = this.state.itemAddons;
        var found = false;
        // search if the addon is already in the list
        for (var i = 0; i < tempAddons.length; i++) {
            // if addon is found, remove it
            if (tempAddons[i].name === name) {
                var slicedAddons = tempAddons.slice(i, i);
                found = true;
                // Update the total
                let tempTotal = parseFloat(this.state.total);
                tempTotal = tempTotal - parseFloat(price);
                this.setState({ itemAddons: slicedAddons, total: tempTotal });
                //
                // Todo: change radio button to image and change image
            }
        }

        // if addon was not already added
        // add the item to the array
        if (!found) {
            let tempItem = { "name": name, "price": price };
            tempAddons.push(tempItem);
            // update the total
            let tempTotal = parseFloat(this.state.total);
            tempTotal = tempTotal + parseFloat(price);
            this.setState({ itemAddons: tempAddons, total: tempTotal });
            //
            // Todo: change radio button to image and change image
        }




    }

    componentDidMount() {
        let length = (this.props.selectedItem.sides).length;
        this.setState({ total: this.props.selectedItem.price, sideLength: length });
    }


    closeMenuCard() {

    }

    addToOrder() {
        let tempAdd = this.state.itemAddons;
        let finishedAddons = [];
        for (var i = 0; i < tempAdd.length; i++) {
            finishedAddons.push(tempAdd[i]);
        }
        let finishedSide = [];
        finishedSide.push(this.state.itemSide);

        let finishedItem = { "name": this.props.selectedItem.name, "price": this.props.selectedItem.price, "quantity": this.state.quantity, "addons": finishedAddons, "sides" : finishedSide };
        this.props.addToCart(finishedItem);
    }

    increaseQuantity() {
        let tempCount = parseInt(this.state.quantity);
        tempCount++;
        let tempPrice = parseFloat(this.state.total);
        tempPrice = tempPrice + parseFloat(this.props.selectedItem.price);
        this.setState({ quantity: tempCount, total: tempPrice });
    }

    decreaseQuantity() {
        let tempCount = parseInt(this.state.quantity);
        if (tempCount > 1) {
            tempCount--;
            let tempPrice = parseFloat(this.state.total);
            tempPrice = tempPrice - parseFloat(this.props.selectedItem.price);
            this.setState({ quantity: tempCount, total: tempPrice });
        }
    }

    render() {

        if ((this.props.selectedItem.sides).length > 0) {
            return (
                <div>
                    <img className="backButton" src="assets/images/back.png" alt="back" onClick={() => this.props.closeMenuItemCard(1)} />
                    <div className="imageHeader">
                        <img src={this.props.selectedItem.image} alt="" />
                    </div>
                    <h2>{this.props.selectedItem.name}</h2>
                    <p>{this.props.selectedItem.description}</p>
                Select a Side:
                    <table>
                        <tbody>
                            {this.props.selectedItem.sides.map(this.menuItemSides.bind(this))}
                        </tbody>
                    </table>
                Select Addons:
                    <table>
                        <tbody>
                            {this.props.selectedItem.addons.map(this.menuItemAddOns.bind(this))}
                        </tbody>
                    </table>
                    <div className="quantity">
                        <div className="quantityHeader">Quanity</div>
                        <div className="subtract" onClick={() => this.decreaseQuantity()}>-</div>
                        <div className="count">{this.state.quantity}</div>
                        <div className="addCount" onClick={() => this.increaseQuantity()}>+</div>
                    </div>
                    <div className="addToOrderDiv" onClick={() => this.addToOrder()}>Add to Order <div className="total">${this.state.total}</div></div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <img className="backButton" src="assets/images/back.png" alt="back" onClick={() => this.props.closeMenuItemCard(1)} />
                    <div className="imageHeader">
                        <img src={this.props.selectedItem.image} alt="" />
                    </div>
                    <h2>{this.props.selectedItem.name}</h2>
                    <p>{this.props.selectedItem.description}</p>
                Select Addons:
                    <table>
                        <tbody>
                            {this.props.selectedItem.addons.map(this.menuItemAddOns.bind(this))}
                        </tbody>
                    </table>
                    <div className="quantity">
                        <div className="quantityHeader">Quanity</div>
                        <div className="subtract" onClick={() => this.decreaseQuantity()}>-</div>
                        <div className="count">{this.state.quantity}</div>
                        <div className="addCount" onClick={() => this.increaseQuantity()}>+</div>
                    </div>
                    <div className="addToOrderDiv" onClick={() => this.addToOrder()}>Add to Order <div className="total">${this.state.total}</div></div>
                </div>
            )
        }
    }
}

export default MenuItem;