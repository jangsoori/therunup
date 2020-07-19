import React, { useRef } from "react";
import moment from "moment";
import "./RunningLogItem.scss";
import { deleteRun, editRun } from "../../../actions/runActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Calculate functions
const avgPaceTime = (avgPace) => moment.duration(avgPace, "minutes")._data;
const displayDuration = (duration) => {
  return moment.utc(duration * 1000).format("HH:mm:ss");
};
function RunningLogItem(props) {
  //Ref for accessing button in modal
  const deleteRef = useRef(null);

  //Get properties from single run
  const {
    name,
    avgPace,
    date,
    description,
    totalDistanceMeters,
    totalDurationSeconds,
    id,
  } = props.run;

  return (
    <tr>
      <td className="log-item-content-item">{date}</td>
      <td className="log-item-content-item">{name}</td>
      <td className="log-item-content-item">
        {description ? description : "No description"}
      </td>
      <td className="log-item-content-item">
        {(totalDistanceMeters / 1000).toFixed(2)} km
      </td>
      <td className="log-item-content-item">
        {displayDuration(totalDurationSeconds)}
      </td>
      <td className="log-item-content-item">
        {/* Time formating */}
        {avgPaceTime(avgPace).minutes}:
        {avgPaceTime(avgPace).seconds < 10
          ? `0${avgPaceTime(avgPace).seconds}`
          : avgPaceTime(avgPace).seconds}
        min/km
      </td>
      <td className="log-item-content-item">
        <table>
          <tbody>
            <tr>
              <td>
                <Link
                  to={{ pathname: `/dashboard/delete/${id}` }}
                  ref={deleteRef}
                  className="ui button big red"
                >
                  Delete
                </Link>
              </td>
              <td>
                <Link
                  to={`/dashboard/edit/${id}`}
                  className="ui button big primary"
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default connect(null, { deleteRun, editRun })(RunningLogItem);
