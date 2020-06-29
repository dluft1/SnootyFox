import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonItem, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect } from '@ionic/react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './Tab2.css';
import * as $ from 'jquery';

var activeOrder = [];



export class MenuPage extends React.Component {
  render() {
    return (
      <Router>
        <Header />
      <Route path="/tab2" component={Main} />
      <Route path="/starters" component={Starters} />
      <Route path="/fries" component={Fries} />
      <Route path="/wings" component={Wings} />
      <Route path="/burgers" component={Burgers} />
      <Route path="/common" component={Common} />
      <Route path="/beverages" component={Beverages} />
    </Router>
    )
  }
}

export class Header extends React.Component {
  render() {
    return (
      <IonHeader>
        <div className="horizontalScroll">
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/starters">Starters</NavLink>
        <NavLink to="/fries">Fries</NavLink>
        <NavLink to="/wings">Wings`</NavLink>
        <NavLink to="/burgers">Burgers</NavLink>
        <NavLink to="/common">Common Fare</NavLink>
        <NavLink to="/beverages">Beverages</NavLink>
         </div>   
      </IonHeader>
    )
  }
}

class MenuItemCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      price: "",
      description: "",
      image: "",
      itemCount: "0"
    }
  }

  toggleMenuCardOff() {
    $('.menuItemCardFrame').css("zIndex", -1);
  }

  increaseItemCount() {
    let temp = parseInt(this.state.itemCount);
    temp++;
    this.setState({ itemCount: temp });
  }

  decreaseItemCount() {
    let temp = parseInt(this.state.itemCount);
    if (temp > 0) {
      temp--;
      this.setState({ itemCount: temp });
    }
  }

  addToOrder(name, price, quantity) {
    // $.post('http://localhost:80/snootyfox/index.php', { action: 'addToOrder', item: name, price: price, quantity: quantity }, function (response) 
    // {
    activeOrder.push([name, price, quantity]);
    console.log(activeOrder);
    //})
    this.props.history.push({ pathname: './Tab3.js', state: { detail: activeOrder } })
    this.toggleMenuCardOff();
  }

  render() {
    return (
      <div className="menuItemCardFrame">
        <IonCard className="menuItemCard">
          <IonCardContent>
            <div className="menuItemCardHeader">
              <img src={this.props.image} alt="" />
            </div>
        ${this.props.price}<br />
            <img src="assets/images/xIcon.png" alt="" className="closeIcon" onClick={() => this.toggleMenuCardOff()} />
            {this.props.description}
          </IonCardContent>
          <div className="orderButtons">
            <IonButton size="small" id="buttonPadding" onClick={() => this.decreaseItemCount()}>&#60;</IonButton>
            {this.state.itemCount}
            <IonButton size="small" id="buttonPadding" onClick={() => this.increaseItemCount()}>&#62;</IonButton><br /><br />
            <IonButton color="danger" onClick={() => this.addToOrder(this.props.name, this.props.price, this.state.itemCount)}>Add To Order</IonButton>
          </div>
        </IonCard>
      </div>
    )
  }
}

class Starters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startersData: [],
      name: "",
      price: "",
      description: "",
      image: ""

    }
    this.toggleMenuCard = this.toggleMenuCardOn.bind(this);
  }

  toggleMenuCardOn(name, price, description, image) {
    this.setState(state => ({ name: name, price: price, description: description, image: image }))
    $('.menuItemCardFrame').css("zIndex", 2);
  }

  menuTableData({ name, description, price, image, id }) {
    return (<div>
      <tr key={id} id="menuItemSlide" onClick={() => this.toggleMenuCardOn(name, price, description, image)}>
        <td><img src={image} className="imgFit" alt="" /></td>
        <td className="menuListStyle">
          <h5>{name}</h5>
            ${price}
        </td>
      </tr>
    </div>
    )

  }

  componentDidMount() {
    console.log("We got in here");
    let currentComponent = this;
    $.post('http://localhost:80/snootyfox/index.php', { action: 'menu', section: 'starters' }, function (response) {
      let temp = JSON.parse(response);
      currentComponent.setState({ startersData: temp })
    })
  }
  render() {
    let currentComponent = this;

    return (

      <div>
        <table >
          <tbody>{currentComponent.state.startersData.map(currentComponent.menuTableData.bind(currentComponent))}</tbody>
        </table>
        <MenuItemCard name={this.state.name} price={this.state.price} description={this.state.description} image={this.state.image} />
      </div>
    )
  }
}

class Fries extends React.Component {

  render() {
    return (
      <div>
        sadf
      </div>
    )
  }
}
class Wings extends React.Component {
  render() {
    return (
      <div>sadf</div>)
  }
}
class Burgers extends React.Component {
  render() {
    return (
      <div>sadf</div>)
  }
}
class Common extends React.Component {
  render() {
    return (
      <div>sadf</div>)
  }
}
class Beverages extends React.Component {
  render() {
    return (
      <div>sadf</div>)
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <IonGrid >
          <IonRow >
            <IonCol >
              <div className="ion-activatable ripple-parent" >
                <img src="assets/images/sections/starters-300x300.webp" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/fries-poutine-1-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/wings-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/burger-300x300.webp" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/common-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/beverages-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    )
  }
}
