/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card"; // Fixed import path (changed 'card' to 'Card')

export default function Weather(props) {
  const propsArr = Object.entries(props.src);
  
  if (!propsArr || propsArr.length === 0) { // Adjusted conditional check
    return <p>undefined</p>;
  } else {
    return (
      <div>
        {propsArr.map(([key, value]) => ( // Using map to iterate through the array
          <Card key={key}>
            <p>Date: {value.date}</p> {/* Accessing 'date' property from 'value' */}
            <p>Description: {value.description}</p> {/* Accessing 'description' property from 'value' */}
          </Card>
        ))}
      </div>
    );
  }
}
