import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SimilarColleges from "../components/SimilarColleges";

interface StudentType {
  _id: string;
  name: string;
  year: number;
  course: string;
}

interface DataType {
  college: CollegeType;
  students: StudentType[];
  studentsNum: number;
}

const College = () => {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let abortSignal = false;
    const fetchCollege = async () => {
      const { data } = await axios.get(`http://localhost:8080/college/${id}`);
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
    <div className="py-4 px-2">
      <div className="font-bold text-3xl text-center mb-5 text-gray-600">
        {location.state.name}
      </div>
      <div className="p-5 my-3 rounded border shadow w-fit m-auto">
        <div className="flex flex-col justify-between">
          <div className="font-bold text-xl text-blue-600 mb-4">
            College Details
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
                  College Name
                </div>
                <div className="text-sm text-lime-500 font-medium">
                  {data?.college.name}
                </div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Location
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.college.location.city}, ${data?.college.location.state}, ${data?.college.location.country}`}</div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Year Founded
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.college.year}`}</div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Rating
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.college.rating}`}</div>
              </div>
              <div className="flex flex-row justify-between space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Number of Students
                </div>
                <div className="text-sm text-lime-500 font-medium">{` ${data?.studentsNum}`}</div>
              </div>
              <div className="flex flex-row justify-between items-center space-x-7">
                <div className="text-sm text-purple-700 font-semibold">
                  Courses
                </div>
                <div className="text-sm text-blue-50 font-medium text-center">
                  {data?.college.courses.map((course) => (
                    <div
                      className="bg-blue-500 rounded-full my-1 px-2 py-1"
                      key={course}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="shadow-md sm:rounded-lg h-96 overflow-y-auto m-auto p-4 w-96 border">
          <div>
            <div className="font-bold text-xl text-blue-600 mb-4 text-center">
              Students
            </div>
            {loading && (
              <div className="flex justify-center items-center w-80 h-72">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}
            {data?.students.length === 0 && (
              <div className="text-center text-gray-600 text-sm">
                No students found
              </div>
            )}

            {error && (
              <div className="text-center text-gray-600 text-sm">
                An error occured
              </div>
            )}
            {data?.students && data?.students.length > 0 && (
              <div className="flex flex-col space-y-2">
                {data?.students.map((student) => (
                  <Fragment key={student._id}>
                    <div className="flex flex-row justify-between space-x-10">
                      <Link
                        className="text-sm text-purple-700 font-semibold underline"
                        to={"/student/" + student._id}
                        state={{ name: student.name }}
                      >
                        {student.name}
                      </Link>
                      <div className="text-sm text-lime-500 font-medium">{` ${student.course}`}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <SimilarColleges id={id || ""} />
    </div>
  );
};

export default College;
