import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

interface DataType {
  college: CollegeType;
  _id: string;
  name: string;
  year: number;
  course: string;
}

const Student = () => {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let abortSignal = false;
    const fetchStudent = async () => {
      const { data } = await axios.get(`http://localhost:8080/student/${id}`);
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

    fetchStudent();

    return () => {
      abortSignal = true;
    };
  }, []);

  return (
    <div className="py-4 px-2">
      <div className="font-bold text-3xl text-center mb-5 text-gray-600">
        {location.state.name}
      </div>
      <div className="p-5 my-3 rounded border shadow w-fit m-auto">
        <div className="flex flex-col justify-between">
          <div className="font-bold text-xl text-blue-600 mb-4">
            Student Details
          </div>
          {loading && (
            <div className="flex justify-center items-center w-80 h-72">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-gray-600 text-sm">
              An error occured
            </div>
          )}
          {data && (
            <div className="flex flex-col space-y-2 w-80 mb-3">
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Student Name
                </div>
                <div className="text-sm text-lime-500 font-medium">
                  {data?.name}
                </div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  College Name
                </div>
                <Link
                  to={`/college/${data.college._id}`}
                  className="text-sm text-lime-500 font-medium underline"
                  state={{ name: data.college.name }}
                >
                  {data?.college.name}
                </Link>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Joining Year
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.year}`}</div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  College Location
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.college.location.city}, ${data?.college.location.state}, ${data?.college.location.country}`}</div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  College Established Year
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.college.year}`}</div>
              </div>
              <div className="flex flex-row justify-between items-center space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Course
                </div>
                <div className="text-sm text-blue-50 font-medium text-center">
                  <div className="text-sm text-lime-500 font-medium">
                    {data.course}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
