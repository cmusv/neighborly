import "../../styles/ActiveSelector.css";
const ActiveSelector = ({ active, setActive }) => {
  return (
    <div className="tab-selector">
      <div className="tab-background">
        <button
          className={`tab ${active === "unfinished" ? "active" : ""}`}
          onClick={() => setActive("unfinished")}
        >
          Unfinished
        </button>
        <button
          className={`tab ${active === "finished" ? "active" : ""}`}
          onClick={() => setActive("finished")}
        >
          Finished
        </button>
      </div>
    </div>
  );
}

export default ActiveSelector;