const Details = (props) => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="teacher-details">
              <div className="details">
                <div className="row">
                  {props.details.map((field, index) => (
                    <div className="col-md-6" key={index}>
                      <p>
                        <strong>{field.name}:</strong> {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Details;