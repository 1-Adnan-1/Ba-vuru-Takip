import { useSelector } from "react-redux";
import Card from "../../components/card";
import "./home.scss";
import Loader from "../../components/loader/index";
import Error from "../../components/error/index";

const Home = () => {
  const { jobs, isLoading, error } = useSelector((store) => store.jobReducer);

  const grouped = jobs.reduce((grouped, job) => {
    if (!grouped[job.status]) {
      grouped[job.status] = [];
    }

    grouped[job.status].push(job);

    return grouped;
  }, {});

  return (
    <div className="home-page">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="layout">
          {Object.keys(grouped).map((status) => (
            <div key={status} className="group">
              <h1 className="title">
                {status} ({grouped[status].length})
              </h1>

              <div className="list">
                {grouped[status].map((job) => (
                  <Card key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
