import { Card, TextInput, Select, Text, Title, Checkbox, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useReturnsStore } from '../store/returnsStore';
import Header from './Header'
import Navbar from './Navbar';
import ReturnConfirmationPage from './ReturnConfirmationPage';
import "./ReturnPage.css";

export default function ReturnPage() {

  const [currentState, setCurrentState] = useState(0);
  const [returnItems, setReturnItems] = useState([]);
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();
  const [validateReturn, setValidateReturn] = useState(false);

  const nextState = () => {
    if (currentState < 4) {
      setCurrentState(currentState + 1)
    } else {
      setCurrentState(0)
    }
  }

  const { showReturnConfirmation, setShowReturnConfirmation } = useReturnsStore();


  return (
    !showReturnConfirmation ?
      <div className="return-page">
        <Header />
        <div>
          <Title style={{ color: "black", marginBottom: "2vh" }} order={2}>Schedule Return</Title>
          <div className="inputs">
            <div className="phone-name">
              <TextInput
                placeholder="Name"
                label="Name"
                className="name"
                defaultValue={"Cameron Smith"}
              />
              <TextInput
                placeholder="Phone Number"
                label="Phone Number"
                defaultValue={"(929) 504-6377"}
                hideControls
              />
            </div>
            <TextInput
              placeholder="Address"
              label="Address"
              defaultValue="2245 Sheridan Rd, Evanston, IL 60201"
            />
            <div className="date-time">
              <DatePicker className="date" label="Pickup Date" placeholder="Pick a Date" minDate={moment(new Date()).toDate()} value={returnDate} onChange={setReturnDate} />
              <Select
                label="Pickup Time Range"
                placeholder="Pick a Time Range"
                data={[
                  { value: 8, label: '8:00am-9:00am' },
                  { value: 9, label: '9:00am-10:00am' },
                  { value: 10, label: '10:00am-11:00am' },
                  { value: 11, label: '11:00am-12:00pm' },
                  { value: 12, label: '12:00pm-1:00pm' },
                  { value: 13, label: '1:00pm-2:00pm' },
                  { value: 14, label: '2:00pm-3:00pm' },
                  { value: 15, label: '3:00pm-4:00pm' },
                  { value: 16, label: '4:00pm-5:00pm' },
                  { value: 17, label: '5:00pm-6:00pm' },
                  { value: 18, label: '6:00pm-7:00pm' },
                  { value: 19, label: '7:00pm-8:00pm' },
                ]}
              />
            </div>
          </div>




        </div>
        <Card radius="md" style={{ marginBottom: 20 }}>
          <Checkbox.Group
            defaultValue={[]}
            label="Please Return the Following Items: "
            orientation='vertical'
            value={returnItems}
            onChange={setReturnItems}
          >
            {["5 Serving Platters", "20 Utensil Packs (Fork, Knife, Spoon)", "20 Plates"].map((x, key) =>
              <Checkbox key={key} value={`item${x}`} label={x} />
            )
            }
          </Checkbox.Group>
        </Card>

        <div style={{ textAlign: "center" }}>
          <Checkbox label="I acknowledge that missing items will result in a fee from my $50 deposit." onChange={() => setValidateReturn(validateReturn => !validateReturn)} style={{ marginBottom: "10px" }}>
          </Checkbox>
          <div>{
            validateReturn
              ? <Link to="/returns/return-confirmation"><Button onClick={() => setShowReturnConfirmation(true)}>Schedule Return</Button></Link>
              : <Button disabled>Schedule Return</Button>
          }
          </div>
        </div>
        <Text className="blurb" style={{ margin: 20, textAlign: "center", width: "90%", bottom: 0 }}>
          <em>Did you know that due to complications in the recycling process, only 9% of plastic actually ends up being recycled?</em>
        </Text>

        <Navbar />
      </div>
      :
      <ReturnConfirmationPage />
  )
}
