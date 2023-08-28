import { useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { schoolRegister } from "../../Api/schoolRegistrationApi";
import { AuthContext } from "../../Auth/AuthContext";

const Signin = () => {
    const [formData, setFormdata] = useState({
        email: "",
        password: "",
    });
    const authContext = useContext(AuthContext);
    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await schoolRegister.getData(formData);
            
            if (response.success) { 
                setError(null);
                setSuccess(response);
                authContext.login(response.message.id);
            } else {
                setError(response);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        console.log(success);
        if (success) navigate("/dashboard", {state: {data: success.message.data}});
    }, [success, navigate])
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <h1 className="border-bottom p-2">Sign-In</h1>
                {errors && (
                    <div className="alert alert-danger" role="alert">
                        <p className="my-0">{errors.message}</p>
                    </div>
                )}
                {
                    success && (
                        <div className="alert alert-success" role="alert">
                            {Object.entries(success.message.data).map(([key, value]) => (
                                <p key={key}>{value}</p>
                            ))}
                        </div>
                    )
                }
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>Create new account</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        <Link to="/signup"><cite title="Source Title">Sign-up</cite></Link>
                    </figcaption>
                </figure>
            </form>
        </div>
    );
}

export { Signin };