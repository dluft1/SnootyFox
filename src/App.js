import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom';
import { IonContent, IonHeader, IonMenu, IonPage, IonFooter, IonToolbar, IonInput, IonItem, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonApp, IonTitle, IonList, IonRouterOutlet, IonMenuButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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


var activeOrder = [];
var Status = new Object();
Status.loggedIn = "false";
Status.account = "";
var menuItem = {};


const App = React.FC = () => (
  <IonApp>
    <IonContent>
      <AppWindow />
    </IonContent>
  </IonApp>
);


class AppWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      ordered: [],
      view: "menu",
      loggedIn: "false"
    };
  }
  render() {
    return (
      <div>
        <Header addToCart={this.addToCart.bind(this)} changeView={this.changeView.bind(this)} cart={this.state.cart} loggedIn={this.state.loggedIn} changeLoggedIn={this.changeLoggedIn.bind(this)} />
      </div>
    )
  }

  changeLoggedIn(status) {
    this.setState({ loggedIn: status });
  }

  addToCart() {
    if (this.state.loggedIn == "true") {
      this.setState({ cart: activeOrder });
      console.log(this.state.cart);
    }
    else {
      alert("Please login");
    }
  }

  changeView(view) {
    if (view == "account" || view == "cart" && this.state.view == "menu") {
      this.setState({ view: view })
      console.log("Trying to change the view");
      $(".horizontalScroll").hide();
    }
    else if (view == "menu" && this.state.view == "cart" || this.state.view == "account") {
      this.setState({ view: view })
      console.log("Trying to reshow menu submenu");
      $(".horizontalScroll").show();
    }
  }
}

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
              <IonTitle>MenuTest</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <NavLink to="/" onClick={() => this.props.changeView("menu")}><IonItem>Sections</IonItem></NavLink>
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
          <Route path="/starters" render={props => (<Starters addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/fries" render={props => (<Fries addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/wings" render={props => (<Wings addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/burgers" render={props => (<Burgers addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/common" render={props => (<Common addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/beverages" render={props => (<Beverages addToCart={this.props.addToCart.bind(this)} />)} />
          <Route path="/account" render={props => (<AccountPage changeLoggedIn={this.props.changeLoggedIn.bind(this)} />)} />
          <Route path="/cart" render={props => (<ShoppingCart cart={this.props.cart} loggedIn={this.props.loggedIn} />)} />
        </IonHeader>
      </Router >
    )
  }
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <IonHeader id="snootyLogo">
          <img src="assets/images/snooty_fox_logo.webp" />
        </IonHeader>
        <ScreenManager changeLoggedIn={this.props.changeLoggedIn.bind(this)} />
      </div>
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
    $('.menuItemCardFrame').hide();
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
    menuItem = { name: name, price: price, quantity: quantity }
    activeOrder.push(menuItem);
    console.log(activeOrder);
    this.props.addToCart();
    //})
    this.toggleMenuCardOff();
  }

  render() {
    console.log(this.props.image);
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
    console.log("We got in here");
    let currentComponent = this;
    $.post('http://24.141.109.234:8080/snootyfox/index.php', { action: 'menu', section: 'starters' }, function (response) {
      let temp = JSON.parse(response);
      currentComponent.setState({ startersData: temp })
    })
  }
  render() {
    let currentComponent = this;

    return (

      <div className="menuItemsList">
        <table >
          <tbody>{currentComponent.state.startersData.map(currentComponent.menuTableData.bind(currentComponent))}</tbody>
        </table>
        <MenuItemCard name={this.state.name} price={this.state.price} description={this.state.description} image={this.state.image} addToCart={this.props.addToCart.bind(this)} />
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


class ScreenManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: "false",
      account: ""
    }
  }

  switchViewCreate() {
    this.setState({ loggedIn: "create" })
  }

  switchViewLogin() {
    this.setState({ loggedIn: "false" })
  }

  switchViewLoggedIn(account) {
    this.setState({ loggedIn: "true", account: account })
    this.props.changeLoggedIn("true");
  }

  render() {
    if (this.state.loggedIn == "false") {
      return (
        <div>
          <LoggedOut switchViewCreate={this.switchViewCreate.bind(this)} switchViewLoggedIn={this.switchViewLoggedIn.bind(this)} />
        </div>
      )
    }
    else if (this.state.loggedIn == "true") {
      return (
        <div>

          Logged In
        </div>
      )
    }
    else if (this.state.loggedIn == "create") {
      return (
        <div>

          <CreateAccount switchViewLogin={this.switchViewLogin.bind(this)} />
        </div>
      )
    }
  }
}

class LoggedOut extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className="loginForm">
        <h2>Login</h2>
        <form>
          <table id="loginTable">
            <tr>
              <td id="loginFormTdLabel">Email</td>
              <td id="loginFormTdInput"><IonInput placeholder="name@email.com" id="emailField" required type="email" inputmode="email" /></td>
            </tr>
            <tr>
              <td id="loginFormTdLabel">Password</td>
              <td id="loginFormTdInput"><IonInput placeholder="password" id="passwordField" minlength="6" required /></td>
            </tr>
          </table>
          <IonButton size="default" onClick={() => this.logInAccount(this.props.switchViewLoggedIn)}>Login</IonButton><br />
          <span id="createAccountText">Don't have an account? <span id="createOne" onClick={this.props.switchViewCreate.bind(this)}>Create One!</span></span>
        </form>
      </div>
    )
  }
  logInAccount(switchViewLoggedIn) {
    let uEmail = $("#emailField").val();
    let uPassword = $("#passwordField").val();

    $.post('http://24.141.109.234:8080/snootyfox/login.php', { action: "login", email: uEmail, password: uPassword }, function (response) {
      let temp = JSON.parse(response);
      if (response["error"] == "emailError") {

      }
      else if (temp["error"] == "passWordError") {

      }
      else if (temp["login"] == "failed") {

      }
      else if (temp["login"] == "successful") {
        console.log("We got in here");

        switchViewLoggedIn(this, temp["account"]);
      }
    })

  }
}




class CreateAccount extends React.Component {

  render() {
    return (
      <div className="loginForm">
        <h2>Register</h2>
        <form>
          <table id="loginTable">
            <tr>
              <td id="loginFormTdLabel">Email</td>
              <td id="loginFormTdInput"><IonInput placeholder="name@email.com" id="emailField" type="email" inputmode="email" /></td>
            </tr>
            <tr>
              <td id="loginFormTdLabel">Password</td>
              <td id="loginFormTdInput"><IonInput placeholder="password" id="passwordField" minlength="6" /></td>
            </tr>
          </table>
          <IonButton size="default" onClick={() => this.createAccount()}>Login</IonButton><br />
          <span id="createAccountText">Already have an account? <span id="createOne" onClick={this.props.switchViewLogin.bind(this)}>Log In!</span></span>
        </form>
      </div>
    )
  }
  createAccount() {
    let uEmail = $("#emailField").val();
    let uPassword = $("#passwordField").val();

    $.post('24.141.109.234:8080/snootyfox/login.php', { action: 'create', email: uEmail, password: uPassword }, function (response) {
      let temp = JSON.parse(response);
      console.log(temp);
      if (temp["error"] == "invalidEmail") {

      }
      else if (temp["error"] == "invalidPassword") {

      }
      else if (temp["login"] == "tooShort") {

      }
      else if (temp["creation"] = "successfull") {
        Status.loggedIn = "true";
        Status.account = temp["account"];
      }
    }
    )
  }
}





export default App;
