import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';

const styles = {

    borderMargin : {
        maxWidth: 600,
        width: 'auto',
        height: 'auto',
        padding: '10px 0px 10px 0px',
    }
};

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        var title = this.props.title;
        var checkedStatus = this.props.checked;

        this.state = {

            checked: checkedStatus,
            openDialog: false,
            editValue: title,
            error_msg: '',
            display: false
        };
    }

    componentDidMount = () => {
        var title = this.props.title;
        this.setState({editValue: title });
    };

    handleOpen = () => {
        this.setState({openDialog: true}, () => {
            document.getElementById('edit_field').addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13)
                    document.getElementById("edit_btn").click();
            });
        });
    };

    handleClose = () => this.setState({openDialog: false});

    handleChange = (event) => this.setState({editValue: event.target.value});
    

    onClick = () => {

        var err=0;
        var val = this.state.editValue.trim();
        if(val.length ==0 )
        {
            err=err+1;
            this.setState({editValue: '', error_msg: "To-do task cannot be empty"});
        }
        else
            this.setState({error_msg: ""});

        if(err==0)
        {
            this.props.updateCheck(this.props.position, false, this.state.editValue, 'title');
            this.setState({openDialog: false}); 
        }
    }

    componentWillReceiveProps = (nextProps) => {

        var title = nextProps.title;
        var checkedStatus = nextProps.checked;
        this.setState({
            checked: checkedStatus,
            openDialog: false,
            editValue: title,
            error_msg: '',
            display: false
        });  
    }

    onRequestClose= () => {

        var err=0;
        var val = this.state.editValue.trim();
        if(val.length ==0 )
        {
            this.deleteItem();          
        }
        else
        {
            this.setState({error_msg: ""});
            this.props.updateCheck(this.props.position, false, this.state.editValue, 'title');
        }
        this.setState({openDialog: false}); 
    }


    onToggle = (event, isInputChecked) => {
        this.setState({checked: isInputChecked});
        this.props.updateCheck(this.props.position, isInputChecked, this.state.editValue, 'toggle');
    }

    showHover = () => {
        this.setState({display: true})
    }

    hideHover = () => {
        this.setState({display: false})
    }

    deleteItem = () => {
        this.props.deleteItem(this.props.position);
    }

    render() {

        const actions = [
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onTouchTap={this.handleClose}
                            />,
                            <FlatButton
                                id="edit_btn"
                                label="Save"
                                primary={true}
                                onClick={this.onClick}
                            />
                        ];



        return (
            <div onMouseOver={this.showHover} onMouseLeave={this.hideHover}>
                <div style={styles.borderMargin}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <div>
                            <Checkbox checked={this.state.checked} onCheck={this.onToggle} />
                        </div>
                    
                        <div style={{cursor: 'pointer'}} onDoubleClick={this.handleOpen} >{this.props.title}</div>
                        

                            { this.state.display && <div style={{display: 'flex', height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                        <IconButton  tooltip="Edit To-Do Item" onClick={this.handleOpen} ><ModeEdit /></IconButton>
                                                        <IconButton tooltip="Remove To-Do Item" onClick={this.deleteItem} ><DeleteForever /></IconButton>
                                                    </div>
                            }
                        
                    </div>
                </div>  

                <Dialog title="Edit To-Do Item" actions={actions} onRequestClose={this.onRequestClose} open={this.state.openDialog}>
                    <TextField
                        id="edit_field"
                        floatingLabelText="Edit To-do task"
                        errorText={this.state.error_msg}
                        value={this.state.editValue}
                        onChange={this.handleChange}
                        hintText="To-do Task"
                        fullWidth={true}
                        autoFocus={true}
                        multiLine={true}
                    />
                </Dialog>   
            </div>
            );
        }
    }
