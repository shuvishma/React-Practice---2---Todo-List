import React, {useState} from "react";
import "./../styles/App.css";

function ListItem(props) {
	const { children, onModify, i, onDelete } = props ;
	const [isEditMode, setIsEditMode] = useState(false) ;
	const [tempTask, setTempTask] = useState(children) ;

	return isEditMode ? (
		<li>
			<textarea 
				value={tempTask}
				onChange={function (event) {
					setTempTask(event.target.value) ;
				}}></textarea>
			<button
				onClick={function () {
					if(tempTask != '') {
						onModify(tempTask, i) ;
					}
				}}
			>Save</button>
		</li>
	) : (
		<>
			<li>{children}</li>
			<button
				onClick = {function () {
					setIsEditMode(true) ;
				}}
			>Edit</button>
			<button onClick={onDelete}>Remove</button>
		</>	
	) ;
}

function App() 
{
	const [task, setTask] = useState('') ;
	const [todoList, setTodoList] = useState([]) ;

	function onModify(updatedTask, index){
		const newList = todoList.map(function (task, i) {
			if(i == index) {
				return updatedTask ;
			}
			return task ;
		}) ;
		setTodoList(newList) ;
	}

	function onDelete(index) {
		const newList = todoList.filter(function (task, i) {
			return i !== index ;
		}) ;
		setTodoList(newList) ;
	}

	return (
	<div id="main">
		<textarea 
			id="task" 
			value={task} 
			onChange={function(event) {
				setTask(event.target.value) ;
			}}>
		</textarea>

		<button 
			id="btn"
			onClick={function(){
				if(task != '') {
					setTodoList([...todoList, task]) ;
					setTask('') ;
				}
			}}>Add task</button>

		<ul>
			{
				todoList.map((task, i) => {
					return <ListItem 
						i={i}
						onModify={onModify} 
						onDelete={function () {
							onDelete(i) ;
						}}
						key={task}
					>{task}</ListItem>;
				})
			}
		</ul>
	</div>
	);
}


export default App;
