import React from 'react';
import 'antd/dist/antd.css';
import { Card,Button } from 'antd';
//import  PlusOutlined  from'@antd-design/icons/PlusOutlined';



export default class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', items: [], idCounter: 0, };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);


    }
    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e, index) {
        e.preventDefault();
        const newItem = {
            text: this.state.text,
            id: this.state.idCounter,
        };

        this.setState({
            items: this.state.items.concat(newItem),
            text: '',
            idCounter: this.state.idCounter + 1,
        });
    }
    deleteItem(index) {
        const list = this.state.items;
        list.splice(index, 1);
        this.setState({
            items: list,
        });
    }

    render() {
        return (<div>
                            <div>
                            {this.state.items.map((item, index) => (
                            <Card>
                            <p>{ item.text }</p>
                            <span  onClick={() => this.deleteItem(index)} >x</span> 
                            </Card>                                  ))
                            }
                </div>
        <form onSubmit={this.handleSubmit}>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.text}> 
                              </input>
                              <Button type="primary" shape="circle" >+</Button>
                            </form> 
                        </div>);
    }
}
