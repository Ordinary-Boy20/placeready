
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db, onAuthStateChanged, doc, getDoc } from '../firebase';
import { User } from '../types';

const SeniorProfilePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [senior, setSenior] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeniorProfile = async (targetId: string | undefined) => {
      setLoading(true);
      setError('');
      
      if (!targetId) {
        // If no ID provided, try to get current user ID
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            await loadProfile(user.uid);
          } else {
            setError('Please sign in to view your profile.');
            setLoading(false);
          }
        });
        return () => unsubscribe();
      } else {
        await loadProfile(targetId);
      }
    };

    const loadProfile = async (targetId: string) => {
      // Mocking verified seniors database used across the entire app
      const mockSeniors: Record<string, User> = {
        's1': {
          id: 's1',
          name: 'Rahul Sharma',
          email: '', 
          branch: 'CSE',
          skills: ['DSA', 'Graphs', 'Java'],
          role: 'senior',
          college: 'IIT Bombay',
          graduationYear: 2024,
          currentCompany: 'Google',
          bio: 'Loves solving complex graph problems. Placed at Google through campus placements.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's2': {
          id: 's2',
          name: 'Priya Malhotra',
          email: '',
          branch: 'IT',
          skills: ['React', 'System Design'],
          role: 'senior',
          college: 'NIT Trichy',
          graduationYear: 2024,
          currentCompany: 'Microsoft',
          bio: 'Web dev enthusiast and coding mentor. Always happy to help juniors.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's3': {
          id: 's3',
          name: 'Amit Kumar',
          email: '',
          branch: 'ECE',
          skills: ['Embedded Systems', 'C++'],
          role: 'senior',
          college: 'BITS Pilani',
          graduationYear: 2023,
          currentCompany: 'Qualcomm',
          bio: 'Hardware lover turned software engineer. Focused on low-level optimization.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's4': {
          id: 's4',
          name: 'Ananya Pandey',
          email: '',
          branch: 'CSE',
          skills: ['Soft Skills', 'Product Management'],
          role: 'senior',
          college: 'DTU',
          graduationYear: 2023,
          currentCompany: 'Adobe',
          bio: 'Bridging the gap between engineering and product. HR round specialist.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's5': {
          id: 's5',
          name: 'Rohan Gupta',
          email: '',
          branch: 'IT',
          skills: ['SQL', 'DBMS', 'Backend'],
          role: 'senior',
          college: 'VIT Vellore',
          graduationYear: 2024,
          currentCompany: 'Oracle',
          bio: 'Database geek. I can talk about indexing and normalization all day.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's6': {
          id: 's6',
          name: 'Ishita Roy',
          email: '',
          branch: 'CSE',
          skills: ['DSA', 'Python'],
          role: 'senior',
          college: 'BITS Pilani',
          graduationYear: 2023,
          currentCompany: 'Amazon',
          bio: 'Passionate about algorithms and data science. Cracked Amazon OA in one go.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        },
        's7': {
          id: 's7',
          name: 'Vikram Lal',
          email: '',
          branch: 'CSE',
          skills: ['Coding', 'Competitive Programming'],
          role: 'senior',
          college: 'NSUT',
          graduationYear: 2024,
          currentCompany: 'Uber',
          bio: 'Ex-Competitive Programmer. Focus on problem solving speed.',
          linkedinUrl: 'https://linkedin.com',
          isVerified: true
        }
      };

      const mockData = mockSeniors[targetId];
      
      if (mockData) {
        setSenior(mockData);
      } else {
        // Attempt to fetch from Firestore for real users
        try {
          const docRef = doc(db, 'users', targetId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSenior(docSnap.data());
          } else {
            setError('Profile not found.');
          }
        } catch (e) {
          setError('Failed to load profile.');
        }
      }
      setLoading(false);
    };

    fetchSeniorProfile(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center fade-in">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching verified profile...</p>
      </div>
    );
  }

  if (error || !senior) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center fade-in">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 text-3xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Unavailable</h2>
        <p className="text-gray-500 max-w-md mb-8">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff] py-16 px-6 fade-in">
      <div className="max-w-xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-blue-600 font-bold transition-colors group mb-8"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="px-10 pb-12 -mt-16 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-xl mb-6">
              <div className="w-full h-full bg-blue-100 rounded-2xl flex items-center justify-center text-4xl font-black text-blue-600">
                {senior.name?.charAt(0) || '?'}
              </div>
            </div>

            {/* Verification Badge */}
            {(senior.isVerified || senior.role === 'senior') && (
              <div className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified {senior.role === 'senior' ? 'Senior' : 'User'}</span>
              </div>
            )}

            <h1 className="text-3xl font-black text-gray-900 mb-2">{senior.name}</h1>
            <p className="text-blue-600 font-bold text-lg mb-8">
              {senior.currentCompany || (senior.role === 'senior' ? 'Placement Intern' : 'Campus Explorer')}
            </p>

            <div className="w-full space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">College</p>
                  <p className="text-gray-800 font-bold leading-tight">{senior.college || 'GNDEC Ludhiana'}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Graduation</p>
                  <p className="text-gray-800 font-bold leading-tight">Class of {senior.graduationYear || '2025'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Branch</p>
                <p className="text-gray-800 font-bold leading-tight">{senior.branch || 'CSE'}</p>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">About Me</p>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-50">
                  <p className="text-gray-600 leading-relaxed text-sm italic">
                    "{senior.bio || 'Aspiring professional navigating the campus placement journey.'}"
                  </p>
                </div>
              </div>

              {senior.linkedinUrl && (
                <a 
                  href={senior.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#0077b5] hover:bg-[#005582] text-white text-center font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>View LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
          All profiles are verified by PlaceReady admins to ensure authenticity.
        </p>
      </div>
    </div>
  );
};

export default SeniorProfilePage;
