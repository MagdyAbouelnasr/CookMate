import Bookmark from "../../../components/icons/bookmark";

function Recipe() {
  return (
    <div className="p-4 rounded-lg text-center relative ">
      <img src={"/food_example1.jpg"} />
      <div className="bg-collection-1-shade-2 ">
        <h4>Food Name</h4>
        <div className="flex flex-col items-start">
          <span className="mb-2">Time</span>
          <div className="flex justify-between items-center space-x-48" >
            <span>15 min</span>
            <div className="ml-2">
              <Bookmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
