
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/ui/glass-card';
import { Plus, User, Users, BookOpen, FileText } from 'lucide-react';
import { mockStudents, mockTrainers, mockCourses, mockAssignments } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { TrainerForm } from '@/components/trainers/TrainerForm';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [students] = useState(mockStudents);
  const [trainers] = useState(mockTrainers);
  const [courses] = useState(mockCourses);
  const [assignments] = useState(mockAssignments);
  const [formOpen, setFormOpen] = useState(false);
  
  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      change: `${students.length} currently enrolled`,
      path: '/students'
    },
    {
      title: 'Total Trainers',
      value: trainers.length,
      icon: <User className="h-6 w-6 text-green-500" />,
      change: `${trainers.filter(t => t.courses.length > 0).length} with active courses`,
      path: '/trainers'
    },
    {
      title: 'Active Courses',
      value: courses.length,
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      change: `${courses.reduce((total, course) => total + course.students.length, 0)} total enrollments`,
      path: '/courses'
    },
    {
      title: 'Assignments',
      value: assignments.length,
      icon: <FileText className="h-6 w-6 text-yellow-500" />,
      change: `${assignments.filter(a => new Date(a.dueDate) > new Date()).length} pending submissions`,
      path: '/assignments'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Admin Dashboard</h1>
        <Button 
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-1"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Add New Trainer
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="flex flex-col h-full">
            <div className="flex justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/50">{stat.icon}</div>
              <Link to={stat.path} className="text-sm text-primary hover:underline">
                Manage
              </Link>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-medium">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Trainers</h3>
            <Link to="/trainers" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {trainers.length > 0 ? trainers.map((trainer) => (
              <div 
                key={trainer.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={`https://i.pravatar.cc/40?img=${parseInt(trainer.id) + 10}`}
                      alt={trainer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{trainer.name}</p>
                    <p className="text-sm text-gray-600">{trainer.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 mr-2">
                    {trainer.courses.length} courses
                  </div>
                  <Link 
                    to={`/trainers/${trainer.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-500">
                <p>No trainers added yet.</p>
                <Button 
                  onClick={() => setFormOpen(true)}
                  variant="link"
                  className="mt-2"
                >
                  Add your first trainer
                </Button>
              </div>
            )}
          </div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Students</h3>
            <Link to="/students" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {students.length > 0 ? students.map((student) => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={student.photo || `https://i.pravatar.cc/40?img=${parseInt(student.id)}`}
                      alt={student.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                </div>
                <Link 
                  to={`/students/${student.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Details
                </Link>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-500">
                <p>No students enrolled yet.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
      
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Active Courses & Assignments</h3>
          <div className="flex gap-2">
            <Link to="/courses" className="text-sm text-primary hover:underline">
              All Courses
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/assignments" className="text-sm text-primary hover:underline">
              All Assignments
            </Link>
          </div>
        </div>
        
        <div className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => {
              // Find trainer for this course
              const trainer = trainers.find(t => t.id === course.trainerId);
              // Find assignments for this course
              const courseAssignments = assignments.filter(a => a.courseId === course.id);
              
              return (
                <div
                  key={course.id}
                  className="p-4 rounded-lg bg-white/50"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Trainer: {trainer?.name || 'Unassigned'}</span>
                        <span>•</span>
                        <span>Course Code: <span className="font-mono bg-gray-100 px-1 rounded">{course.courseCode}</span></span>
                        <span>•</span>
                        <span>{course.students.length} Students Enrolled</span>
                      </div>
                    </div>
                    <Link 
                      to={`/courses/${course.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Course
                    </Link>
                  </div>
                  
                  {courseAssignments.length > 0 ? (
                    <div className="mt-3 border-t pt-2">
                      <p className="text-sm font-medium mb-2">Associated Assignments:</p>
                      <div className="space-y-2">
                        {courseAssignments.map((assignment) => (
                          <div key={assignment.id} className="flex justify-between items-center bg-white/70 rounded p-2 text-sm">
                            <div>
                              <span className="font-medium">{assignment.title}</span>
                              <span className="text-xs text-gray-500 ml-2">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>
                            <Link 
                              to={`/assignments/${assignment.id}`}
                              className="text-xs text-primary hover:underline"
                            >
                              Details
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">No assignments for this course yet.</p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>No active courses at the moment.</p>
              <Button 
                onClick={() => navigate('/courses/new')}
                variant="link"
                className="mt-2"
              >
                Create your first course
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
      
      {/* Add TrainerForm component */}
      <TrainerForm 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        editTrainerId={undefined}
      />
    </div>
  );
}
