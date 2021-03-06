import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    Alert,
    Label,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Number, DollarSign, Shield, Repeat, Lock } from 'react-feather';

import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
//import logo from '../../assets/images/logo.png';

class resetPassword extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            passwordResetSuccessful: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * On error dismiss
     */
    onDismiss() {
        this.setState({ passwordResetSuccessful: false });
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        console.log(values);

        this.setState({ isLoading: true });

        // You can make actual api call to register here

        window.setTimeout(() => {
            this.setState({ isLoading: false, passwordResetSuccessful: true });
        }, 1000);
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages my-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.state.isLoading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            {/* <img src={logo} alt="" height="24" /> */}
                                                            <h3 className="d-inline align-middle ml-1 text-logo">
                                                                Drop-Off
                                                            </h3>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-4">Reset Password</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Enter your new password.
                                                    </p>

                                                    {this.props.error && (
                                                        <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                            <div>{this.props.error}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm
                                                        onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="newpassword">New Password</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="newpassword"
                                                                    id="newpassword"
                                                                  //  placeholder="xyz@lazydoor.com"
                                                                    value={this.state.otp}
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>
                                                        </AvForm>

                                                        <AvForm
                                                        onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="confirmpassword">Confirm new Password</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Repeat className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="confirmpassword"
                                                                    id="confirmpassword"
                                                                  //  placeholder="xyz@lazydoor.com"
                                                                   // value={this.state.otp}
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>


                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Link to="/account/Confirm">
                                                            <Button color="primary" className="btn-block">
                                                                Submit
                                                            </Button>
                                                            </Link>
                                                        </FormGroup>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                I simply love it!
                                                            </p>
                                                            <p className="lead">
                                                                "It's a elegent templete. I love it very much!"
                                                            </p>
                                                            <p>- Admin User</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            {/* <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="texttext-muted">
                                        Back to{' '}
                                        <Link to="/account/login" className="text-primary font-weight-bold ml-1">
                                            Login
                                        </Link>
                                    </p>
                                </Col>
                            </Row> */}
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default connect()(resetPassword);
