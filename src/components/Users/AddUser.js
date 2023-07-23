import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css"

const AddUser = props => {
	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredAge, setEnteredAge] = useState('');
	const [error, setError] = useState();


	const addUserHandler = (event) => {
		event.preventDefault();

		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({ title: "Invalid input", message: "Please enter a valid name and age (non-empty values)." })
			return;

		}

		if (+enteredAge < 0) {
			setError({ title: "Invalid age", message: "Please enter valid age (> 0)." })
			return;
		}

		props.onAddUser(enteredUsername, enteredAge)
		clearFormInputs()
	};

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value)
	}

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value)
	}

	const clearFormInputs = () => {
		setEnteredUsername('');
		setEnteredAge('');
	}

	const errorHandler = () => {
		setError(null);
	}

	return (
		<>
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
			<Card cssClass={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" value={enteredUsername} onChange={usernameChangeHandler} />
					<label htmlFor="age">Age (Years)</label>
					<input type="number" id="age" value={enteredAge} onChange={ageChangeHandler} />
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</>
	)
};

export default AddUser;