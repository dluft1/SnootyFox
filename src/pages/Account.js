import React from 'react';
import {  IonHeader, IonInput, IonButton } from '@ionic/react';


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
          <ScreenManager changeLoggedIn={this.props.changeLoggedIn.bind(this)} loggedIn={this.props.loggedIn} />
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
      if (this.props.loggedIn == "false") {
        return (
          <div>
            <LoggedOut switchViewCreate={this.switchViewCreate.bind(this)} switchViewLoggedIn={this.switchViewLoggedIn.bind(this)} />
          </div>
        )
      }
      else if (this.props.loggedIn == "true") {
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
          //Status.loggedIn = "true";
          this.setState({loggedIn : "true"});
          //Status.account = temp["account"];
          this.setState({account : temp["account"]});
        }
      }
      )
    }
  }

  export default AccountPage;