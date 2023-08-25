import {useState, useEffect } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import { BiSolidUserPlus } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useAlert } from "react-alert";
import NavBar from "./NavBar";

const Login = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const alert = useAlert();
    const [breadName,setBreadName] = useState();

    const navigate = useNavigate();

    const handleData = (data) => {
          
         
            fetch("http://localhost:4000/news/api/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }).then((res) => {
                // console.log(res);
                if(res.status===200){
                    alert.success('Logged in successfully.');
                    navigate('/');
                }
                if(res.status===400){
                    alert.error('Invalid Login Details');
                }
                reset();
               

            }).catch((err) => {
                console.log(err);

            })
          
           
        
    }

    return (
        <div className="loginpage">
   <NavBar/>
        
            <div className="container my-5 login">
                {/* <nav aria-label="breadcrumb">
                    <ol className=" breadcrumb d-inline-flex p-4 py-3">
                        <li className="breadcrumb-item active">Home</li>
                        <li className="breadcrumb-item active">Login User</li>

                    
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
                                    <h1>Login  Person  </h1>
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
                                                <input type="email"
                                                    {...register("email", { required: "Email is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: "Invalid email address" } })}
                                                    placeholder="Email" className="form-control rounded-0 input-bg" />
                                                <p className='text-danger'>{errors.email && errors.email.message}</p>

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
                                            <div className="form-group">
                                                <button className="btn-lg w-100 p-3 rounded-0 border-0 savebtn bg-green h5 text-white" type="submit">Login</button>
                                            </div>
                                            <div className="text-center mt-4">Don't have account ? Register <Link to="/signup">here</Link></div>
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

export default Login;