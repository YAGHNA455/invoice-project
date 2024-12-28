import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, MoreHorizontal, Upload } from 'lucide-react';
import UploadComponent from './UploadComponent';

const validationSchema = Yup.object({
  vendorName: Yup.string().required('Vendor name is required'),
  purchaseOrder: Yup.string().required('Purchase order number is required'),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  totalAmount: Yup.number().required('Total amount is required').positive('Must be a positive number'),
  invoiceDueDate: Yup.date().required('Invoice due date is required'),
  postDate: Yup.date().required('Post date is required'),
  description: Yup.string().required('Invoice description is required'),
  lineAmount: Yup.number().required('Line amount is required').positive('Must be a positive number'),
  department: Yup.string().required('Department is required'),
  account: Yup.string().required('Account is required'),
  location: Yup.string().required('Location is required'),
});

const InvoiceForm = () => {
  // Initialize form values from localStorage if available
  const initialValues = {
    vendorName: localStorage.getItem('vendorName') || '',
    purchaseOrder: localStorage.getItem('purchaseOrder') || '',
    invoiceNumber: localStorage.getItem('invoiceNumber') || '',
    totalAmount: localStorage.getItem('totalAmount') || '',
    paymentTerms: localStorage.getItem('paymentTerms') || '',
    invoiceDueDate: localStorage.getItem('invoiceDueDate') || '',
    postDate: localStorage.getItem('postDate') || '',
    description: localStorage.getItem('description') || '',
    lineAmount: localStorage.getItem('lineAmount') || '',
    department: localStorage.getItem('department') || '',
    account: localStorage.getItem('account') || '',
    location: localStorage.getItem('location') || '',
    comments: localStorage.getItem('comments') || ''
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    Object.keys(initialValues).forEach(key => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        initialValues[key] = storedValue;
      }
    });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
              <span className="ml-4 text-lg font-medium">Create New Invoice</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a href="#" className="px-3 py-2 text-sm font-medium text-blue-600">Vendor Details</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500">Invoice Details</a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500">Comments</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <UploadComponent />
          </div>
          <div className="col-span-2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form className="bg-white shadow rounded-lg divide-y divide-gray-200">
                  {/* Vendor Details */}
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">1</span>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Vendor Details</h3>
                      </div>
                      <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-pointer" />
                    </div>

                    {/* Vendor Name */}
                    <div className="mt-6">
                      <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">
                        Vendor *
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="vendorName"
                          id="vendorName"
                          placeholder="Select vendor"
                          className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.vendorName && touched.vendorName ? 'border-red-500' : ''
                            }`}
                        />
                        <ErrorMessage name="vendorName" component="div" className="text-red-500 text-xs mt-1" />
                        <div className="flex justify-between mt-1">
                          <span className="inline-block text-xs text-gray-500">530 Main St, Lynn</span>
                          <a href="#" className="inline-block text-xs text-blue-500">+ View Vendor Details</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700">2</span>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Invoice Details</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-6 mt-6">
                      {/* Purchase Order */}
                      <div className="col-span-3">
                        <label htmlFor="purchaseOrder" className="block text-sm font-medium text-gray-700">
                          Purchase Order Number *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="text"
                            name="purchaseOrder"
                            id="purchaseOrder"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.purchaseOrder && touched.purchaseOrder ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="purchaseOrder" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Invoice Number */}
                      <div className="col-span-3">
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">
                          Invoice Number *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="text"
                            name="invoiceNumber"
                            id="invoiceNumber"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.invoiceNumber && touched.invoiceNumber ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="invoiceNumber" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="col-span-3">
                        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                          Total Amount *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="number"
                            name="totalAmount"
                            id="totalAmount"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.totalAmount && touched.totalAmount ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="totalAmount" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Payment Terms */}
                      <div className="col-span-3">
                        <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">
                          Payment Terms
                        </label>
                        <div className="mt-1">
                          <Field
                            as="select"
                            name="paymentTerms"
                            id="paymentTerms"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select payment terms</option>
                          </Field>
                        </div>
                      </div>

                      {/* Invoice Due Date */}
                      <div className="col-span-3">
                        <label htmlFor="invoiceDueDate" className="block text-sm font-medium text-gray-700">
                          Invoice Due Date *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="date"
                            name="invoiceDueDate"
                            id="invoiceDueDate"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.invoiceDueDate && touched.invoiceDueDate ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="invoiceDueDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Post Date */}
                      <div className="col-span-3">
                        <label htmlFor="postDate" className="block text-sm font-medium text-gray-700">
                          Post Date *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="date"
                            name="postDate"
                            id="postDate"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.postDate && touched.postDate ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="postDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Invoice Description *
                      </label>
                      <div className="mt-1">
                        <Field
                          as="textarea"
                          rows={3}
                          name="description"
                          id="description"
                          className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.description && touched.description ? 'border-red-500' : ''
                            }`}
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Expense Details */}
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700">3</span>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Expense Details</h3>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">$ 0.00</span>
                        <span className="text-gray-400 text-xs mx-1">/</span>
                        <span className="text-gray-400 text-xs">$ 0.00</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-6 mt-6">
                      {/* Line Amount */}
                      <div className="col-span-3">
                        <label htmlFor="lineAmount" className="block text-sm font-medium text-gray-700">
                          Line Amount *
                        </label>
                        <div className="mt-1">
                          <Field
                            type="number"
                            name="lineAmount"
                            id="lineAmount"
                            autoComplete="off"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.lineAmount && touched.lineAmount ? 'border-red-500' : ''
                              }`}
                          />
                          <ErrorMessage name="lineAmount" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Department */}
                      <div className="col-span-3">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                          Department *
                        </label>
                        <div className="mt-1">
                          <Field
                            as="select"
                            name="department"
                            id="department"

                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.account && touched.account ? 'border-red-500' : ''
                              }`}
                          >
                            <option value="">Select Account</option>
                          </Field>
                          <ErrorMessage name="account" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location *
                        </label>
                        <div className="mt-1">
                          <Field
                            as="select"
                            name="location"
                            id="location"
                            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.location && touched.location ? 'border-red-500' : ''
                              }`}
                          >
                            <option value="">Select Location</option>
                          </Field>
                          <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        + Add Expense Coding
                      </button>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700">4</span>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Comments</h3>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        id="comments"
                        name="comments"
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
                        placeholder="Add a comment you can @mention someone"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end px-4 py-4 space-x-4 sm:px-6">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit & New'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;