
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Calendar, 
  FileText, 
  Plus, 
  Users, 
  BookOpen 
} from 'lucide-react';
import { mockAssignments, mockCourses, mockStudents } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';

export function TrainerDashboard() {
  const { user } = useAuth();
  const [courses] = useState(mockCourses);
  const [assignments] = useState(mockAssignments);
  
  // Get courses for this trainer
  const trainerCourses = courses.filter(course => course.trainerId === user?.id);
  
  // Get assignments for this trainer's courses
  const trainerAssignments = assignments.filter(
    assignment => trainerCourses.some(course => course.id === assignment.courseId)
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Trainer Dashboard</h1>
        <div className="flex gap-3">
          <Link 
            to="/courses/new" 
            className="flex items-center gap-1 glass-button text-sm"
          >
            <Plus className="h-4 w-4" />
            New Course
          </Link>
          <Link 
            to="/assignments/new" 
            className="flex items-center gap-1 glass-button text-sm"
          >
            <Plus className="h-4 w-4" />
            New Assignment
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-blue-100">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-medium">Your Courses</h3>
          </div>
          <p className="text-3xl font-medium mb-1">{trainerCourses.length}</p>
          <p className="text-sm text-gray-600 mb-3">Active courses</p>
          <Link 
            to="/courses" 
            className="mt-auto text-sm text-primary hover:underline"
          >
            Manage courses
          </Link>
        </GlassCard>
        
        <GlassCard className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-purple-100">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-medium">Assignments</h3>
          </div>
          <p className="text-3xl font-medium mb-1">{trainerAssignments.length}</p>
          <p className="text-sm text-gray-600 mb-3">Active assignments</p>
          <Link 
            to="/assignments" 
            className="mt-auto text-sm text-primary hover:underline"
          >
            View assignments
          </Link>
        </GlassCard>
        
        <GlassCard className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-green-100">
              <Users className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-medium">Students</h3>
          </div>
          <p className="text-3xl font-medium mb-1">{mockStudents.length}</p>
          <p className="text-sm text-gray-600 mb-3">Enrolled students</p>
          <Link 
            to="/students" 
            className="mt-auto text-sm text-primary hover:underline"
          >
            Manage students
          </Link>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Courses</h3>
            <Link to="/courses" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {trainerCourses.length > 0 ? (
              trainerCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{course.title}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {course.materials.filter(m => m.isReleased).length}/{course.materials.length} materials
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Created: {formatDate(course.createdAt)}
                    </span>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-primary hover:underline"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No courses yet.</p>
                <Link 
                  to="/courses/new" 
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Create your first course
                </Link>
              </div>
            )}
          </div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
            <Link to="/assignments" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {trainerAssignments.length > 0 ? (
              trainerAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="flex items-center gap-1 text-amber-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">
                        Due {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {assignment.description.substring(0, 80)}
                    {assignment.description.length > 80 ? '...' : ''}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Submissions: {assignment.submissions.length}
                    </span>
                    <Link
                      to={`/assignments/${assignment.id}`}
                      className="text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No assignments yet.</p>
                <Link 
                  to="/assignments/new" 
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Create your first assignment
                </Link>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
