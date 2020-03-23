import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Typography, Button, Input, Form, Row, Col, Card, Breadcrumb, Modal } from 'antd';
import { DeleteTwoTone, EditTwoTone, CheckCircleTwoTone} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Layout className="layout">
    <Header>
      <div className="logo" />
      <Router>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/content1">Content 1</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/content2">Content 2</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/content3">Content 3</Link></Menu.Item>
      </Menu>
      <Switch>
          <Route exact path="/content1">
            <Content1 />
          </Route>
          <Route path="/content2">
            <Content2 />
          </Route>
          <Route path="/content3">
            <Content3 />
          </Route>
        </Switch>
      </Router>
    </Header>
     <Layout className="layout">
  <Content style={{ padding: '35px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item></Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content" />
       </Content>
    <Footer style={{ textAlign: 'center' }}>'no'</Footer></Layout>
  </Layout>
    );
  }
}

function Content1() {
  return (
   <div className="todoform"><ToDoForm/></div>
    );
}


function Content2() {
  return (<div className="div-content"><h2>About</h2>
  <Content style={{ padding: '0px 0px' }}>
      
      <div className="content">Content</div>
    </Content></div>);
}

function Content3() {
  return (<div className="div-content"><h2>Users</h2></div>);
}




class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', items: [], idCounter: 0, title: '', };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onClickTrue = this.onClickTrue.bind(this);
        this.finishInput = this.finishInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeTitle = this.handleInputChangeTitle.bind(this);

  }
  formRef = React.createRef();

  handleCancel = e => {
    console.log(e);
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };
  showModal() {
    this.setState({
      visible: true,
     
    });
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }
  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }
  handleSubmit(e, index) {
    const newItem = {
      text: this.state.text,
      id: this.state.idCounter,
      title: this.state.title,
      selected: false
      };
      this.formRef.current.resetFields();
    this.setState({
      items: this.state.items.concat(newItem),
      text: '',
      idCounter: this.state.idCounter + 1,
      title: '',
      visible: false,
    });
  }
  onClickTrue(index) {
    this.state.items[index].selected = true;
    this.forceUpdate();
  }
  deleteItem(index) {
    const list = this.state.items;
    list.splice(index, 1);
    this.setState({
      items: list,
    });
  }
  finishInput(index,e){
     e.preventDefault();
    this.state.items[index].text = this.state.items[index].text;
    this.state.items[index].title = this.state.items[index].title;
    this.state.items[index].selected = false;
    this.forceUpdate();
  }
   handleInputChange(index, e) {
    this.state.items[index].text = e.target.value;
    this.forceUpdate();
     }
     handleInputChangeTitle(index, e) {
    this.state.items[index].title = e.target.value;
    this.forceUpdate();
     }

  render() {
    return (<div>           <Row gutter={[16,16]}>
                               {this.state.items.map((item,index) =>( this.state.items[index].selected ===false ?
                                      <Col key={index} span={8}>
                                <Card className="card"
                                actions={[
                                <DeleteTwoTone  onClick={()=>this.deleteItem(index)} 
                                />,<EditTwoTone onClick={()=>this.onClickTrue(index)} />]}>            
                                <Meta title={item.title}
                                  description={item.text}
                                  />
                                </Card>
                                 </Col>
                                 :
                                 <Col key={index}span={8}>
                                <Card  className="card"
                                actions={[
                                <DeleteTwoTone  onClick={()=>this.deleteItem(index)} 
                                />,<CheckCircleTwoTone onClick={(e)=>this.finishInput(index,e)}/>]}>            
                                <Meta title={<Input size="small" onChange={(e)=>this.handleInputChangeTitle(index,e)} value={this.state.items[index].title}></Input>}
                                  description={<Input size="small" onChange={(e)=>this.handleInputChange(index,e)} value={this.state.items[index].text}></Input>}
                                  />
                                </Card>
                                 </Col>
                                  ))}                                
                            </Row>

                                
                       <Modal title = "Your Todo"
                       visible = { this.state.visible }
                       onOk = { this.handleSubmit }
                       onCancel = { this.handleCancel } >
                        <Form className="form" 
                              ref={this.formRef}
                              layout="vertical"
                              >
                          <Form.Item
                                 name="title"
                                 label="Title"
                                 rules={[
                                   {
                                     required: true,
                                     message: 'Please input the title of the todo!',
                                   },
                                 ]}
                               >
                                 <Input onChange = { this.handleTitleChange }
                                        value = { this.state.title } ></Input>
                          </Form.Item >
                          <Form.Item name="description"
                                     label="Description">
                                  <Input 
                                      onChange={this.handleChange}
                                      value={this.state.text}></Input>
                                   
                          </Form.Item>

                            </Form> 
                            </Modal>
<Button  onClick={this.showModal}
className = "button"
 type = "primary"
 shape = "circle">+</Button>
                        </div>);
  }
}

export default App;
