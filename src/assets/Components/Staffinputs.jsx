import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Staffinputs = () => {
  const [staffid, setStaffid] = useState(null);

  const validationSchema = yup.object({
    Image: yup
      .mixed()
      .required("Staff Image is Required")
      .test("filesize", "File size is too large", (value) => {
        return value && value.size <= 1024 * 1024 * 2;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value.type);
      }),
    FirstName: yup
      .string()
      .required("First Name is Required")
      .max(10, "First Name must be less than 10 character"),
    SurName: yup
      .string()
      .required("SurName is Required ")
      .max(10, "SurName must be less than 10 character"),
    LastName: yup
      .string()
      .required("Last Name is Required")
      .max(10, "Last Name must be less than 10 character"),
    Post: yup.string().required("Staff Post is Required"),
    IdNumber: yup.string().required("Staff Id Number is Required"),
    StaffAddress: yup.string().required("Staff Address is Required"),
    StaffPhoneNo: yup.string().required("Staff Phone Number Required"),
  });

  const formik = useFormik({
    initialValues: {
      Image: null,
      FirstName: "",
      SurName: "",
      LastName: "",
      Post: "",
      IdNumber: "",
      StaffAddress: "",
      StaffPhoneNo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setStaffid(values);
    },
  });

  return (
    <div>
      <h1 className="font-bold">ID Card Section</h1>
      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 mt-4">
        <div>
          <label htmlFor="Image">Image: </label>
          <input
            placeholder="Staff Image"
            type="file"
            name="Image"
            id="Image"
            onChange={(event) => {
              formik.setFieldValue("Image", event.currentTarget.files[0]);
            }}
            className="border"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="FirstName">
            First Name
          </label>
          <input
            placeholder="First Name"
            type="text"
            name="FirstName"
            id="FirstName"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.FirstName && formik.errors.FirstName && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.FirstName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="SurName">
            SurName
          </label>
          <input
            placeholder="SurName"
            type="text"
            name="SurName"
            id="SurName"
            value={formik.values.SurName}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.SurName && formik.errors.SurName && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.SurName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="LastName">
            Last Name
          </label>
          <input
            placeholder="Last Name"
            type="text"
            name="LastName"
            id="LastName"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.LastName && formik.errors.LastName && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.LastName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <select
            name="Post"
            value={formik.values.Post}
            onChange={formik.handleChange}
            className="border p-2"
          >
            <option value="">Select Staff Post</option>
            <option value="CEO">CEO</option>
            <option value="PA">PA</option>
            <option value="Social Media Manager">Social Media Manager</option>
            <option value="Secretary">Secretary</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.Post && formik.errors.Post && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.Post}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="IdNumber">
            IdNumber
          </label>
          <input
            placeholder="IdNumber"
            type="text"
            name="IdNumber"
            id="IdNumber"
            value={formik.values.IdNumber}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.IdNumber && formik.errors.IdNumber && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.IdNumber}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="StaffAddress">
            Staff Address
          </label>
          <input
            placeholder="Staff Address"
            type="text"
            name="StaffAddress"
            id="StaffAddress"
            value={formik.values.StaffAddress}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.StaffAddress && formik.errors.StaffAddress && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.StaffAddress}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="StaffPhoneNo">
            Staff PhoneNo
          </label>
          <input
            placeholder="Staff PhoneNo"
            type="text"
            name="StaffPhoneNo"
            id="StaffPhoneNo"
            value={formik.values.StaffPhoneNo}
            onChange={formik.handleChange}
            className="border p-2"
          />

          {formik.touched.StaffPhoneNo && formik.errors.StaffPhoneNo && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.StaffPhoneNo}
            </span>
          )}
        </div>

        <button type="submit" className="bg-black text-white p-2">
          Generate ID Card
        </button>
      </form>

      <div className="font-bold py-2">
        {staffid === null
          ? "Once Generated Your ID Card Will Show Below🔻"
          : "Contratulations ✅ Your ID Card Is Generated Successfully "}
      </div>

      <div>
        {staffid && (
          <div className="flex flex-col justify-center items-center border gap-3 w-1/3 pb-4">

            <div className=" bg-blue-800 w-full flex flex-col gap-4 items-center rounded-b-full pt-4  ">
                <p className="font-bold text-white"><span className="text-3xl italic">T</span>ee Web Coder</p>
            <p className="">
              <img src={URL.createObjectURL(staffid.Image)} alt="staff_Image" className="border-3 border-white object-cover w-30 h-30 rounded-full"  />
            </p>
            </div>
            
            <p className="capitalize font-bold text-2xl italic">
              {staffid.SurName} {staffid.FirstName}
            </p>
            <p className="bg-blue-800 text-white px-2 py-1 rounded-bl-2xl rounded-tr-2xl">
              {staffid.Post}
            </p>
            <p className="text-sm">
              {" "}
              <strong className="text-blue-500">ID NO: </strong>
              {staffid.IdNumber}
            </p>
            <p className="capitalize text-sm">
              {" "}
              <strong className="text-blue-500 ">Address: </strong>
              {staffid.StaffAddress}
            </p>
            <p className="capitalize text-sm">
              <strong className="text-blue-500">Phone: </strong>
              {staffid.StaffPhoneNo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staffinputs;
