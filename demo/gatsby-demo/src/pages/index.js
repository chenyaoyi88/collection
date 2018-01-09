import React from "react";
import Link from "gatsby-link";

const IndexPage = () => (
  <div>
    <div style={{ color: `tomato` }}>
      <h1>Hello Gatsby!</h1>
      <p>What a world.</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
    <div>
      <Link to="/page-2/">去第二个页面</Link>
    </div>
    <div>
      <Link to="/counter/">Counter</Link>
    </div>
  </div>
);

export default IndexPage;
