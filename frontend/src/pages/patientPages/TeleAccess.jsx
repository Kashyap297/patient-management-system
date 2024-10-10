import React, { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const TeleAccess = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Access", path: "/patient/tele-access" },
    ]);
  }, [updateBreadcrumb]);
  return (
    <div>
      <h1>Under Construction</h1>
    </div>
  );
};

export default TeleAccess;
