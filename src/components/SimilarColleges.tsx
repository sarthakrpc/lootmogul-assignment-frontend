import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

const SimilarColleges = ({ id }: { id: string }) => {
  const [data, setData] = useState<CollegeType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    let abortSignal = false;
    const fetchCollege = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/college/similar/${id}`
      );
      if (!data.error && !abortSignal) {
        console.log(data.data);

        setLoading(false);
        setData(data.data);
      }
      if (data.error && !abortSignal) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCollege();

    return () => {
      abortSignal = true;
    };
  }, [id]);

  return (
    <div className="p-5 my-3 rounded border shadow m-auto w-96">
      <div className="flex flex-col justify-between">
        <div className="font-bold text-xl text-blue-600 mb-4">
          Similar Colleges
        </div>
        {loading && (
          <div className="flex justify-center items-center w-80 h-72">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600">Something went wrong!</div>
        )}
        {data && data.length === 1 && (
          <div className="text-center text-gray-600">
            No similar colleges found!
          </div>
        )}
        {data && (
          <div className="flex flex-col space-y-1">
            {data.map((college) => (
              <Fragment key={college._id}>
                {college._id !== id && (
                  <div className="flex flex-col">
                    <Link
                      to={`/college/${college._id}`}
                      state={{ name: college.name }}
                      className="font-semibold text-sm text-purple-600 underline"
                    >
                      {college.name}
                    </Link>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarColleges;
