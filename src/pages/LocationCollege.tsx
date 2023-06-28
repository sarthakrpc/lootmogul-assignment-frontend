import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const LocationCollege = () => {
  const { state } = useParams();
  const [data, setData] = useState<CollegeType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let abortSignal = false;
    const fetchColleges = async () => {
      const { data } = await axios.get("http://localhost:8080/college/filter", {
        params: { state },
      });
      if (!data.error && !abortSignal) {
        setLoading(false);
        setData(data.data);
      }
      if (data.error && !abortSignal) {
        setLoading(false);
        setError(true);
      }
    };
    fetchColleges();

    return () => {
      abortSignal = true;
    };
  }, [state]);

  return (
    <div className="py-4 px-2 space-y-4">
      <div className="font-bold text-3xl text-center mb-5 text-gray-600">
        {state}
      </div>
      {!loading && !error && (
        <div className="flex flex-row justify-center space-x-1">
          <div className="text-purple-600 font-semibold">
            Number of Colleges
          </div>
          <div className="text-gray-600 font-semibold">-</div>
          <div className="text-green-600">{data.length}</div>
        </div>
      )}

      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px] overflow-y-scroll">
          <table className="w-full text-sm text-left text-blue-100">
            <thead className="text-xs text-gray-800 uppercase bg-blue-100 border-b sticky top-0 z-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-center w-[100px]"
                >
                  College Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-center w-[100px]"
                >
                  State
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-center w-[100px]"
                >
                  Rating
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-center w-[100px]"
                >
                  Courses
                </th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr className="text-center bg-blue-50 border-b text-blue-600">
                  <td
                    colSpan={4}
                    rowSpan={100}
                    className="w-[100px] px-6 py-4 whitespace-nowrap font-semibold"
                  >
                    <div className=" text-red-500 p-4 px-2 my-2 h-80">
                      <h1 className="text-5xl p-20">Error!!!</h1>
                    </div>
                  </td>
                </tr>
              )}
              {loading &&
                Array.from({ length: 50 }, (_, i) => (
                  <tr
                    key={i}
                    className="text-center bg-blue-50 border-b text-blue-600"
                  >
                    <td className="w-[100px] px-6 py-4 whitespace-nowrap font-semibold">
                      <div className="animate-pulse bg-blue-300 text-gray-50 p-4 px-2 my-2 rounded-full"></div>
                    </td>
                    <td className="w-[100px] px-6 py-4 font-medium">
                      <div className="animate-pulse bg-blue-300 text-gray-50 p-4 px-2 my-2 rounded-full"></div>
                    </td>
                    <td className="w-[100px] px-6 py-4 font-medium">
                      <div className="animate-pulse bg-blue-300 text-gray-50 p-4 px-2 my-2 rounded-full"></div>
                    </td>
                    <td className=" w-[100px] px-6 py-4 font-medium">
                      <div className="animate-pulse bg-blue-300 text-gray-50 p-4 px-2 my-2 rounded-full"></div>
                    </td>
                  </tr>
                ))}
              {data &&
                data.map((college: CollegeType) => (
                  <tr
                    key={college._id}
                    className="text-center bg-blue-50 border-b text-blue-600"
                  >
                    <td className="w-[100px] px-6 py-4 whitespace-nowrap font-semibold underline">
                      <Link
                        to={`/college/${college._id}`}
                        state={{ name: college.name }}
                      >
                        {college.name}
                      </Link>
                    </td>
                    <td className="w-[100px] px-6 py-4 font-medium">
                      <Link
                        to={`/location/${college.location.state}`}
                        className="underline"
                      >
                        {college.location.state}
                      </Link>
                    </td>
                    <td className="w-[100px] px-6 py-4 font-medium">
                      {college.rating}
                    </td>
                    <td className=" w-[100px] px-6 py-4 font-medium">
                      {college.courses.map((course) => (
                        <div
                          className="bg-blue-500 text-gray-50 p-1 px-2 my-2 rounded-full"
                          key={course}
                        >
                          {course}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationCollege;
