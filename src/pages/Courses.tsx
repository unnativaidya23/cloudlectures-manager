
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { BookOpen, FileText, Plus, Users } from 'lucide-react';
import { mockCourses } from '@/utils/mockData';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses] = useState(mockCourses);
  
  // Filter courses based on user role
  const filteredCourses = user?.role === 'trainer'
    ? courses.filter(course => course.trainerId === user.id)
    : courses;
  
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
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Courses</h1>
          
          {/* Only show add course button for admin and trainer */}
          {(user?.role === 'admin' || user?.role === 'trainer') && (
            <button 
              onClick={() => navigate('/courses/new')}
              className="flex items-center gap-1 glass-button"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredCourses.map((course) => (
            <GlassCard key={course.id} className="transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-medium mb-1">{course.title}</h2>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>
                        {course.materials.filter(m => m.isReleased).length}/{course.materials.length} materials
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-purple-500" />
                      <span>
                        Created: {formatDate(course.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>2 students enrolled</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="glass-button w-full md:w-auto"
                  >
                    View Course
                  </button>
                  
                  {/* Only show manage materials button for admin and trainer */}
                  {(user?.role === 'admin' || (user?.role === 'trainer' && course.trainerId === user.id)) && (
                    <button
                      onClick={() => navigate(`/courses/${course.id}/materials`)}
                      className="text-sm text-primary hover:underline"
                    >
                      Manage Materials
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl mb-2">No Courses Available</h2>
              <p className="text-gray-600 mb-6">
                {user?.role === 'trainer'
                  ? "You haven't created any courses yet."
                  : "There are no courses available at the moment."}
              </p>
              
              {(user?.role === 'admin' || user?.role === 'trainer') && (
                <button 
                  onClick={() => navigate('/courses/new')}
                  className="glass-button"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create First Course
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
