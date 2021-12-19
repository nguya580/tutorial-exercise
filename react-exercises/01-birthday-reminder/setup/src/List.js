import React from "react";

const List = ({ props }) => {
  return (
    <>
      {/* map() loops thru the array and assign each object to person */}
      {props.map((person) => {
        // assign new vars with the person object of data list
        const { id, name, age, image } = person;

        return (
          <article key={id} className="person">
            <img src={image} alt={name} />

            <div>
              <h3>{name}</h3>
              <p>{age} year old</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
