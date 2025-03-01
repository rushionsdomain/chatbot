import React, { useState } from 'react';
import { X, Search, ExternalLink, Phone, Video, BookOpen, Dumbbell } from 'lucide-react';
import { Resource } from '../types';

interface ResourcesProps {
  onClose: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Sample resources - in a real app, these would come from an API or database
  const resources: Resource[] = [
    {
      id: '1',
      title: 'National Suicide Prevention Lifeline',
      description: 'Free and confidential support for people in distress, 24/7.',
      url: 'https://988lifeline.org/',
      category: 'hotline',
      tags: ['crisis', 'suicide', 'emergency'],
    },
    {
      id: '2',
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a Crisis Counselor.',
      url: 'https://www.crisistextline.org/',
      category: 'hotline',
      tags: ['crisis', 'text', 'emergency'],
    },
    {
      id: '3',
      title: '5-Minute Anxiety Relief Meditation',
      description: 'A quick guided meditation to help reduce anxiety.',
      url: 'https://www.youtube.com/watch?v=O-6f5wQXSu8',
      category: 'video',
      tags: ['meditation', 'anxiety', 'quick'],
    },
    {
      id: '4',
      title: 'Progressive Muscle Relaxation Guide',
      description: 'Learn how to release tension through progressive muscle relaxation.',
      url: 'https://www.healthline.com/health/progressive-muscle-relaxation',
      category: 'article',
      tags: ['relaxation', 'stress', 'technique'],
    },
    {
      id: '5',
      title: '10-Minute Yoga for Mental Health',
      description: 'Simple yoga poses to improve mood and reduce stress.',
      url: 'https://www.youtube.com/watch?v=sTANio_2E0Q',
      category: 'exercise',
      tags: ['yoga', 'stress', 'physical'],
    },
    {
      id: '6',
      title: 'Understanding Depression',
      description: 'An overview of depression symptoms, causes, and treatments.',
      url: 'https://www.nimh.nih.gov/health/topics/depression',
      category: 'article',
      tags: ['depression', 'education', 'treatment'],
    },
    {
      id: '7',
      title: 'Breathing Techniques for Panic Attacks',
      description: 'Learn effective breathing exercises to manage panic attacks.',
      url: 'https://www.healthline.com/health/breathing-exercises-for-anxiety',
      category: 'article',
      tags: ['anxiety', 'panic', 'breathing'],
    },
  ];
  
  const categories = [
    { id: 'hotline', label: 'Hotlines', icon: <Phone size={18} /> },
    { id: 'article', label: 'Articles', icon: <BookOpen size={18} /> },
    { id: 'video', label: 'Videos', icon: <Video size={18} /> },
    { id: 'exercise', label: 'Exercises', icon: <Dumbbell size={18} /> },
  ];
  
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === null || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hotline':
        return <Phone size={16} className="text-red-500" />;
      case 'article':
        return <BookOpen size={16} className="text-blue-500" />;
      case 'video':
        return <Video size={16} className="text-purple-500" />;
      case 'exercise':
        return <Dumbbell size={16} className="text-green-500" />;
      default:
        return <ExternalLink size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Mental Health Resources</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className="input pl-10"
            />
          </div>
          
          <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                activeCategory === null
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              All
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {filteredResources.length > 0 ? (
            <div className="space-y-3">
              {filteredResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {getCategoryIcon(resource.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-700 dark:text-primary-400 flex items-center">
                        {resource.title}
                        <ExternalLink size={14} className="ml-1 opacity-70" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No resources found matching your search.</p>
              <p className="text-sm mt-1">Try different keywords or categories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;