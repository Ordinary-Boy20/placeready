
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc } from '../firebase';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }
      loadProfile(user.uid);
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadProfile = async (uid: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'users', uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (err) {
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-black uppercase text-slate-300">Syncing Identity...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      <div className="h-64 bg-slate-900 relative"></div>
      <div className="max-w-5xl mx-auto px-8 -mt-32">
        <div className="bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="w-40 h-40 bg-slate-50 rounded-[48px] flex items-center justify-center text-5xl font-black text-slate-300">
              {profile?.name?.charAt(0)}
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 mb-2">{profile?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {profile?.yearLabel} {profile?.role}
                </span>
                <span className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Expert Domain: {profile?.section}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Academic Status</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Year Level (Fixed)</p>
                  <p className="font-bold text-slate-900">{profile?.yearLabel}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Derived Role</p>
                  <p className="font-bold text-slate-900 capitalize">{profile?.role}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Verification Context</h3>
               <p className="text-slate-600 font-medium italic leading-relaxed">
                 Access is limited based on hierarchy rules. As a {profile?.yearLabel} {profile?.role}, 
                 you {profile?.role === 'senior' ? `can answer juniors from Year 1-${profile.year - 1} in ${profile.section}.` : 'can ask questions for seniors to answer.'}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
