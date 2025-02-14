import { useEffect } from "react";
import { DB_TRIPS_ENDPOINT } from "../constants/constants";
import useAuthStore from "../hooks/useAuthStore";
import { generateID } from "../utils/utils";
import useApi from "./useApi";
import useTripStore from "./useTripStore";

const useDB = () => {
  const { userID: id } = useAuthStore();
  const { trip: globalTrip, activity: globalActivity } = useTripStore();

  const { callApi: fetchTrips } = useApi(`${DB_TRIPS_ENDPOINT}/${id}`, "GET");
  const { callApi: updateTrip } = useApi(`${DB_TRIPS_ENDPOINT}/${id}`, "PATCH");

  const addTrip = async (newTrip) => {
    const trips = await getTrips();

    const upatedTrips = [...trips, { id: generateID(trips), activities: [], ...newTrip }];

    const response = await updateTrip({ trips: upatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const addActivity = async (newActivity) => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (!trip) {
      return null;
    }

    console.log(trip);

    const upatedActivities = [
      ...trip.activities,
      { id: generateID(trip.activities), ...newActivity },
    ];

    const updatedTrip = { ...trip, activities: upatedActivities };

    const upatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        return updatedTrip;
      }
      return t;
    });

    const response = await updateTrip({ trips: upatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const getTrip = async (tripID) => {
    const tripsData = await fetchTrips();

    if (tripsData) {
      const trips = tripsData.data.trips;

      const trip = trips.find((tripItem) => tripItem.id === tripID);

      if (!trip) {
        return null;
      }

      return trip;
    }
    return null;
  };

  const getActivity = async (tripID, activityID) => {
    const tripsData = await fetchTrips();

    if (tripsData) {
      const trips = tripsData.data.trips;

      const trip = trips.find((tripItem) => tripItem.id === tripID);

      if (!trip) {
        return null;
      }

      const activity = trip.activities.find((act) => act.id === activityID);

      if (!activity) {
        return null;
      }

      return activity;
    }
    return null;
  };

  const getTrips = async () => {
    const response = await fetchTrips();

    if (response) {
      return response.data.trips;
    }
    return null;
  };

  const getActivities = async () => {
    const response = await fetchTrips();
    if (response) {
      const trips = response.data.trips;
      const trip = trips.find((tripItem) => tripItem.id === globalTrip.id);

      if (!trip) {
        return null;
      }

      return trip.activities;
    }
    return null;
  };

  const editTrip = async (editedTrip) => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (!trip) {
      return null;
    }

    if (editedTrip["id"] || editedTrip["user"] || editedTrip["activities"]) {
      return null;
    }

    const updatedTrip = { ...trip, ...editedTrip };

    const upatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        return updatedTrip;
      }
      return t;
    });

    const response = await updateTrip({ trips: upatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const editActivity = async (editedActivity) => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (editedActivity["id"]) {
      return null;
    }

    if (!trip) {
      return null;
    }

    const upatedActivities = trip.activities.map((act) => {
      if (act.id === globalActivity.id) {
        return { ...act, ...editedActivity };
      }
      return act;
    });

    const updatedTrip = { ...trip, activities: upatedActivities };

    const upatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        return updatedTrip;
      }
      return t;
    });

    const response = await updateTrip({ trips: upatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const deleteTrip = async () => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (!trip) {
      return null;
    }

    const filteredTrips = trips.filter((t) => t.id !== trip.id);

    const response = await updateTrip({ trips: filteredTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const deleteActivity = async () => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (!trip) {
      return null;
    }

    const filteredActivities = trip.activities.filter((act) => act.id !== globalActivity.id);

    const updatedTrip = { ...trip, activities: filteredActivities };

    const updatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        return updatedTrip;
      }
      return t;
    });

    const response = await updateTrip({ trips: updatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  const deleteAllTrips = async () => {
    const response = await updateTrip({ trips: [] });

    if (response) {
      return true;
    }

    return null;
  };

  const deleteAllActivities = async () => {
    const trip = await getTrip(globalTrip.id);
    const trips = await getTrips();

    if (!trip) {
      return null;
    }

    const updatedTrip = { ...trip, activities: [] };

    const updatedTrips = trips.map((t) => {
      if (t.id === trip.id) {
        return updatedTrip;
      }
      return t;
    });

    const response = await updateTrip({ trips: updatedTrips });

    if (response) {
      return true;
    }

    return null;
  };

  return {
    addTrip,
    addActivity,
    getTrip,
    getActivity,
    getTrips,
    getActivities,
    editTrip,
    editActivity,
    deleteTrip,
    deleteActivity,
    deleteAllTrips,
    deleteAllActivities,
  };
};

export default useDB;
