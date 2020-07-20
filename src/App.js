import React from 'react';
import { BrowserRouter as Router, Route,  NavLink, withRouter } from 'react-router-dom';
import { IonContent, IonHeader, IonMenu,  IonToolbar,  IonItem, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonApp, IonTitle, IonList, IonMenuButton } from '@ionic/react';

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

import './Style.css';
import './account.css';
import * as $ from 'jquery';

/* Theme variables */
import './theme/variables.css';
import ShoppingCart from "./pages/Cart.js";
import AccountPage from "./pages/Account.js";
import { runInThisContext } from 'vm';


/**  
 * 
 * TODO: 
 * 
 *  - Move Menu to own file and import
 *  - Remove obsolete variables used for testing / old designs
 *  - Optimize for tablet
 *  - Enter rest of menu database  
 *  
 */

const App = React.FC = () => (
  <IonApp>
    <IonContent>
      <AppWindow />
    </IonContent>
  </IonApp>
);

// Main APP Window, displays header
class AppWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      ordered: [],
      view: "menu",
      loggedIn: "false",
      account: "",
      menuItem: {},
      activeOrder: []
    };
  }
  render() {
    return (
      <div>
        <Header addToCart={this.addToCart.bind(this)} changeView={this.changeView.bind(this)} cart={this.state.cart} loggedIn={this.state.loggedIn} changeLoggedIn={this.changeLoggedIn.bind(this)} account={this.state.account}/>
      </div>
    )
  }

  changeLoggedIn(status) {
    this.setState({ loggedIn: status });
  }

  addToCart(selectedItem) {
    if (this.state.loggedIn == "true") {
      this.setState({ cart: [selectedItem] });
    }
    else {
      alert("Please login");
    }
  }

  changeView(view) {
    if (view == "account" || view == "cart" && this.state.view == "menu") {
      this.setState({ view: view })
      $(".horizontalScroll").hide();
    }
    else if (view == "menu" && this.state.view == "cart" || this.state.view == "account") {
      this.setState({ view: view })
      $(".horizontalScroll").show();
    }
  }
}


/**
 * Main header class
 * Controls routing for app
 */
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "menu"
    }
  }
  render() {
    return (
      <Router>
        <IonMenu side="start" menuId="first" content-id="main" width="50">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <NavLink to="/" onClick={() => this.props.changeView("menu")}><IonItem>Home</IonItem></NavLink>
              <NavLink to="/starters" onClick={() => this.props.changeView("menu")}><IonItem>Starters</IonItem></NavLink>
              <NavLink to="/fries" onClick={() => this.props.changeView("menu")}><IonItem>Fries</IonItem></NavLink>
              <NavLink to="/wings" onClick={() => this.props.changeView("menu")}><IonItem>Wings</IonItem></NavLink>
              <NavLink to="/Burgers" onClick={() => this.props.changeView("menu")}><IonItem>Burgers</IonItem></NavLink>
              <NavLink to="/Beverages" onClick={() => this.props.changeView("menu")}><IonItem>Beverages</IonItem></NavLink>
              <IonItem></IonItem>
              <NavLink to="/cart" onClick={() => this.props.changeView("cart")}><IonItem>Cart</IonItem></NavLink>
              <NavLink to="/account" onClick={() => this.props.changeView("account")}><IonItem>Account</IonItem></NavLink>
          </IonList>
          </IonContent>
        </IonMenu>

        <IonHeader>
          <IonItem lines="none">
            <IonMenuButton id="main" /> <h2 id="appHeader">The SnootyFox Menu App</h2>
          </IonItem>
          <IonToolbar>
            <div className="horizontalScroll">
              <IonItem lines="none" className="itemSize">
                <NavLink exact to="/" id="sectionLinks">Home</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/starters">Starters</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/fries">Fries</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/wings">Wings</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/burgers">Burgers</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/common">Common Fare</NavLink>
              </IonItem>
              <IonItem lines="none" className="itemSize">
                <NavLink to="/beverages">Beverages</NavLink>
              </IonItem>
            </div>
          </IonToolbar>
          <Route exact path="/" component={withRouter(Main)} />
          <Route path="/starters" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"starters"}/>)} />
          <Route path="/fries" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"fries"} />)} />
          <Route path="/wings" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"wings"}/>)} />
          <Route path="/burgers" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"burgers"} />)} />
          <Route path="/common" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"common"}/>)} />
          <Route path="/beverages" render={props => (<Menu addToCart={this.props.addToCart.bind(this)} menuSection={"beverages"} />)} />
          <Route path="/account" render={props => (<AccountPage changeLoggedIn={this.props.changeLoggedIn.bind(this) } loggedIn={this.props.loggedIn}  />)} />
          <Route path="/cart" render={props => (<ShoppingCart cart={this.props.cart} loggedIn={this.props.loggedIn} />)} />
        </IonHeader>
      </Router >
    )
  }
}


