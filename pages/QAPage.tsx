
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase';
import { Question, Answer } from '../types';

const DOMAINS = ['DSA', 'Web Development', 'Core CS', 'Electronics', 'Mechanical', 'Civil', 'General'];

const QAPage: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newSection, setNewSection] = useState('General');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
        return;
      }
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const loadData = () => {
      const qData = localStorage.getItem('placeready_v3_questions');
      const aData = localStorage.getItem('placeready_v3_answers');
      
      const defaultQuestions: Question[] = [
        { id: 'q1', text: "Best resources for B-Trees in DBMS?", section: 'Core CS', category: 'Tech', authorId: 'u1', authorName: 'Arjun', authorRole: 'Junior', askedByYear: 1, timestamp: '2h ago' },
        { id: 'q2', text: "Should I focus on Verilog for core roles?", section: 'Electronics', category: 'Tech', authorId: 'u2', authorName: 'Sanya', authorRole: 'Junior', askedByYear: 1, timestamp: '4h ago' },
      ];

      const defaultAnswers: Answer[] = [
        { id: 'a1', questionId: 'q1', text: "Navathe book is great for DBMS internals.", authorId: 's6', authorName: 'Ishita Roy', authorRole: 'Senior', authorCompany: 'Amazon', authorYear: 3, timestamp: '1h ago', isVerified: true },
      ];

      setQuestions(qData ? JSON.parse(qData) : defaultQuestions);
      setAnswers(aData ? JSON.parse(aData) : defaultAnswers);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !userProfile) return;

    const newQ: Question = {
      id: `q_${Date.now()}`,
      text: newQuestion,
      section: newSection,
      category: 'General',
      authorId: userProfile.uid,
      authorName: userProfile.name,
      authorRole: userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1),
      askedByYear: userProfile.year, // Persist asker's year level
      timestamp: 'Just now'
    };

    const updated = [newQ, ...questions];
    localStorage.setItem('placeready_v3_questions', JSON.stringify(updated));
    setQuestions(updated);
    setNewQuestion('');
  };

  const getHierarchyStatus = (q: Question) => {
    if (!userProfile) return { allowed: false, message: 'Login required' };
    if (userProfile.role === 'admin') return { allowed: true, message: '' };
    
    // RULE: Only Seniors can answer
    if (userProfile.role !== 'senior') {
      return { allowed: false, message: 'Only seniors can provide verified answers.' };
    }

    // RULE: senior.year > junior.year
    const isHigherYear = userProfile.year > q.askedByYear;
    // RULE: same domain
    const isSameDomain = userProfile.section === q.section;

    if (!isHigherYear) return { allowed: false, message: 'You can only answer juniors from lower years.' };
    if (!isSameDomain) return { allowed: false, message: `Domain Mismatch. You can only answer in ${userProfile.section}.` };

    return { allowed: true, message: '' };
  };

  const handlePostAnswer = (qId: string) => {
    const q = questions.find(item => item.id === qId);
    if (!q) return;

    const status = getHierarchyStatus(q);
    if (!status.allowed) {
      alert(status.message);
      return;
    }

    const text = prompt("Enter your expert advice:");
    if (!text) return;

    const newA: Answer = {
      id: `a_${Date.now()}`,
      questionId: qId,
      text,
      authorId: userProfile.uid,
      authorName: userProfile.name,
      authorRole: 'Senior',
      authorCompany: userProfile.currentCompany || 'Placement Hub',
      authorYear: userProfile.year,
      timestamp: 'Just now',
      isVerified: true
    };

    const updated = [...answers, newA];
    localStorage.setItem('placeready_v3_answers', JSON.stringify(updated));
    setAnswers(updated);
  };

  if (loading) return <div className="p-20 text-center font-black uppercase text-slate-300">Loading hierarchy...</div>;

  return (
    <div className="bg-[#f3f7fb] min-h-screen pb-32">
      {/* Hero Header */}
      <div className="pt-20 pb-28 px-8 text-center bg-white border-b border-slate-100">
        <h1 className="text-6xl font-black text-[#1e2b4b] mb-4 tracking-tighter">Campus Q&A</h1>
        <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">
          Hierarchy-protected discussions. Seniors (Years 2-4) guide Juniors (Year 1) in their respective domains.
        </p>
        
        {/* Post Question Box - Available for All */}
        <div className="max-w-[1400px] mx-auto mt-16 bg-slate-50 rounded-[48px] p-10 border-2 border-slate-100 shadow-xl shadow-blue-900/5">
          <div className="flex items-center justify-between mb-8">
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Start a new thread</span>
             <select 
               value={newSection}
               onChange={(e) => setNewSection(e.target.value)}
               className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-xs outline-none"
             >
               {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
             </select>
          </div>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="What's your placement query?"
            className="w-full p-8 text-2xl font-bold bg-white rounded-3xl border border-slate-100 outline-none resize-none h-40"
          />
          <button 
            onClick={handlePostQuestion}
            className="mt-8 bg-slate-900 text-white px-16 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl"
          >
            Post Inquiry
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-[1600px] mx-auto px-10 mt-20 space-y-16">
        {questions.map(q => {
          const qAnswers = answers.filter(a => a.questionId === q.id);
          const status = getHierarchyStatus(q);
          
          return (
            <div key={q.id} className="bg-white rounded-[64px] p-16 shadow-2xl shadow-blue-900/[0.03] border border-slate-50 transition-all">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-3xl">
                    {q.authorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{q.authorName}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full">
                        {q.askedByYear === 1 ? '1st Year Junior' : `${q.askedByYear}th Year Senior`}
                      </span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{q.section} Domain</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{q.timestamp}</div>
              </div>

              <p className="text-4xl font-black text-slate-800 mb-16 tracking-tight leading-tight">{q.text}</p>

              <div className="space-y-12 border-t border-slate-50 pt-16">
                {qAnswers.map(ans => (
                  <div key={ans.id} className="pl-12 border-l-4 border-slate-100 py-2">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
                      Verified Guidance • {ans.authorName} ({ans.authorYear}th Year Senior)
                    </p>
                    <p className="text-xl font-bold text-slate-600 leading-relaxed">{ans.text}</p>
                  </div>
                ))}

                {/* Answer Permissions Check */}
                <div className="pt-8">
                  {status.allowed ? (
                    <button 
                      onClick={() => handlePostAnswer(q.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95"
                    >
                      Provide Guidance
                    </button>
                  ) : userProfile?.role === 'senior' ? (
                    <div className="bg-rose-50 border border-rose-100 p-8 rounded-[40px] text-center">
                      <p className="text-rose-500 font-black uppercase text-xs tracking-widest">
                        Hierarchy Restricted: {status.message}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QAPage;
