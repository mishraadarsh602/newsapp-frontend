import {useState, useEffect } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import { BiSolidUserPlus } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useAlert } from "react-alert";
import NavBar from "./NavBar";

const Signup = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const alert = useAlert();
    const [breadName,setBreadName] = useState();
    const navigate = useNavigate();

    const handleData = (data) => {
          
           if(data.password!==data.confirmpassword){
               alert.error("Password and confirm password must be same");
               return;
           }else{
            fetch("http://localhost:4000/news/api/signup", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }).then((res) => {
                // console.log(res);
                if(res.status===200){
                    alert.success('User Registered successfully.');
                }
                if(res.status===400){
                    alert.error('User Already Registered with this email');
                }
                reset();
                // navigate('/');

            }).catch((err) => {
                console.log(err);
                alert.error('User Already Registered with this email');


            })
          
           }
        
    }

    return (
        <div className="signuppage">

           <NavBar/>
            <div className="container my-5 signup">
                {/* <nav aria-label="breadcrumb">
                    <ol className=" breadcrumb d-inline-flex p-4 py-3">
                        <li className="breadcrumb-item active">Home</li>
                        <li className="breadcrumb-item active">Signup User</li>

                    
                    </ol>
                </nav> */}
                <div className="box">
                    <div className="row ">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center align-items-center flex-column h-100">
                                <div className="d-flex justify-content-center align-items-center">
                                    <BiSolidUserPlus className="usericon" />
                                </div>
                                <div className="d-flex justify-content-center align-items-center flex-column text-light">
                                    <h1>Singup  Person  </h1>
                                    <p className="px-3 text-center">Enter your personal details and start journey with us</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-white h-100 p-2 py-5 sm:p-5">
                                <form className="container" noValidate onSubmit={handleSubmit(handleData)}>
                                    <div className="row ">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input type="text"
                                                    {...register("name", { required: "Name  is required" })}
                                                    placeholder="Name"
                                                    className="form-control rounded-0 input-bg" />
                                                <p className='text-danger'>{errors.name && errors.name.message}</p>

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input type="email"
                                                    {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: "Invalid email address" } })}
                                                    placeholder="Email" className="form-control rounded-0 input-bg" />
                                                <p className='text-danger'>{errors.email && errors.email.message}</p>

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input type="text"
                                                    {...register("phone",
                                                        {
                                                            required: "Phone  is required",
                                                            pattern: {
                                                                value: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/gi, message: "Invalid phone number"

                                                            }
                                                        }
                                                    )}
                                                    placeholder="Phone" className="form-control rounded-0 input-bg" />
                                                <p className='text-danger'>{errors.phone && errors.phone.message}</p>

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input type="password"
                                                    {...register("password", { required: "Password  is required" })}
                                                    placeholder="Enter Password"
                                                    className="form-control rounded-0 input-bg" />
                                             <p className='text-danger'>{errors.password && errors.password.message}</p>

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input type="password"
                                                    {...register("confirmpassword", { required: "Confirm Password  is required" })}
                                                    placeholder="Enter Confirm Password"
                                                    className="form-control rounded-0 input-bg" />
                                                <p className='text-danger'>{errors.confirmpassword && errors.confirmpassword.message}</p>
                                            </div>
                                        </div>
                                       

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <button className="btn-lg w-100 p-3 rounded-0 border-0 savebtn bg-green h5 text-white" type="submit">Register Now</button>
                                            </div>
                                            <div className="text-center">Already have an account ? Login <Link to="/login">here</Link></div>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;