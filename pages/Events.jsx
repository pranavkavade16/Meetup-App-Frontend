import { useState } from "react";
import useFetch from "../src/useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Events = ({ searchData }) => {
  const [eventType, setEventType] = useState("Both");
  const { data, loading, error } = useFetch(
    "https://meetup-app-backend-final.vercel.app/"
  );
  console.log(data);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const getFilteredData = () => {
    let filtered = data;
    if (eventType != "Both") {
      filtered = data.filter((event) => event.eventType === eventType);
    }

    if (searchData && searchData.length > 0) {
      filtered = data.filter(
        (event) =>
          event.title.toLowerCase().includes(searchData.toLowerCase()) ||
          event.eventType.toLowerCase().includes(searchData.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredData = getFilteredData();
  return (
    <>
      <div>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 py-4">Meetup Events</h1>
            <form action="">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(event) => setEventType(event.target.value)}
              >
                <option value="Both" selected>
                  Both Events
                </option>
                <option value="Offline Event">Offline Event</option>
                <option value="Online Event">Online Event</option>
              </select>
            </form>
          </div>
          <div className="row">
            <div className="col-12">
              <div>
                {filteredData?.map((event) => (
                  <Link
                    to={`/details/${event._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card mb-4">
                      <img
                        src={event.eventPhotoUrl}
                        class="card-img-top"
                        style={{ height: "400px", objectFit: "cover" }}
                        alt="Event Photo"
                      />
                      <div className="card-img-overlay">
                        <span className="position-absolute top-0 start-0 m-3 bg-white rounded px-2 py-1">
                          <small style={{ fontWeight: 700 }}>
                            {event.eventType}
                          </small>
                        </span>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">{event.details}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {formatedData(event.date)}
                          </small>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
