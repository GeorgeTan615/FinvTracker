import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { Modal, Button, Text } from "@nextui-org/react";
import { Input, Spacer, Dropdown } from '@nextui-org/react';
import { baseUrl } from '../configs/constants';
import { useState, useReducer } from 'react';

interface TransactionFormState {
	description:string,
	amount:number,
	isSuccess:boolean,
	isSubmitting:boolean,
	isError:boolean,
}
interface UpdateFieldAction {
	type: "UPDATE_FIELD";
	field: string;
	value: string | number;
 }
interface AddAction {
	type: "ADD_TRANSACTION";
 }
interface AddSuccessAction {
	type: "ADD_SUCCESS";
 }
interface AddErrorAction {
	type: "ADD_ERROR";
 }
 
 export type AddTransactionAction =
	| UpdateFieldAction
	| AddAction
	| AddSuccessAction
	| AddErrorAction;

const AddTransactionButton = () => {
	// Modal logic
	const [visible, setVisible] = useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
	}

	// Reducer logic, may be useful for better user experience later
	const reducer = (state:TransactionFormState,action:AddTransactionAction) => {
		switch (action.type){
			case "UPDATE_FIELD":
				return {
					...state,
					[action.field]:action.value,
				};
			case "ADD_TRANSACTION":
				return{
					...state,
					isSubmitting:true,
					isSuccess:false,
					isError:false,
				};
			case "ADD_SUCCESS":
				return {
					...state,
					isSubmitting:false,
					isSuccess:true,
				};
			case "ADD_ERROR":
				return {
					...state,
					isSubmitting:false,
					isError:true,
				};
			default:
				return state;
		}
	}

	const initialState = {
		description:"",
		amount:0,
		isSuccess:false,
		isSubmitting:false,
		isError:false,
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	const addTransaction = async(description:string,amount:number) =>{
		const response = await fetch(`${baseUrl}/api/transactions`,{
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({description,amount})

		});
		const data = await response.json();
		return data;
	}

	const handleSubmit = async (e:any) =>{
		e.preventDefault();
		dispatch({type:"ADD_TRANSACTION"})

		await addTransaction(state.description,state.amount)
			.then((data)=>{
				console.log(data)
				// POST

				dispatch({type:"ADD_SUCCESS"});
			})
			.catch(()=>dispatch({type:"ADD_ERROR"}))
	}


  return (
	 <>
		<button onClick={handler} className="flex justify-center items-center gap-1 border-none bg-[#eee5ff] rounded-lg px-3 transition ease-in-out delay-100 duration-300 hover:bg-[#E4d5fd] cursor-pointer">
			<IconContext.Provider value={{ color: "#7F3DFF", className: "global-class-name" }}>
				<FaPlusCircle/>
			</IconContext.Provider>
			<p className="text-[#7F3DFF] font-semibold">Add Transaction</p>
		</button>

		<Modal
				scroll
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
				width='35%'
			>
				<Modal.Header justify="flex-start">
					<Text b id="modal-title" size={30} className="font-bold flex gap-2 justify-start items-center">
						Add Transaction
					</Text>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						{state.description}
						{state.amount}
						<Spacer y={0.1}/>
						<Input clearable bordered labelPlaceholder="Description" type="text" onChange={(e)=>dispatch({type:"UPDATE_FIELD",field:"description",value:e.target.value})}/>
						<Spacer y={0.05}/>
						<Input required clearable bordered labelPlaceholder="Amount" type="number" onChange={(e)=>dispatch({type:"UPDATE_FIELD",field:"amount",value:parseFloat(parseFloat(e.target.value).toFixed(2))})}/>
					</Modal.Body>
					<Modal.Footer justify="flex-end">
						<Button
							auto
							flat
							css={{ background: "$brandPurple", color: "white" }}
							type="submit"
							onSubmit={handleSubmit}
						>
							Add Transaction
						</Button>
					</Modal.Footer>
				</form>
			</Modal>




	 </>
  )
}

export default AddTransactionButton