/**
 * Displays the menu item in a card when displayed
 */
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

  // Remove display of card
  toggleMenuCardOff() {
    $('.menuItemCardFrame').hide();
  }

  // Increase amount of item in menu card
  increaseItemCount() {
    let temp = parseInt(this.state.itemCount);
    temp++;
    this.setState({ itemCount: temp });
  }

  // decrease amount of item in menu card
  decreaseItemCount() {
    let temp = parseInt(this.state.itemCount);
    if (temp > 0) {
      temp--;
      this.setState({ itemCount: temp });
    }
  }

  // add menu item to cart
  addToOrder(name, price, quantity) {
    // $.post('http://dariusluft.ca/snootyfox/index.php', { action: 'addToOrder', item: name, price: price, quantity: quantity }, function (response) 
 
    var selectedItem = { name: name, price: price, quantity: quantity };
    this.props.addToCart(selectedItem);
    this.toggleMenuCardOff();
  }

  // Diplay the menu item Card
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
            <IonButton color="danger"  onClick={() => this.addToOrder(this.props.name, this.props.price, this.state.itemCount)}>Add To Order</IonButton>
          </div>
        </IonCard>
      </div>
    )
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [],
      name: "",
      price: "",
      description: "",
      image: ""

    }
    this.toggleMenuCard = this.toggleMenuCardOn.bind(this);
  }

  toggleMenuCardOn(name, price, description, image) {
    this.setState(state => ({ name: name, price: price, description: description, image: image }))

    $('.menuItemCardFrame').show();
  }

  menuTableData({ name, description, price, image, id }) {
    return (
      <tr key={id} id="menuItemSlide" onClick={() => this.toggleMenuCardOn(name, price, description, image)}>
        <td><img src={image} className="imgFit" alt="" /></td>
        <td className="menuListStyle">
          <h5>{name}</h5>
            ${price}
        </td>
      </tr>
    )

  }

  componentDidMount() {
    let currentComponent = this;
    // $.post('http://dariusluft.ca/snootyfox/index.php', { action: 'menu', section: this.props.menuSection }, function (response)
    $.post('http://24.141.109.234:8080/snootyfox/index.php', { action: 'menu', section: this.props.menuSection }, function (response) {
      let temp = JSON.parse(response);
      currentComponent.setState({ menuData: temp })
    })
  }
  render() {
    let currentComponent = this;

    return (

      <div className="menuItemsList">
        <table >
          <tbody>{currentComponent.state.menuData.map(currentComponent.menuTableData.bind(currentComponent))}</tbody>
        </table>
        <MenuItemCard name={this.state.name} price={this.state.price} description={this.state.description} image={this.state.image} addToCart={this.props.addToCart.bind(this)} />
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <IonGrid >
          <IonRow >
            <IonCol >
            <NavLink to="/starters">
              <div className="ion-activatable ripple-parent" >
                <img src="assets/images/sections/starters-300x300.webp" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
            <IonCol>
            <NavLink to="/fries">
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/fries-poutine-1-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <NavLink to="/wings">
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/wings-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
            <IonCol>
            <NavLink to="/burgers">
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/burger-300x300.webp" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <NavLink to="/common">
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/common-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
            <IonCol>
            <NavLink to="/beverages">
              <div className="ion-activatable ripple-parent">
                <img src="assets/images/sections/beverages-300x300.jpg" className="alignItemsCenter" alt="" />
                <IonRippleEffect></IonRippleEffect>
              </div>
              </NavLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    )
  }
}


export default App;