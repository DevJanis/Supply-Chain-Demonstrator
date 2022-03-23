import React, { Component } from 'react'
import { Spinner, Accordion, Stack } from 'react-bootstrap'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import Web3 from 'web3'
import './App.css'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config'
import GetRow from './components/getRow'
import AddRow from './components/addRow'
import ChangeRow from './components/changeRow'
import AddToList from './components/addToList'
import HowToGrundlagen from './howto/grundlagen'
import HowToViewDataset from './howto/viewDataset'
import HowToAddDataset from './howto/addDataset'
import HowToChangeDataset from './howto/changeDataset'
import HowToAdminArea from './howto/adminArea'

class App extends Component {

    inputOrderId = 0;

    componentWillMount() {
        this.loadBlockchainData()
    }

    componentDidMount() {
        window.addEventListener("scroll", () => {
            const topBorder = document
                .getElementById("navbar-container")
                .getBoundingClientRect().top;

            topBorder >= 0
                ? document.getElementById("navbar").classList.remove("fixed")
                : document.getElementById("navbar").classList.add("fixed");
        });
        document.title = "Supply-Chain Demonstrator"
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll')
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
        const network = await web3.eth.net.getNetworkType()
        this.setState({ network })

        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const databaseList = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        this.setState({ databaseList })

        const firstLine = await databaseList.methods.getRow(this.inputOrderId).call()
        var firstLineValues = Object.entries(firstLine);
        this.setState({ firstLineValues })

        var tmp = Object.entries(firstLineValues[0])
        var _senderId = tmp[1][1]
        this.setState({ _senderId })
        tmp = Object.entries(firstLineValues[1])
        var _authorisedIds = tmp[1][1]
        this.setState({ _authorisedIds })
        tmp = Object.entries(firstLineValues[2])
        var _batchNumber = tmp[1][1]
        this.setState({ _batchNumber })
        tmp = Object.entries(firstLineValues[3])
        var _prevOrderIds = tmp[1][1]
        this.setState({ _prevOrderIds })
        tmp = Object.entries(firstLineValues[4])
        var _shipmentDate = tmp[1][1]
        this.setState({ _shipmentDate })
        tmp = Object.entries(firstLineValues[5])
        var _workPerformed = tmp[1][1]
        this.setState({ _workPerformed })
        tmp = Object.entries(firstLineValues[6])
        var _article = tmp[1][1]
        this.setState({ _article })
        tmp = Object.entries(firstLineValues[7])
        var _receiverId = tmp[1][1]
        this.setState({ _receiverId })
        tmp = Object.entries(firstLineValues[8])
        var _deliveryConfirmation = tmp[1][1]
        this.setState({ _deliveryConfirmation })
        this.setState({ loading: false })
    }


    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            account: '',
            _senderId: '0x00',
            _authorisedIds: ['0x00', '0x00'],
            _batchNumber: 0,
            _prevOrderIds: '',
            _shipmentDate: 0,
            _workPerformed: '',
            _article: '',
            _receiverId: '0x00',
            _deliveryConfirmation: 'false',
            _orderId: this.inputOrderId,
            _allowedEntry: '',
            loading: true,
        }
        this.getRow = this.getRow.bind(this)
        this.addRow = this.addRow.bind(this)
        this.changeRow = this.changeRow.bind(this)
        this.addToList = this.addToList.bind(this)
    }

    getRow(OrderId) {
        this.setState({ loading: true })
        this.inputOrderId = OrderId
        this.state._orderId = OrderId
        this.loadBlockchainData()
    }


    addRow(OrderId, BatchNumber, PrevOrderId, ShipmentDate, WorkPerformed, Article, ReceiverId) {
        this.setState({ loading: true })
        PrevOrderId = PrevOrderId.split(",");
        this.state.databaseList.methods.addRow(OrderId, BatchNumber, PrevOrderId, ShipmentDate, WorkPerformed, Article, ReceiverId).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.getRow(OrderId)
            })
    }

    changeRow(OrderId, deliveryConfirmation) {
        this.setState({ loading: true })
        this.state.databaseList.methods.changeRow(OrderId, deliveryConfirmation).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.getRow(OrderId)
            })
    }

    addToList(allowedEntry) {
        this.setState({ loading: true })
        this.state.databaseList.methods.addToList(allowedEntry).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.getRow(0)
            })

    }

    render() {
        return (
            <div id="App">
                <section id="navbar-container">
                    <nav id="navbar">
                        <Stack direction="horizontal" gap={3}>
                            <div className="">
                                <h1>Supply-Chain Demonstrator</h1>
                            </div>
                            <div className="ms-auto">
                                Your Account @{this.state.network} Network:
                            </div>
                            <div className="">
                                {this.state.account}
                            </div>
                        </Stack>
                    </nav>
                </section>
                <div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Anleitung</Accordion.Header>
                            <Accordion.Body>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={2}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">
                                                        Grundlagen
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">
                                                        View Dataset
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="third">
                                                        Add Dataset
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fourth">
                                                        Change Dataset
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fifth">
                                                        Admin-Area
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <h2>Grundlagen</h2>
                                                    {this.state.loading
                                                        ? <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                        : <HowToGrundlagen />
                                                    }
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <h2>View Dataset</h2>
                                                    {this.state.loading
                                                        ? <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                        : <HowToViewDataset />
                                                    }
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <h2>Add Dataset</h2>
                                                    {this.state.loading
                                                        ? <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                        : <HowToAddDataset />
                                                    }
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fourth">
                                                    <h2>Change Dataset</h2>
                                                    {this.state.loading
                                                        ? <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                        : <HowToChangeDataset />
                                                    }
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fifth">
                                                    <h2>Admin-Area</h2>
                                                    {this.state.loading
                                                        ? <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                        : <HowToAdminArea />
                                                    }
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>View Dataset</Accordion.Header>
                            <Accordion.Body>
                                {this.state.loading
                                    ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                    : <GetRow inputOrderId={this.state.inputOrderId}
                                        _orderId={this.state._orderId}
                                        _senderId={this.state._senderId}
                                        _authorisedIds={this.state._authorisedIds}
                                        _batchNumber={this.state._batchNumber}
                                        _prevOrderIds={this.state._prevOrderIds}
                                        _shipmentDate={this.state._shipmentDate}
                                        _workPerformed={this.state._workPerformed}
                                        _article={this.state._article}
                                        _receiverId={this.state._receiverId}
                                        _deliveryConfirmation={this.state._deliveryConfirmation}
                                        getRow={this.getRow} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Add Dataset</Accordion.Header>
                            <Accordion.Body>
                                {this.state.loading
                                    ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                    : <AddRow inputOrderId={this.state.inputOrderId}
                                        _orderId={this.state._orderId}
                                        _senderId={this.state._senderId}
                                        _authorisedIds={this.state._authorisedIds}
                                        _batchNumber={this.state._batchNumber}
                                        _prevOrderIds={this.state._prevOrderIds}
                                        _shipmentDate={this.state._shipmentDate}
                                        _workPerformed={this.state._workPerformed}
                                        _article={this.state._article}
                                        _receiverId={this.state._receiverId}
                                        _deliveryConfirmation={this.state._deliveryConfirmation}
                                        addRow={this.addRow}
                                        getRow={this.getRow} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Change Dataset</Accordion.Header>
                            <Accordion.Body>
                                {this.state.loading
                                    ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                    : <ChangeRow inputOrderId={this.state.inputOrderId}
                                        _orderId={this.state._orderId}
                                        _senderId={this.state._senderId}
                                        _authorisedIds={this.state._authorisedIds}
                                        _batchNumber={this.state._batchNumber}
                                        _prevOrderIds={this.state._prevOrderIds}
                                        _shipmentDate={this.state._shipmentDate}
                                        _workPerformed={this.state._workPerformed}
                                        _article={this.state._article}
                                        _receiverId={this.state._receiverId}
                                        _deliveryConfirmation={this.state._deliveryConfirmation}
                                        changeRow={this.changeRow}
                                        getRow={this.getRow} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header _disabled={{ bg: 'red', color: 'white' }}>
                                Admin-Area
                            </Accordion.Header>
                            <Accordion.Body>
                                {this.state.loading
                                    ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </Spinner>
                                    : <AddToList _allowedEntry={this.state._allowedEntry}
                                        addToList={this.addToList}
                                        getRow={this.getRow} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div ref={el => { this.el = el; }} />
                </div>
            </div >
        );
    }
}

export default App;