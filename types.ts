
export interface Student {
  studentId: string;
  name: string;
  age: string;
  course: string;
  yearLevel: string;
  address: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';
  dateOfBirth: string;
  nationality: string;
  religion: string;
  parentGuardian: string;
  emergencyContact: string;
  dateRegistered: string;
  status: 'Active' | 'Inactive';
  notes: string;
}
