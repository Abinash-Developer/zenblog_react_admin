import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner-wraper">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
            Copyright © bootstrapdash.com 2020
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            {" "}
            Free{" "}
            <Link href="https://www.bootstrapdash.com/" target="_blank">
              Bootstrap dashboard templates
            </Link>{" "}
            from Bootstrapdash.com
          </span>
        </div>
      </div>
    </footer>
  );
}
