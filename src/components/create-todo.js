import React from 'react';

export default class CreateTodo extends React.Component{
   constructor(props) {
       super(props);

       this.state = {
            error: null
       };
   }

   renderError(){
    if(!this.state.error){ return null;}

    return <div style={{    fontFamily: 'Helvetica, Arial, Sans-Serif',
                            fontSize: '18px',
                            color: '#B71C1C',
                            textShadow: '0px 0px 2px #000'}}>
        {this.state.error}</div>
   }

   
   
    render(){     
        return(
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" className="addTask" placeholder="Bir not ekleyiniz..." ref="createInput"/>
                <button><i className="material-icons">&#xE145;</i></button>
                {this.renderError()}
            </form>
        );
    }
    handleCreate(event){
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if(validateInput) {
            this.setState({error: validateInput});
            return;
        }

        this.setState({ error: null})
        this.props.createTask(this.refs.createInput.value);
        this.refs.createInput.value = "";
    }
    validateInput(task) {
        if(!task){
            return 'Bir not giriniz...';
        }
        else if(_.find(this.props.todos, todo => todo.task === task)){
            return 'Not zaten var.';
        } else {
            return null;
        }
    }
}