import React from 'react';

const PeopleItem = ({ image, title, content }) => {
  return (
    <section className="people">
      <img src={image} alt="" />
      <div className="content">
        <h5>{title}</h5>
        {content}
      </div>
    </section>
  );
};

export default PeopleItem;
