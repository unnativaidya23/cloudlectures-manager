
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Button } from '@/components/ui/button';
import { CourseForm } from '@/components/courses/CourseForm';

export function TrainerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses] = useState(mockCourses);
  const [assignments] = useState(mockAssignments);
  const [formOpen, setFormOpen] = useState(false);
  
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
          <Button 
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-1"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New Course
          </Button>
          <Button 
            onClick={() => navigate('/assignments/new')}
            className="flex items-center gap-1"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New Assignment
          </Button>
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
          <Button 
            onClick={() => navigate('/courses')}
            className="mt-auto" 
            variant="outline"
            size="sm"
          >
            Manage courses
          </Button>
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
          <Button 
            onClick={() => navigate('/assignments')}
            className="mt-auto" 
            variant="outline"
            size="sm"
          >
            View assignments
          </Button>
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
          <Button 
            onClick={() => navigate('/students')}
            className="mt-auto" 
            variant="outline"
            size="sm"
          >
            Manage students
          </Button>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Courses</h3>
            <Button 
              onClick={() => navigate('/courses')}
              variant="link"
              size="sm"
            >
              View All
            </Button>
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
                    <Button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      variant="link"
                      size="sm"
                      className="text-primary p-0 h-auto"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No courses yet.</p>
                <Button 
                  onClick={() => setFormOpen(true)}
                  variant="link"
                  className="mt-2"
                >
                  Create your first course
                </Button>
              </div>
            )}
          </div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
            <Button 
              onClick={() => navigate('/assignments')}
              variant="link"
              size="sm"
            >
              View All
            </Button>
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
                    <Button
                      onClick={() => navigate(`/assignments/${assignment.id}`)}
                      variant="link"
                      size="sm"
                      className="text-primary p-0 h-auto"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No assignments yet.</p>
                <Button 
                  onClick={() => navigate('/assignments/new')}
                  variant="link"
                  className="mt-2"
                >
                  Create your first assignment
                </Button>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Course Form Sheet */}
      <CourseForm 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
}
