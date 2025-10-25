
import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import { Student } from './types';

const initialStudentState: Student = {
  studentId: 'CA202302527',
  name: 'Kesha Mae B.',
  age: '20',
  course: 'BSIT',
  yearLevel: '3RD YEAR',
  address: '123 Main St, Anytown',
  email: 'keshamae@example.com',
  phone: '555-123-4567',
  gender: 'Female',
  dateOfBirth: '2004-12-21',
  nationality: 'Filipino',
  religion: 'Catholic',
  parentGuardian: 'Jane Doe',
  emergencyContact: '555-987-6543',
  dateRegistered: new Date().toISOString().split('T')[0],
  status: 'Active',
  notes: 'A bright and promising student.',
};

// --- StudentTable Component ---
interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  selectedStudentId?: string | null;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onSelectStudent, selectedStudentId }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Saved Student Records
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Student ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Course</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? students.map((student) => (
              <tr 
                key={student.studentId} 
                className={`border-b cursor-pointer ${student.studentId === selectedStudentId ? 'bg-indigo-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => onSelectStudent(student)}
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {student.studentId}
                </th>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.course}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {student.status}
                    </span>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">No student records found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// --- App Component ---
const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([initialStudentState]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(initialStudentState);

  const handleStudentChange = (updatedStudent: Student) => {
    setSelectedStudent(updatedStudent);
  };
  
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleSave = (studentToSave: Student) => {
    setStudents(prevStudents => {
        const studentIndex = prevStudents.findIndex(s => s.studentId === studentToSave.studentId);
        if (studentIndex > -1) {
            const updatedStudents = [...prevStudents];
            updatedStudents[studentIndex] = studentToSave;
            return updatedStudents;
        } else {
            return [...prevStudents, studentToSave];
        }
    });
  };
  
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            {selectedStudent && (
              <StudentForm 
                student={selectedStudent} 
                onStudentChange={handleStudentChange}
                onSave={handleSave} 
              />
            )}
          </div>
          <div className="lg:col-span-3">
            <StudentTable 
                students={students} 
                onSelectStudent={handleSelectStudent}
                selectedStudentId={selectedStudent?.studentId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="bg-slate-800 text-white shadow-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wider">
          STUDENTS INFORMATION SYSTEM
        </h1>
      </div>
    </div>
  </header>
);

export default App;
