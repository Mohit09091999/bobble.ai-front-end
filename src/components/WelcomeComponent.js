import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { PostData } from "../services/PostData";
import { Redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "reactstrap";
import{ FaFacebookSquare } from 'react-icons/fa';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false,
    };
    this.signup = this.signup.bind(this);
  }

  signup(res, type) {
    let postData;
    if (type === "facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url,
      };
    }

    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
      };
    }

    if (postData) {
      PostData("signup", postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({ redirect: true });
      });
    }
  }

  render() {
    if (this.state.redirect || sessionStorage.getItem("userData")) {
      return <Redirect to={"/home"} />;
    }

    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.signup(response, "facebook");
    };

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      console.log(response.profileObj);
      this.signup(response, "google");
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 x ">
            <img src={require("./a.png")} alt="err"/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-5 x">
            <p>
              <strong>SIGN UP</strong>
            </p>
            <br />
            <p style={{ fontSize: "30px", marginBottom: "0px" }}>
              Create Your Account
            </p>
            <p style={{ color: "grey", marginTop: "0px" }}>
              ---
            </p>
            <div style={{ width: "85%", margin: "auto", marginTop: "40px" }}>
              <GoogleLogin
                clientId="782109242585-hur4g3dkt8s9krmfsdhua6t64mru5r8f.apps.googleusercontent.com"
                buttonText="Signup with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <FacebookLogin
                appId="2777940522532659"
                fields="name,email,picture"
                cssClass="fb"
                buttonText="Signup with Facebook"
                icon={<FaFacebookSquare/>}
                callback={responseFacebook}
                
              />
            </div>
            <hr
              style={{
                width: "40%",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            ></hr>{" "}
            <span style={{ color: "grey" }}>or</span>{" "}
            <hr
              style={{
                width: "40%",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            ></hr>
            <Form onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col md={12}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="y"
                  ></input>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="y"
                  ></input>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <input type="email" placeholder="Email" className="y"></input>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <input
                    type="password"
                    placeholder="Password"
                    className="y"
                  ></input>
                </Col>
              </Row>
              <Row>
                <p
                  style={{
                    fontSize: "12px",
                    marginLeft: "50px",
                    color: "grey",
                  }}
                >
                  By Clicking Sign Up, You agree to our{" "}
                  <a href="#">Terms of Use</a> and our{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Button
                    type="submit"
                    color="primary"
                    style={{ width: "85%" }}
                  >
                    SIGN UP
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Welcome;
