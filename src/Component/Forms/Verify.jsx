import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { schoolRegister } from "../../Api/schoolApi";
import { AuthContext } from "../../Auth/AuthContext";


export const Verify = () => {
    
    const location = useLocation();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const {email} = location.state;
    const [formData, setFormdata] = useState({
        email: email,
        code: ""
    });
    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const responses = await schoolRegister.verifyData(formData);
        if (responses.success.success) {
            setError(null);
            setSuccess(responses)
        } else {
            setError(responses);
        }
    }

    useEffect(() => {
        if (success && success.success && success.success.success) {
            authContext.login(success.success.id);
            navigate("/dashboard");
        }
    }, [authContext, success, navigate]);
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <h1 className="border-bottom p-2">Verify Your Account</h1>
                {errors && (
                    <div className="alert alert-danger" role="alert">
                            {
                                <p className="my-0">{`${errors.message}`}</p>
                            }
                    </div>
                )}
                {
                    success && <div className="alert alert-success" role="alert">
                        {<p className="my-0">{`${success.message}`}</p>}
                    </div>
                }
                <div className="col-md-12">
                    <p className="mb-2">A verification code has been sent to:</p>
                    <p className="fw-bold">{email}</p>
                    <label htmlFor="verificationCode" className="form-label mt-3">
                        Enter Verification Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="verificationCode"
                        name="code"
                        placeholder="Enter the 6-digit verification code"
                        value={formData.code}
                        onChange={handleChange}
                        maxLength={6}
                    />
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">verify</button>
                </div>
            </form>
        </div>
    );
} 