import React from 'react';
import {grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
    maxWidth: 400
  }
};


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          value: '',
          error_msg: '' 
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

        if(this.state.value.length ==0 )
        {
          err=err+1;
          this.setState({error_msg: "To-do task cannot be empty"});
        }
        else
          this.setState({error_msg: ""});

        if(err==0)
        {
          
        }

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
                    />
                </div>

                <div style={{textAlign: 'center'}}>
                    <RaisedButton 
                        label="ADD TASK" 
                        primary={true}
                        style={{marginTop: 30}}
                        onClick={this.onClick} 
                        id="add_btn"/>           
                    </div>


            </div>
          </MuiThemeProvider>
        );
        }
    }

    export default Home;
