import React from "react";
import { Loading } from "@nextui-org/react";

function LoadingComponent() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading
        type="gradient"
        // textColor="#f76928"
        style={{
          color: "#f76928",
        }}
        // css={{ color: "#f76928" }}
        loadingCss={{
          $$loadingSize: "6rem",
          $$loadingColor: "#f76928",
          $$loadingTextColor: "#f76928",
        }}
      >
        Loading
      </Loading>
    </div>
  );
}

export default LoadingComponent;
