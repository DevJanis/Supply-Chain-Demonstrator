import { Stack, Form, Button } from "react-bootstrap";
import React, { Component } from 'react'

class AddRow extends Component {

    cancelInput = () => {
        document.getElementById("addRow").reset();
    }

    render() {
        return (
            <div id="addrow-table">
                <Form id="addRow" style={{ width: '100%' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Variablename</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">orderId</th>
                                <td><Form.Control id="_orderId" ref={(input) => this.inputOrderId = input} placeholder="Add your Order-ID here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">batchNumber</th>
                                <td><Form.Control id="_batchNumber" ref={(input) => this.inputBatchNumber = input} placeholder="Add your Batchnumber here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">prevOrderIds</th>
                                <td><Form.Control id="_prevOrderIds" ref={(input) => this.inputPrevOrderId = input} placeholder="Add your previous Order-IDs here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">shipmentDate</th>
                                <td><Form.Control id="_shipmentDate" ref={(input) => this.inputShipmentDate = input} placeholder="Add your shipment Date here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">workPerformed</th>
                                <td><Form.Control id="_workPerformed" ref={(input) => this.inputWorkPerformed = input} placeholder="Add your performed work here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">article</th>
                                <td><Form.Control id="_article" ref={(input) => this.inputArticle = input} placeholder="Add your article here..." required /></td>
                            </tr>
                            <tr>
                                <th scope="row">receiverId</th>
                                <td><Form.Control id="_receiverId" ref={(input) => this.inputReceiverId = input} placeholder="Add your Receiver-ID here..." required /></td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="secondary" onClick={(event) => {
                        event.preventDefault()/* 
                        console.log('this.inputPrevOrderId.value', this.inputPrevOrderId.value)
                        console.log('this.inputBatchNumber.value', this.inputBatchNumber.value) */
                        this.props.addRow(
                            this.inputOrderId.value,
                            this.inputBatchNumber.value,
                            this.inputPrevOrderId.value,
                            this.inputShipmentDate.value,
                            this.inputWorkPerformed.value,
                            this.inputArticle.value,
                            this.inputReceiverId.value)
                    }}>Submit</Button>
                    <Button variant="outline-danger" onClick={(event) => {
                        this.cancelInput()
                    }}>Reset</Button>
                </Stack>
            </div >
        );
    }
}

export default AddRow;