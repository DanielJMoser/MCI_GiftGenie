import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftAssignment } from "../models/GiftAssignment";
import { GIFTASSIGNMENTS } from "../data/GiftAssignmentData";

const assignmentStorageKey = "assignments";

export const AssignmentContext = createContext({
  assignments: [],
  addAssignment: (assignment) => {},
  updateAssignment: (assignment) => {},
  removeAssignment: (assignment) => {},
});

function AssignmentContextProvider({ children }) {
  const [assignments, setAssignments] = useState([]);

  function addAssignment(assignment) {
    setAssignments((currentAssignments) => [...currentAssignments, assignment]);
  }
  function updateAssignment(assignment) {
    setAssignments((currentAssignments) => {
      const newArray = [...currentAssignments];
      const updateIndex = newArray.findIndex(
        (element) => element._key === assignment._key
      );
      newArray[updateIndex].setAttributes(
        assignment._gift,
        assignment._person,
        assignment._event
      );
      return newArray;
    });
  }
  function removeAssignment(assignment) {
    setAssignments((currentAssignments) =>
      currentAssignments.filter(
        (currentAssignment) => currentAssignment._key !== assignment._key
      )
    );
  }

  useEffect(() => {
    if (assignments.length > 0) {
      AsyncStorage.setItem(
        assignmentStorageKey,
        JSON.stringify(assignments)
      ).then(() => {});
    } else {
      setAssignments(GIFTASSIGNMENTS); // TODO: restore test data during testing only
      console.log("setting dummy assignments");
    }
  }, [assignments]);

  useEffect(() => {
    AsyncStorage.getItem(assignmentStorageKey).then((value) => {
      if (value) {
        const valueParsed = JSON.parse(value);
        const savedAssignments = valueParsed.map((element) => {
          return GiftAssignment.fromObj(element);
        });
        setAssignments(savedAssignments);
      }
    });
  }, []);

  const value = {
    assignments: assignments,
    addAssignment: addAssignment,
    updateAssignment: updateAssignment,
    removeAssignment: removeAssignment,
  };

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
}

export default AssignmentContextProvider;
