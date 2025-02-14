import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivity, setTrip } from "../store/tripSlice";

const useTripStore = () => {
  const dispatch = useDispatch();
  const tripState = useSelector((state) => state.trip);

  const updateTrip = useCallback(
    (trip) => {
      dispatch(setTrip(trip));
    },
    [dispatch]
  );

  const updateActivity = useCallback(
    (activity) => {
      dispatch(setActivity(activity));
    },
    [dispatch]
  );

  return {
    ...tripState,
    updateTrip,
    updateActivity,
  };
};

export default useTripStore;
