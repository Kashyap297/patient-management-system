import { useLocation } from "react-router-dom";
import PatientTable from "./PatientTableScreen";
import DoctorTable from "./DoctorScreen";
import AllTable from "./AllSearchScreen";

const SearchResults = () => {
  const location = useLocation();

  // Parse the URL search params
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || "All";
  const searchTerm = searchParams.get("query") || "";

  const renderSearchTable = () => {
    switch (searchType) {
      case "Doctor":
        return <DoctorTable searchTerm={searchTerm} />;
      case "Patient":
        return <PatientTable searchTerm={searchTerm} />;
      case "All":
        return <AllTable searchTerm={searchTerm} />;
      default:
        return <AllTable searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for &quot;{searchTerm}&quot;
      </h2>
      {renderSearchTable()}
    </div>
  );
};

export default SearchResults;
