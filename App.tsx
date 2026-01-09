
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from './firebase';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import HomePage from './pages/HomePage';
import SeniorHubPage from './pages/SeniorHubPage';
import SeniorGuidelinesPage from './pages/SeniorGuidelinesPage';
import QAPage from './pages/QAPage';
import CompanyInsightsPage from './pages/CompanyInsightsPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import ReadinessPage from './pages/ReadinessPage';
import SeniorProfilePage from './pages/SeniorProfilePage';
import ProfilePage from './pages/ProfilePage';
import SeniorMistakesPage from './pages/SeniorMistakesPage';
import SubmitMistakePage from './pages/SubmitMistakePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SeniorLearningsPage from './pages/SeniorLearningsPage';
import SubmitLearningPage from './pages/SubmitLearningPage';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  
  const isAuthPage = ['/login', '/signup', '/admin-login'].includes(location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const cachedProfile = localStorage.getItem('user_profile');
        if (cachedProfile) {
          setUser(JSON.parse(cachedProfile));
        } else {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const profile = docSnap.data();
            setUser(profile);
            localStorage.setItem('user_profile', JSON.stringify(profile));
          } else {
            setUser({
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              role: 'junior',
              yearLabel: '1st Year'
            });
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem('user_profile');
      }
    });

    const handleStorageChange = () => {
      const profile = localStorage.getItem('user_profile');
      setUser(profile ? JSON.parse(profile) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_profile');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 px-10 py-8 flex items-center justify-between">
      <Link to="/" className="text-3xl font-black text-black tracking-tighter flex items-center group transition-transform active:scale-95">
        <span className="text-blue-600 mr-2">•</span> PlaceReady
      </Link>
      
      <div className="hidden md:flex items-center space-x-10">
        <Link to="/" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-blue-600">Home</Link>
        <Link to="/readiness" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-blue-600">Eligibility</Link>
        <Link to="/companies" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-blue-600">Companies</Link>
        <Link to="/seniors" className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-blue-600">Senior Hub</Link>
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <div className="flex items-center space-x-8">
            <Link to="/profile" className="text-right hidden sm:block hover:opacity-70 transition-all active:scale-95 group">
              <p className="text-sm font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors">{user.name}</p>
              <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mt-1.5 ${
                user.role === 'junior' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {user.yearLabel} {user.role === 'junior' ? 'Junior' : 'Senior'}
              </span>
            </Link>
            <button onClick={handleLogout} className="text-sm font-black uppercase tracking-widest text-rose-500 hover:text-rose-600">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/signup" className="text-sm font-black uppercase tracking-widest text-slate-500">Sign Up</Link>
            <Link to="/login" className="bg-slate-900 text-white text-sm font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-blue-600 shadow-xl shadow-slate-200">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/readiness" element={<ReadinessPage />} />
            <Route path="/companies" element={<CompanyInsightsPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            <Route path="/seniors" element={<SeniorHubPage />} />
            <Route path="/seniors/learnings" element={<SeniorLearningsPage />} />
            <Route path="/seniors/learnings/submit" element={<SubmitLearningPage />} />
            <Route path="/seniors/qa" element={<QAPage />} />
            <Route path="/seniors/mistakes" element={<SeniorMistakesPage />} />
            <Route path="/seniors/mistakes/submit" element={<SubmitMistakePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/seniors/profile/:id" element={<SeniorProfilePage />} />
            <Route path="/seniors/guidelines" element={<SeniorGuidelinesPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
