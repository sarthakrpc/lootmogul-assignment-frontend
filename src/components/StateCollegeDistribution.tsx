import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const StateCollegeDistribution = ({
  stateData,
}: {
  stateData: CollegeType[];
}) => {
  const [data, setData] = useState<any>(null);

  const navigate = useNavigate();

  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

  const randomRGB = () =>
    `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 1)`;

  useEffect(() => {
    const labels: string[] = [];
    const values: number[] = [];
    const colors: string[] = [];
    // extreact state from stateData and store in labels and values will be the count of colleges in that state
    stateData.forEach((college) => {
      if (labels.includes(college.location.state)) {
        values[labels.indexOf(college.location.state)]++;
      } else {
        labels.push(college.location.state);
        values.push(1);
        colors.push(randomRGB());
      }
    });
    console.log(labels, values, colors);

    setData({
      labels,
      datasets: [
        {
          label: "Statewise College Distribution",
          data: values,
          backgroundColor: colors,
        },
      ],
    });
  }, [stateData]);

  return (
    <>
      {data && console.log(data)}
      {data && (
        <div className="max-w-lg m-auto">
          <Doughnut
            data={data}
            options={{
              onClick: function (event: any, item) {
                const stateLocation = event?.chart?.data.labels[item[0].index];
                navigate(`/location/${stateLocation}`);
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default StateCollegeDistribution;
