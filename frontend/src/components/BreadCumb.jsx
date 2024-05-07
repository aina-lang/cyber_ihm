import React from "react";
import { Link } from "react-router-dom";

function BreadCumb({ title, subtitle, root, rootLink }) {
  return (
    <nav
      aria-label="breadcrumb"
      className="w-full p-5 pl-0 border-b border-gray-300 flex justify-between mb-5"
    >
      <h2 className="font-semibold text-2xl text-[#2c2c2c]  dark:text-[#f8f8f8]">
        {" "}
        {subtitle && <p>{subtitle}</p>}
      </h2>
      <ol className="flex space-x-4 text-[18px]">
        <li className="text-gray-600">
          <Link to={rootLink}>{root}</Link>
        </li>{" "}
        <p className="dark:text-[#f8f8f8]">/</p>
        <li className="text-[#2c2c2c]" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}

export default BreadCumb;
