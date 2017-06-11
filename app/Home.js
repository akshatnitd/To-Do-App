import React from 'react';
import {grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Item from './Item';
import Delete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';


const muiTheme = getMuiTheme({
    palette: {
        textColor: grey900,
    },
    fontFamily: 'Roboto, sans-serif'
});

const styles = {

    borderMargin : {
        margin: 'auto',
        marginTop: 25,
        padding: 20,
        maxWidth: 600
    },
    button: {
        margin: 12,
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        const items = JSON.parse(localStorage.getItem('items'));
        var ctr=0;

        for(let i=0;i<items.length;i++)
        {
            if(items[i].checked == true)
                ctr++;
        }
        const count = items.length;
        
        this.state = {
            value: '',
            error_msg: '' ,
            items: items,
            counter: count,
            completedCounter: ctr
        };
    }

    componentDidMount = () => {
        document.getElementById('add_field').addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13)
                document.getElementById("add_btn").click();
        });
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };


    onClick = () => {

        var err=0;
        var val = this.state.value.trim();
        if(val.length ==0 )
        {
            err=err+1;
            this.setState({value: '', error_msg: "To-do task cannot be empty"});
        }
        else
            this.setState({error_msg: ""});

        if(err==0)
        {
            this.setState(
                (prevState) => ({
                    items: prevState.items.concat({checked: false, title: val}), 
                    value:"", 
                    counter: prevState.counter + 1
                })
                , () => {
                    localStorage.setItem('items', JSON.stringify(this.state.items))
                }
            );                      
        }

    }

    updateItems = (idx, flag=false, title, type) => {
        var temp = this.state.items;

        if(type === 'title')
            temp[idx].title = title;
        else
        {
            temp[idx].checked = flag;
            if(flag==true)
                this.setState((prevState) => ({completedCounter : prevState.completedCounter + 1})); 
            else
                this.setState((prevState) => ({completedCounter : prevState.completedCounter - 1})); 
        }

        this.setState({items : temp}); 
        localStorage.setItem('items', JSON.stringify(temp));     
    }

    deleteItem = (idx) => {
        var temp = this.state.items;
        if(temp[idx].checked==true)
            this.setState((prevState) => ({completedCounter : prevState.completedCounter - 1})); 
        temp.splice(idx, 1);
        var count = this.state.counter - 1;
        this.setState({counter: count, items : temp}); 
        localStorage.setItem('items', JSON.stringify(temp));    
    }

    deleteChecked = () => {
        var temp = this.state.items;
        var ans=[];
        for (var i = 0; i < temp.length; i++) { 
            if(temp[i].checked == false)
                ans.push(temp[i]);
        }
        const checkedNos = temp.length - ans.length;
        this.setState((prevState) => ({completedCounter : prevState.completedCounter - checkedNos, counter: ans.length, items : ans})); 
        localStorage.setItem('items', JSON.stringify(ans));   
    }

    selectAll = (event, isInputChecked) => {
        const flag = isInputChecked;
        var temp = this.state.items;
        if(flag)
            this.setState({completedCounter : temp.length}); 
        else
            this.setState({completedCounter : 0 }); 
        var temp = this.state.items;
        for (var i = 0; i < temp.length; i++) 
            temp[i].checked = flag;

        this.setState({counter: temp.length, items : temp}); 
        localStorage.setItem('items', JSON.stringify(temp));   
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="To-do App"
                        titleStyle= {{fontSize: 20}}
                    />

                    <div style={styles.borderMargin}>
                        <TextField
                            id="add_field"
                            defaultValue=""
                            floatingLabelText="Add a To-do task"
                            errorText={this.state.error_msg}
                            value={this.state.value}
                            onChange={this.handleChange}
                            hintText="To-do Task"
                            fullWidth={true}
                            autoFocus={true}
                            multiLine={true}
                        />


                        <div style={{textAlign: 'center'}}>
                            <RaisedButton 
                                label="ADD TASK" 
                                primary={true}
                                style={{marginTop: 30}}
                                onClick={this.onClick} 
                                id="add_btn"
                            />           
                        </div>

                         

                            {
                                this.state.counter == 0 
                                ? null 
                                : 
                                <div style={{ margin: 20, marginLeft: 0, paddingBottom: 10}}>
                                <div style={{float: 'left'}} >
                                    <Checkbox 
                                        label="Mark All To-Dos"
                                        labelStyle={{fontWeight: 'bold', width: 150}}
                                        checked={this.state.counter == this.state.completedCounter ? true : false} 
                                        onCheck={this.selectAll} 
                                    />
                                    
                                </div>
                            
                                <div style={{float: 'right'}}>
                                    <b>Counter:</b> {this.state.counter} {this.state.counter == 1 ? 'item' : 'items'}
                                </div>
                                </div>
                            }
                        
                            { this.state.counter==0 ? null : <Divider />}

                       
                        <div>
                        {
                            this.state.items.map( (val, index) => (
                                <Item 
                                    key={index} 
                                    position={index} 
                                    title={val.title} 
                                    checked={val.checked} 
                                    deleteItem={this.deleteItem.bind(this)} 
                                    updateCheck={this.updateItems.bind(this)} 
                                />                                    
                            ))
                        }
                        </div>

                        {
                            this.state.completedCounter == 0 
                            ? null 
                            : <div style={{textAlign: 'center'}}>
                                <RaisedButton
                                    label="Delete Completed To-Dos"
                                    labelPosition="before"
                                    primary={true}
                                    icon={<Delete/>}
                                    style={styles.button}
                                    onTouchTap={this.deleteChecked}
                                /> 
                            </div>
                        }

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Home;