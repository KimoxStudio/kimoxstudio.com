import React from 'react';

const SkillItem = ({ faIcon, image, title, content, position, href }) => {
  return (
    <section className={`feature ${position}`}>
      <a href={href || '/#'} className={`image icon ${faIcon}`}>
        <img src={image} alt="" />
      </a>
      <div className="content">
        <h3>{title}</h3>
        {content}
      </div>
    </section>
  );
};

export default SkillItem;
