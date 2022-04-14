import { Form, Button, Input, DatePicker, Row, Select } from "antd";
import moment from "moment";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
  isLoading: boolean;
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const { user } = useTypedSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const [form] = Form.useForm();

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={submitForm} initialValues={{ date: moment() }}>
      <Form.Item
        data-testid="description"
        label="Description"
        name="description"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        data-testid="date"
        label="Date"
        name="date"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <DatePicker
          allowClear={false}
          disabledDate={(currentDate: Moment) =>
            currentDate.isBefore(moment(), "day")
          }
          defaultValue={moment()}
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>
      <Form.Item
        data-testid="guest"
        label="Guest"
        name="guest"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        rules={[rules.required()]}
      >
        <Select
          data-testid="select-guest"
          onChange={(guest) => setEvent({ ...event, guest })}
          loading={props.isLoading}
          disabled={props.isLoading}
        >
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
