import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, MoreVertical } from 'lucide-react';

const validationSchema = Yup.object({
  vendorName: Yup.string().required('Vendor name is required'),
  purchaseOrder: Yup.string().required('Purchase order is required'),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  totalAmount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  invoiceDueDate: Yup.date().required('Due date is required'),
  invoiceDate: Yup.date().required('Invoice date is required'),
  description: Yup.string(),
  lineAmount: Yup.number().positive('Amount must be positive'),
  department: Yup.string(),
  account: Yup.string(),
  location: Yup.string()
});

const InvoiceForm = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('session');
    setIsAuthenticated(false);
  };

  const initialValues = JSON.parse(localStorage.getItem('invoiceData')) || {
    vendorName: '',
    purchaseOrder: '',
    invoiceNumber: '',
    totalAmount: '',
    invoiceDueDate: '',
    invoiceDate: '',
    description: '',
    lineAmount: '',
    department: '',
    account: '',
    location: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    localStorage.setItem('invoiceData', JSON.stringify(values));
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <ArrowLeft className="w-6 h-6 text-gray-500" />
            <h1 className="text-xl font-semibold">Create New Invoice</h1>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-700">Vendor Details</button>
            <button className="text-gray-500 hover:text-gray-600">Invoice Details</button>
            <button className="text-gray-500 hover:text-gray-600">Comments</button>
          </div>
        </div>
      </header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="max-w-4xl mx-auto mt-8 px-4">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Vendor Details</h2>
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vendor Information
                    </label>
                    <Field
                      name="vendorName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Select Vendor"
                    />
                    {touched.vendorName && errors.vendorName && (
                      <div className="text-red-500 text-sm mt-1">{errors.vendorName}</div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Purchase Order Number
                        </label>
                        <Field
                          name="purchaseOrder"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Invoice Number
                        </label>
                        <Field
                          name="invoiceNumber"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Amount
                        </label>
                        <Field
                          name="totalAmount"
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date
                        </label>
                        <Field
                          name="invoiceDueDate"
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Description
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Expense Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Line Amount
                        </label>
                        <Field
                          name="lineAmount"
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <Field
                          name="department"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account
                        </label>
                        <Field
                          name="account"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Field
                          name="location"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    localStorage.setItem('invoiceData', JSON.stringify(initialValues));
                  }}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Submit & New
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvoiceForm;