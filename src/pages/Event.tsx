import { Layout, Row, Button, Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import styles from "./Event.module.css";

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { events } = useTypedSelector((state) => state.event);
  const { guests, isLoading } = useTypedSelector((state) => state.guest);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    createEvent(event);
  };

  return (
    <Layout data-testid="event-page" className={styles.eventLayout}>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button size="large" onClick={() => setModalVisible(true)}>
          Add Event
        </Button>
      </Row>
      <Modal
        data-testid="modal"
        title="Add Event"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm isLoading={isLoading} guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
