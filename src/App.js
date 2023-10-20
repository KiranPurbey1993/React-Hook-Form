import './App.css';
import React from 'react';
import Select from "react-select";
import {useForm, Controller } from 'react-hook-form';
const App =()=> {
let defaultValue ={
	email: "purbey.kiran@gmail.com",
	password: "1@asdRty",
	department:[],
	gender:"male",
	skills:{
		JavaScript:true,
		Angular:false,
		React:false,
		Node:false,
		Python:false
	}
}
	const {register, handleSubmit, formState:{errors}, reset , control} = useForm(defaultValue);
	const departments = [
		{ value: "Computer-Science", label: "Computer Science" },
		{ value: "Physics", label: "Physics" },
		{ value: "Chemistry", label: "Chemistry" },
		{ value: "Mathematics", label: "Mathematics" }
	];

	const onSubmit =(data)=>{
		console.log(data);
		reset({
				email: "",
				password: "",
				department:[],
				gender:"male",
				skills:{
					JavaScript:true,
					Angular:false,
					React:false,
					Node:false,
					Python:false
				}
		});
	}
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
				<div className="header-part">
					Login Form
				</div>
				<div className='body-part'>
				<div className="form-control"> 
          <label>Email</label>
					<input type="text"  name="email" 
					{...register("email",
					{required:"Email is required.",    
						pattern:{
							value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
							message:"Email is not valid."
						}
						 })} />
					{
						errors.email  && 
						(
							<p className='erroeMsg'>{errors.email.message}</p>
						)
					}
				
        </div>
				<div className="form-control"> 
          <label>Password</label>
					<input type="password"  name="password" 
					{...register("password",
					{required:"Password is required.",
					validate:{
						matchPattern:(value)=>{
							return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                value
            )
						},
						checkLength:(value)=>value.length >=6
						
					}
					})} />
					{errors.password?.type === "required" && (
							<p className="erroeMsg">Password is required.</p>
					)}
					{errors.password?.type === "checkLength" && (
							<p className="erroeMsg">
								Password should be at-least 6 characters.
							</p>
					)}
					{errors.password?.type === "matchPattern" && (
							<p className="erroeMsg two-line">
								Password should contain at least one uppercase letter, lowercase
					letter, digit, and special symbol.
							</p>
					)}

        </div>
				<div className='form-control'>
						<label>Select</label>
						<Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} isMulti options={departments} />
            )}
          />
          {errors.department && (
            <p className="erroeMsg">This is a required field.</p>
          )}
				</div>
				<div className='form-control'>
						<label>Select Gender</label>
						
						<input type='radio' id='male' label="Male" value="male" {...register("gender",{
							required:"Please select gender"
						})} />Male
						<input type='radio' id='female' label="Female" value="female" {...register("gender",{
							required:"Please select gender"
						})} />Female

						{
							errors.gender && (
								<p className='erroeMsg'>{errors.gender.message}</p>
							)
						}
				</div>
				<div className='form-control'>
						<label>Select Skills</label>
						
						<input type='checkbox' id='javaScript' label="JavaScript" value="JavaScript" {...register("skills",{
							required:"Please select skils"
						})} />JavaScript
						<input type='checkbox' id='angular' label="Angular" value="Angular" {...register("skills",{
							required:"Please select skills"
						})} />Angular
						<input type='checkbox' id='react' label="React" value="React" {...register("skills",{
							required:"Please select skills"
						})} />React
						<input type='checkbox' id='node' label="Node" value="Node" {...register("skills",{
							required:"Please select skills"
						})} />Node
						<input type='checkbox' id='python' label="Python" value="Python" {...register("skills",{
							required:"Please select skills"
						})} />Python
						{
							errors.skills && (
								<p className='erroeMsg'>{errors.skills.message}</p>
							)
						}
				</div>
				<div className="form-control"> 
					<button type="submit">Login </button>
        </div>
				</div>
        
      </form>
    </div>
  );
}

export default App;
