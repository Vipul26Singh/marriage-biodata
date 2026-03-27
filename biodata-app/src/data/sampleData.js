import { uid } from "../utils/uid";

export const SAMPLE_DATA_EN = {
  title: "Marriage Biodata",
  sections: [
    {
      id: uid(),
      twoCol: false,
      columns: [
        {
          id: uid(),
          heading: "Personal Details",
          fields: [
            { id: uid(), key: "Full Name", value: "Rahul Sharma" },
            { id: uid(), key: "Date of Birth", value: "15 January 1996" },
            { id: uid(), key: "Religion / Caste", value: "Hindu - Brahmin" },
            { id: uid(), key: "Height", value: "5'10\"" },
            { id: uid(), key: "Complexion", value: "Fair" },
            { id: uid(), key: "Manglik", value: "No" },
          ],
          photos: [],
          photoLayout: 0,
        },
        {
          id: uid(),
          heading: "",
          fields: [{ id: uid(), key: "", value: "" }],
          photos: [],
          photoLayout: 0,
        },
      ],
    },
    {
      id: uid(),
      twoCol: true,
      columns: [
        {
          id: uid(),
          heading: "Education & Career",
          fields: [
            { id: uid(), key: "Education", value: "B.Tech Computer Science" },
            { id: uid(), key: "Occupation", value: "Software Engineer" },
            { id: uid(), key: "Annual Income", value: "12 LPA" },
          ],
          photos: [],
          photoLayout: 0,
        },
        {
          id: uid(),
          heading: "Contact",
          fields: [
            { id: uid(), key: "Mobile", value: "+91 98765 43210" },
            { id: uid(), key: "Email", value: "rahul.sharma@email.com" },
            { id: uid(), key: "City", value: "Jaipur, Rajasthan" },
          ],
          photos: [],
          photoLayout: 0,
        },
      ],
    },
    {
      id: uid(),
      twoCol: false,
      columns: [
        {
          id: uid(),
          heading: "Family Details",
          fields: [
            { id: uid(), key: "Father's Name", value: "Shri Rajesh Sharma - Businessman" },
            { id: uid(), key: "Mother's Name", value: "Smt. Sunita Sharma - Homemaker" },
            { id: uid(), key: "Siblings", value: "1 Elder Sister - Married" },
          ],
          photos: [],
          photoLayout: 0,
        },
        {
          id: uid(),
          heading: "",
          fields: [{ id: uid(), key: "", value: "" }],
          photos: [],
          photoLayout: 0,
        },
      ],
    },
  ],
};
