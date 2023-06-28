interface CollegeType {
  _id: string;
  name: string;
  year: number;
  rating: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  courses: string[];
}
