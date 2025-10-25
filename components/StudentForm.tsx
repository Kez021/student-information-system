
import React, { useState } from 'react';
import { Student } from '../types';
import FormSection from './FormSection';
import FormField from './FormField';

interface StudentFormProps {
    student: Student;
    onStudentChange: (student: Student) => void;
    onSave: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onStudentChange, onSave }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onStudentChange({ ...student, [name]: value });
  };
  
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStudentChange({ ...student, gender: e.target.value as Student['gender'] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(student);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Hide message after 3s
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} noValidate>
        
        <FormSection title="Academic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Student ID" name="studentId" value={student.studentId} onChange={handleChange} required />
            <FormField label="Name" name="name" value={student.name} onChange={handleChange} />
            <FormField label="Age" name="age" type="number" value={student.age} onChange={handleChange} />
            <FormField label="Course" name="course" value={student.course} onChange={handleChange} />
            <FormField label="Year Level" name="yearLevel" value={student.yearLevel} onChange={handleChange} />
            <FormField label="Address" name="address" value={student.address} onChange={handleChange} />
            <FormField label="Email Address" name="email" type="email" value={student.email} onChange={handleChange} />
            <FormField label="Phone Number" name="phone" type="tel" value={student.phone} onChange={handleChange} />
          </div>
        </FormSection>

        <FormSection title="Personal Information">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex items-center space-x-4">
                  {['Male', 'Female', 'Prefer not to say'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={student.gender === option}
                        onChange={handleGenderChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <FormField label="Date of Birth (YYYY-MM-DD)" name="dateOfBirth" type="date" value={student.dateOfBirth} onChange={handleChange} />
              <FormField label="Nationality" name="nationality" value={student.nationality} onChange={handleChange} />
              <div>
                <label htmlFor="religion" className="block text-sm font-medium text-gray-700">Religion</label>
                <select
                  id="religion"
                  name="religion"
                  value={student.religion}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>Catholic</option>
                  <option>Christian</option>
                  <option>Muslim</option>
                  <option>Buddhist</option>
                  <option>Other</option>
                </select>
              </div>
              <FormField label="Parent/Guardian" name="parentGuardian" value={student.parentGuardian} onChange={handleChange} required />
              <FormField label="Emergency Contact" name="emergencyContact" type="tel" value={student.emergencyContact} onChange={handleChange} required />
            </div>
        </FormSection>

        <FormSection title="System Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Date Registered" name="dateRegistered" type="date" value={student.dateRegistered} onChange={handleChange} />
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={student.status}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={student.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
          </div>
        </FormSection>
        
        {isSubmitted && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <p className="font-bold">Success!</p>
                <p>Student information has been saved.</p>
            </div>
        )}

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Information
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default StudentForm;
