const WorkAndEducation = (props) => { 
    console.log(props)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="education">
              <ul>
                {props.contents.map((data) => (
                  <li className="mb-4" key={data.id}>
                    <div className="education-item">
                      <h4>{data.title}</h4>
                      <p>
                        {data.name} Year: {data.startYear} - {data.endYear}
                      </p>
                      {props.setdesc && (
                        <p>
                          {data.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WorkAndEducation;