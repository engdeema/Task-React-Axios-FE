import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data); //the old array setData is an empty array so no need to spread ...
    } catch (error) {
      window.alert(error);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {}

    // to do : call BE to create a room
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempRoom = rooms.filter((room) => room.id !== id);
      setRooms(tempRoom);
    } catch (error) {
      window.alert(error);

      // to do : call BE to delete a room
    }
  };
  const updateRoom = async (updated) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updated.id}`,
        updated
      );

      let tempupdate = rooms.map((room) =>
        room.id === updated.id ? response.data : room
      );

      setRooms(tempupdate);
    } catch (error) {
      window.alert(error);

      // to do : call BE to delete a room
    }
  };
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
            {/* //createMsg={createMsg} */}
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
