
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  auth, 
  db,
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  googleProvider,
  onAuthStateChanged,
  doc,
  setDoc,
  serverTimestamp
} from '../firebase';

const DOMAINS = ['DSA', 'Web Development', 'Core CS', 'Electronics', 'Mechanical', 'Civil', 'General'];
const YEAR_OPTIONS = [
  { value: 1, label: '1st Year' },
  { value: 2, label: '2nd Year' },
  { value: 3, label: '3rd Year' },
  { value: 4, label: '4th Year' }
];

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'CSE',
    section: 'General',
    password: '',
    year: 0 // 0 is invalid state
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/');
    });
    return () => unsubscribe();
  }, [navigate]);

  const deriveRole = (year: number) => {
    return year === 1 ? 'junior' : 'senior';
  };

  const saveUserProfile = async (firebaseUser: any) => {
    if (formData.year === 0) throw new Error("Academic Year is required.");

    const role = deriveRole(formData.year);
    const yearLabel = YEAR_OPTIONS.find(y => y.value === formData.year)?.label || '';

    const profile = {
      uid: firebaseUser.uid,
      name: formData.name || firebaseUser.displayName || 'New Member',
      email: firebaseUser.email,
      branch: formData.branch,
      section: formData.section, // This is the user's Domain
      year: formData.year,
      yearLabel: yearLabel,
      role: role,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), profile);
    localStorage.setItem('user_profile', JSON.stringify(profile));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.year === 0) {
      setError("Please select your academic year.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      await saveUserProfile(userCredential.user);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (formData.year === 0) {
      setError("Select Academic Year before signing up with Google.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserProfile(result.user);
      navigate('/');
    } catch (err: any) {
      setError('Google Sign-Up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex flex-col items-center py-12 px-6 fade-in">
      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-10 md:p-16 flex flex-col border border-slate-100">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Profile</h1>
          <p className="text-slate-400 text-lg font-bold">Your academic year controls who you can help and learn from.</p>
        </header>

        {error && (
          <div className="w-full bg-red-50 text-red-600 p-4 rounded-2xl mb-8 text-[11px] font-bold border border-red-100 text-center">
            {error}
          </div>
        )}

        <div className="mb-10 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-6">Step 1: Select Current Academic Year</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {YEAR_OPTIONS.map((y) => (
                <button 
                  key={y.value}
                  type="button"
                  onClick={() => setFormData({...formData, year: y.value})}
                  className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                    formData.year === y.value 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                      : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
            {formData.year > 0 && (
              <p className="mt-4 text-center text-xs font-black text-blue-600 uppercase tracking-widest">
                Derived Role: {deriveRole(formData.year)}
              </p>
            )}
        </div>

        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3">Full Name</label>
            <input 
              type="text" required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3">Email</label>
            <input 
              type="email" required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3">Expert Domain</label>
            <select 
              value={formData.section}
              onChange={(e) => setFormData({...formData, section: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-500 cursor-pointer"
            >
              {DOMAINS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3">Password</label>
            <input 
              type="password" required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-500"
            />
          </div>

          <div className="md:col-span-2 mt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-xl disabled:opacity-70 uppercase text-xs tracking-widest active:scale-95"
            >
              {loading ? 'Processing...' : 'Complete Signup'}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px bg-slate-100 flex-grow"></div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or</span>
              <div className="h-px bg-slate-100 flex-grow"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-4 active:scale-95 text-xs uppercase tracking-widest shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Quick Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
