import { useParams } from "react-router-dom";
import useFetch from "../src/useFetch";
import Header from "../components/Header";

const Details = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-app-backend-final.vercel.app/events"
  );
  const { eventId } = useParams();

  const formatedData = (date) => {
    const formatedDate = new Date(date).toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    return formatedDate;
  };

  if (loading) return <p className="m-4">Loading...</p>;
  if (error) return <p className="m-4">Error: {error}</p>;
  if (!data) return <p className="m-4">No data available</p>;

  const eventData = data?.find((event) => event._id == eventId);
  return (
    <>
      <Header />
      <div className="py-4">
        <div className="container mt-4">
          <div className="position-relative mb-3">
            <h1 className="mb-1">{eventData.title}</h1>
          </div>
          <div className="row">
            <div className="col-md-8">
              <p>
                Hosted By:
                <br />
                <strong>{eventData.host}</strong>
              </p>
              <img
                src={eventData.eventPhotoUrl}
                alt="Event Photo"
                className="w-75 rounded mb-3 d-block mx-auto"
              />
              <div className="col-md-8">
                <h3>Details:</h3>
                <p className="text-start">{eventData.details}</p>
                <h3>Additional Information:</h3>
                <p>
                  <strong>Dress Code: </strong>
                  {eventData.dressCode}
                </p>
                <p>
                  <strong>Age Restrictions: </strong> {eventData.ageLimit} and
                  above
                </p>
                <h3>Event Tags: </h3>
                {eventData.eventTags.map((tag) => (
                  <div className="badge bg-danger me-2">
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card m-2">
                <div className="card-body">
                  <p>
                    <i className="fas fa-clock me-2"></i>
                    {formatedData(eventData.date)}
                  </p>
                  <p>
                    <i className="fas fa-location-dot me-2"></i>
                    {eventData.location}
                  </p>
                  <p>
                    <i className="fas fa-indian-rupee-sign me-2"></i>
                    {eventData.price}
                  </p>
                </div>
              </div>
              <h4>Speakers: ({eventData.speakerNames.length})</h4>
              <div className="container">
                <div className="row">
                  {eventData.speakerNames.map((speaker, index) => (
                    <div
                      key={index}
                      className="col-md-6 mb-3 d-flex justify-content-center"
                    >
                      <div
                        className="card text-center"
                        style={{ width: "12rem" }}
                      >
                        <img
                          src={eventData.speakerPhotoUrl[index]}
                          alt="Speaker Photo"
                          className="rounded-circle mx-auto mt-3"
                          style={{ width: "75px", height: "75px" }}
                        />
                        <div className="card-body">
                          <p className="card-text">
                            <strong>{speaker}</strong>
                          </p>
                          <p>{eventData.speakerDesignation[index]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger w-50 mt-3">RSVP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
