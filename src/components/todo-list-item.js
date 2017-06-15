import React from 'react';

export default class TodoListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: false
        }
    }
    renderTaskSection(){
        const { task, isCompleted } = this.props;
        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        }
        if (this.state.isEditing){
            return(
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="focus" type="text" defaultValue={task} ref="editInput"/>
                        
                    </form>
                </td>
            )
        }
        return(
            <td style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>
                {task}
            </td>
        );
    }
    renderActionSection(){
        if(this.state.isEditing){
            return(
                <td>
                    <button className="save" onClick={this.onSaveClick.bind(this)}>Kaydet</button>
                    <button className="cancel" onClick={this.onCancelClick.bind(this)}>İptal</button>
                </td>
            );
        }
        return(
                <td>
                    <button className="edit" onClick={this.onEditClick.bind(this)}>Düzenle</button>
                    <button className="delete" onClick={this.props.deleteTask.bind(this, this.props.task)}>Sil</button>
                </td>
        );
    }
    
    render(){
        return(
             <tr>
                {this.renderTaskSection()}
                {this.renderActionSection()}
             </tr>
        );
    }
    onEditClick (){
        this.setState({ isEditing: true});
    }
    onCancelClick (){
        this.setState({ isEditing: false});
    }
    onSaveClick (event){
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({isEditing: false});
    }

}