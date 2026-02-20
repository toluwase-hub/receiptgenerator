import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Receiptinputs = () => {
  const [receiptData, setReceiptData] = useState(null);

  const now = new Date();
const formattedDate = now.toLocaleDateString();
const formattedTime = now.toLocaleTimeString();

  const validationSchema = yup.object({
    ProductName: yup.string().required("Product Name is Required")
    .max(20, "Product Name must be less than 20 character"),
    ProductPrice: yup.number().typeError("Must be a number").required("Product price is Required "),
    Quantity: yup.number().typeError("Must be a number").required("Product Quantity is Required"),
    PaymentMethod: yup.string().required("Payment Method is Required"),
    CustomerName: yup.string().required("Customer Name is Required"),
    CustomerAddress: yup.string().required("Customer Address is Required"),
    CustomerPhoneNo: yup.string().required("Customer Phone Number Required"),
    CustomerEmail: yup.string().email("Invalid email"),
    TAX: yup.number().typeError("Must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      ProductName: "",
      ProductPrice: "",
      Quantity: "",
      PaymentMethod: "",
      CustomerName: "",
      CustomerAddress: "",
      CustomerPhoneNo: "",
      CustomerEmail: "",
      TAX: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setReceiptData(values);
    },
  });

  const generatePDF = () => {
    if (!receiptData) return;

    const doc = new jsPDF();
    const {
      ProductName,
      ProductPrice,
      Quantity,
      CustomerName,
      CustomerAddress,
      CustomerPhoneNo,
      CustomerEmail,
      PaymentMethod,
      TAX,
    } = receiptData;

    const subtotal = Number(ProductPrice) * Number(Quantity);
    const taxAmount = (subtotal * Number(TAX || 0)) / 100;
    const total = subtotal + taxAmount;
    const today = new Date().toLocaleDateString();

    // HEADER
    doc.setFontSize(20);
    doc.text("RECEIPT", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Ola Electric & Electronics Nigeria Ltd.", 105, 28, { align: "center" });
    doc.text("Ogbomoso, Oyo State, Nigeria", 105, 34, { align: "center" });
    doc.text("Phone: 09043933210", 105, 40, { align: "center" });
    doc.text("Email: Olaniyitoluwase@gmail.com ", 105, 46, { align: "center" });
    doc.text("Website: receiptgenerator.vercel.app ", 105, 52, { align: "center" });

    // CUSTOMER DETAILS
    doc.text(`Date: ${today}`, 14, 66);
    doc.text(`Customer: ${CustomerName}`, 14, 72);
    doc.text(`Address: ${CustomerAddress}`, 14, 78);
    doc.text(`Phone: ${CustomerPhoneNo}`, 14, 84);
    doc.text(`Email: ${CustomerEmail || "-"}`, 14, 90);
    doc.text(`Payment Method: ${PaymentMethod}`, 14, 96);

    // PRODUCT TABLE
    autoTable(doc, {
      startY: 110,
      head: [["Product", "Quantity", "Unit Price", "Total"]],
      body: [[ProductName, Quantity, `₦${ProductPrice}`, `₦${subtotal.toFixed(2)}`]],
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // TOTALS
    doc.text(`Subtotal: ₦${subtotal.toFixed(2)}`, 140, finalY);
    doc.text(`Tax (${TAX || 0}%): ₦${taxAmount.toFixed(2)}`, 140, finalY + 6);
    doc.setFontSize(14);
    doc.text(`Total: ₦${total.toFixed(2)}`, 140, finalY + 14);

    // FOOTER
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 280, { align: "center" });

    doc.save("receipt.pdf");
  };

  return (
    <div className="w-[95%] mx-auto">
      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 mt-4">
        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="ProductName">Product Name</label>
        <input placeholder="Product Name" type="text" name="ProductName" id="ProductName"
          value={formik.values.ProductName}
          onChange={formik.handleChange} className="border p-2" />

          {formik.touched.ProductName && formik.errors.ProductName && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.ProductName}
          </span>
        )}
          </div>

                  <div className="flex flex-col">
                    <label className="font-light text-sm" htmlFor="ProductPrice">Product Price</label>
        <input placeholder="Product Price" type="number" name="ProductPrice" id="ProductPrice"
          value={formik.values.ProductPrice}
          onChange={formik.handleChange} className="border p-2" />

           {formik.touched.ProductPrice && formik.errors.ProductPrice && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.ProductPrice}
          </span>
        )}
          </div>

          <div className="flex flex-col">
            <label className="font-light text-sm" htmlFor="Quantity">Quantity</label>
        <input placeholder="Quantity" type="number" name="Quantity"  id="Quantity"
          value={formik.values.Quantity}
          onChange={formik.handleChange} className="border p-2" />

          {formik.touched.Quantity && formik.errors.Quantity && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.Quantity}
          </span>
        )}
          </div>

           <div className="flex flex-col">
           <label className="font-light text-sm" htmlFor="TAX">TAX</label> 
        <input placeholder="TAX %" type="number" name="TAX" id="TAX"
          value={formik.values.TAX}
          onChange={formik.handleChange} className="border p-2" />

           {formik.touched.TAX && formik.errors.TAX && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.TAX}
          </span>
        )}
          </div>
                   <div className="flex flex-col">
           <label className="font-light text-sm" htmlFor="CustomerName">Customer Name</label> 
        <input placeholder="Customer Name" type="text" name="CustomerName" id="CustomerName"
          value={formik.values.CustomerName}
          onChange={formik.handleChange} className="border p-2" />

           {formik.touched.CustomerName && formik.errors.CustomerName && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.CustomerName}
          </span>
        )}
          </div>
        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="CustomerAddress">Customer Address</label>
        <input placeholder="Customer Address" type="text" name="CustomerAddress" id="CustomerAddress"
          value={formik.values.CustomerAddress}
          onChange={formik.handleChange} className="border p-2" />

          {formik.touched.CustomerAddress && formik.errors.CustomerAddress && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.CustomerAddress}
          </span>
        )}
          </div>
        <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="CustomerPhoneNo">Customer Phone No</label>
        <input placeholder="Customer Phone No" type="text" name="CustomerPhoneNo" id="CustomerPhoneNo"
          value={formik.values.CustomerPhoneNo}
          onChange={formik.handleChange} className="border p-2" />

          {formik.touched.CustomerPhoneNo && formik.errors.CustomerPhoneNo && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.CustomerPhoneNo}
          </span>
        )}
          </div>
         <div className="flex flex-col">
          <label className="font-light text-sm" htmlFor="CustomerEmail">Customer Email</label>
        <input placeholder="CustomerEmail" type="email" name="CustomerEmail" id="CustomerEmail"
          value={formik.values.CustomerEmail}
          onChange={formik.handleChange} className="border p-2" />

          {formik.touched.CustomerEmail && formik.errors.CustomerEmail && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.CustomerEmail}
          </span>
        )}
          </div>
          <div className="flex flex-col">
        <select name="PaymentMethod" value={formik.values.PaymentMethod}
          onChange={formik.handleChange} className="border p-2">
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Transfer">Transfer</option>
        </select>
                  {formik.touched.PaymentMethod && formik.errors.PaymentMethod && (
          <span className='text-xs text-red-500 font-medium'>
            {formik.errors.PaymentMethod}
          </span>
        )}
        </div>
        <button type="submit" className="bg-black text-white p-2">Generate Receipt</button>
      </form>

      {/* PREVIEW DIV */}
      {receiptData && (
        <div className="border p-4 mt-6 bg-white shadow-md ">
          <div className="border-b pb-2">
          <h1 className="text-2xl font-bold text-center">RECEIPT</h1>
          <p className="text-center font-medium">Ola Electric & Electronics Nigeria Ltd.</p>
          <p className="text-center">Ogbomoso, Oyo State, Nigeria</p>
          <p className="font-light text-center">Phone: 09043933210</p>
           <p className="font-light text-center"> Email: Olaniyitoluwase@gmail.com </p> 
           <p className="font-light text-center"> Website: receiptgenerator.vercel.app </p> 
           </div>

          <div className="mt-4 flex justify-between">

            <div>
            <p className="font-bold underline text-2xl">Customer Details</p>
            <p><strong>Customer:</strong> {receiptData.CustomerName}</p>
            <p><strong>Address:</strong> {receiptData.CustomerAddress}</p>
            <p><strong>Phone:</strong> {receiptData.CustomerPhoneNo}</p>
            <p><strong>Email:</strong> {receiptData.CustomerEmail || "-"}</p>
            <p><strong>Payment Method:</strong> {receiptData.PaymentMethod}</p>
            </div>

            <div className="">
              <p className="border-y"><strong>Date:</strong> {formattedDate}</p>
              <p className="border-b"><strong>Time:</strong> {formattedTime}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-bold underline text-2xl">Product Details</p>
            <p className="border-b"><strong>Product:</strong> {receiptData.ProductName}</p>
            <p className="border-b"><strong>Quantity:</strong> {receiptData.Quantity}</p>
            <p className="border-b"><strong>Unit Price:</strong> ₦{receiptData.ProductPrice}</p>
            <p className="border-b"><strong>Subtotal:</strong> ₦{(Number(receiptData.ProductPrice) * Number(receiptData.Quantity)).toFixed(2)}</p>
            <p className="border-b"><strong>Tax ({receiptData.TAX || 0}%):</strong> ₦{((Number(receiptData.ProductPrice) * Number(receiptData.Quantity) * Number(receiptData.TAX || 0)) / 100).toFixed(2)}</p>
            <p className="font-bold text-lg border-b">
              <strong>Total:</strong> ₦{((Number(receiptData.ProductPrice) * Number(receiptData.Quantity)) + ((Number(receiptData.ProductPrice) * Number(receiptData.Quantity) * Number(receiptData.TAX || 0)) / 100)).toFixed(2)}
            </p>
          </div>

          <button onClick={generatePDF} className="mt-4 bg-green-600 text-white p-2">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Receiptinputs;