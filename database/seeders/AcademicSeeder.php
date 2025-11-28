<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\ClassModel;
use App\Models\Department;
use App\Models\Subject;

class AcademicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Departments
        $csDept = Department::create([
            'name' => 'Computer Science',
            'code' => 'CS',
            'description' => 'Department of Computer Science and Engineering',
            'head_of_department' => 'Dr. John Smith',
        ]);

        $mathDept = Department::create([
            'name' => 'Mathematics',
            'code' => 'MATH',
            'description' => 'Department of Mathematics',
            'head_of_department' => 'Dr. Sarah Johnson',
        ]);

        $physDept = Department::create([
            'name' => 'Physics',
            'code' => 'PHYS',
            'description' => 'Department of Physics and Astronomy',
            'head_of_department' => 'Dr. Michael Brown',
        ]);

        // Create Courses
        Course::create([
            'name' => 'Bachelor of Computer Science',
            'description' => 'A comprehensive 4-year program covering software development, algorithms, and system design',
            'duration' => '4 years',
            'fee' => 12000,
        ]);

        Course::create([
            'name' => 'Master of Data Science',
            'description' => 'Advanced program focusing on machine learning, big data analytics, and AI',
            'duration' => '2 years',
            'fee' => 18000,
        ]);

        Course::create([
            'name' => 'Web Development Bootcamp',
            'description' => 'Intensive program covering full-stack web development',
            'duration' => '6 months',
            'fee' => 5000,
        ]);

        // Create Classes
        ClassModel::create([
            'name' => 'Class A',
            'code' => 'A',
            'description' => 'Morning batch - Advanced level',
        ]);

        ClassModel::create([
            'name' => 'Class B',
            'code' => 'B',
            'description' => 'Evening batch - Intermediate level',
        ]);

        ClassModel::create([
            'name' => 'Class C',
            'code' => 'C',
            'description' => 'Weekend batch - Beginner level',
        ]);

        // Create Subjects
        Subject::create([
            'name' => 'Data Structures and Algorithms',
            'code' => 'CS201',
            'description' => 'Learn fundamental data structures and algorithmic techniques',
            'department_id' => $csDept->id,
            'credits' => 4,
        ]);

        Subject::create([
            'name' => 'Database Management Systems',
            'code' => 'CS301',
            'description' => 'Study of database design, SQL, and database administration',
            'department_id' => $csDept->id,
            'credits' => 3,
        ]);

        Subject::create([
            'name' => 'Linear Algebra',
            'code' => 'MATH101',
            'description' => 'Introduction to matrices, vectors, and linear transformations',
            'department_id' => $mathDept->id,
            'credits' => 3,
        ]);

        Subject::create([
            'name' => 'Calculus I',
            'code' => 'MATH102',
            'description' => 'Differential and integral calculus',
            'department_id' => $mathDept->id,
            'credits' => 4,
        ]);

        Subject::create([
            'name' => 'Quantum Mechanics',
            'code' => 'PHYS401',
            'description' => 'Advanced study of quantum physics principles',
            'department_id' => $physDept->id,
            'credits' => 4,
        ]);

        Subject::create([
            'name' => 'Classical Mechanics',
            'code' => 'PHYS101',
            'description' => 'Fundamentals of Newtonian mechanics',
            'department_id' => $physDept->id,
            'credits' => 3,
        ]);
    }
}
