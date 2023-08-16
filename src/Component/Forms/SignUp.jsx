import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import data from "../../Json/State.json"
import { schoolRegister } from "../../Api/schoolRegistrationApi";

const Signup = ({ setuserId }) => {
    const [formData, setFormdata] = useState({
        name: "",
        location: {
            address: "",
            city: "",
            state: "",
            zip: "",
        },
        email: "",
        website: "www.example.com",
        foundedYear: 0,
        principalName: "example",
        totalStudents: 0,
        isPrivate: false,
        accreditation: false,
        phoneNumber: 0,
        password: "",
    });
    const [errors, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            location: {
                ...prevData.location,
                [name]: value,
            },
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === "checkbox" ? checked : value;

        setFormdata((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await schoolRegister.postData(formData);
            console.log(response);
            if (response[0].success) { 
                setSuccess(response)
            } else {
                setError(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
                <h1 className="border-bottom p-2">Sign-up</h1>
                {errors && (
                    <div className="alert alert-danger" role="alert">
                        {errors.length === 1 ? (
                            <p className="my-0">{`${errors[0].message}`}</p>
                        ) : (
                            errors.map((error, key) => (
                                <p className="my-0" key={key}>{`${error.field} => ${error.message}`}</p>
                            ))
                        )}
                    </div>
                )}
                {
                    success && <div className="alert alert-success" role="alert">
                        {<p className="my-0">{`${success[0].message}`}</p>}
                    </div>
                }
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <label htmlFor="schoolName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="schoolName" placeholder="example" name="name" value={formData.name} onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="address" value={formData.location.address} onChange={handleLocationChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" name="city" value={formData.location.city} onChange={handleLocationChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <select id="inputState" className="form-select" name="state" value={formData.location.state} onChange={handleLocationChange}>
                        <option>select from this</option>
                        {data.map((state, key) => (
                            <option key={state.value}>{state.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" name="zip" value={formData.location.zip} onChange={handleLocationChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="foundYear" className="form-label">Founded Year</label>
                    <input type="number" className="form-control" id="foundYear" name="foundedYear" value={formData.foundedYear} onChange={handleChange}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputPhone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="inputPhone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
                <div className="col-md-4 align-self-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="accreditation" value={formData.accreditation} onChange={handleChange} id="accreditation" />
                        <label className="form-check-label" htmlFor="accreditation">
                            Accreditation
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="isPrivate" value={formData.isPrivate} onChange={handleChange} id="private" />
                        <label className="form-check-label" htmlFor="private">
                            Private
                        </label>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>Already have an account.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        <Link to="/signin"><cite title="Source Title">Sign-in</cite></Link>
                    </figcaption>
                </figure>
            </form>
        </div>
    );
}

export { Signup };