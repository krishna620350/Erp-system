import { useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../../Api/users/UsersData";
import { AuthContext } from "../../Auth/AuthContext";

const Signin = () => {
    const [formData, setFormdata] = useState({
        email: "",
        password: "",
        type: "",
    });
    const authContext = useContext(AuthContext);
    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); 
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
        setLoading(true);
        try {
            const response = await user.getData(formData);
            if (response.success) { 
                response.message.data.type = formData.type;
                setError(null);
                setSuccess(response);
                authContext.login(response.message);
            } else {
                setError(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (success) navigate("/dashboard");
    }, [success, navigate]);

    const LoadingSpinner = () => {
      return (
        <div
          className="spinner-border"
          style={{width: "8rem", height: "8rem"}}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            {loading ? (<LoadingSpinner />):(<form className="row g-3 w-50" onSubmit={handleSubmit}>
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
                <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="type" id="inlineRadio1" value="school" checked={formData.type === "school"} onChange={handleChange}/>
                        <label class="form-check-label" for="inlineRadio1">School</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="type" id="inlineRadio2" value="teacher" checked={formData.type === "teacher"} onChange={handleChange} />
                        <label class="form-check-label" for="inlineRadio2">Teacher</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="type" id="inlineRadio3" value="student" checked={formData.type === "student"} onChange={handleChange} />
                        <label class="form-check-label" for="inlineRadio3">Student</label>
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign-in</button>
                </div>
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>Create new account</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        <Link to="/signup"><cite title="Source Title">Sign-up</cite></Link>
                    </figcaption>
                </figure>
            </form>)}
        </div>
    );
}

export default Signin;