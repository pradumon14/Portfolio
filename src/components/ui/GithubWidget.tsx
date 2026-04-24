import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, ArrowRight, Star, Mail, X } from "lucide-react";

/**
 * GithubWidget Component
 * 
 * A sleek, morphing widget that displays a quick overview of a GitHub profile.
 * When clicked, it expands into a full-screen "Dossier" showing repos,
 * top languages, and recent activity.
 */
export function GithubWidget() {
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [githubData, setGithubData] = useState<any>({
    followers: 0,
    public_repos: 0,
    login: "pradumon14",
    avatar_url: "https://avatars.githubusercontent.com/u/192296069?v=4"
  });
  
  const [detailedData, setDetailedData] = useState<{
    repos: any[];
    events: any[];
    isLoading: boolean;
  }>({
    repos: [],
    events: [],
    isLoading: false
  });

  // Fetch basic profile on mount
  useEffect(() => {
    fetch('https://api.github.com/users/pradumon14')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(data?.login) setGithubData(data);
      })
      .catch(err => console.error("Error fetching GitHub profile:", err));
  }, []);

  // Fetch detailed info specifically when the dossier is opened
  const fetchDetailedStats = async () => {
    if (detailedData.repos.length > 0) return;
    
    setDetailedData(prev => ({ ...prev, isLoading: true }));
    try {
      const [reposRes, eventsRes] = await Promise.all([
        fetch('https://api.github.com/users/pradumon14/repos?per_page=100&sort=updated'),
        fetch('https://api.github.com/users/pradumon14/events/public?per_page=10')
      ]);
      
      const repos = await reposRes.json();
      const events = await eventsRes.json();
      
      setDetailedData({
        repos: Array.isArray(repos) ? repos : [],
        events: Array.isArray(events) ? events : [],
        isLoading: false
      });
    } catch (err) {
      console.error("Error fetching deep GitHub stats:", err);
      setDetailedData(prev => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Process repositories to aggregate stars and languages
   */
  const dossierStats = useMemo(() => {
    if (!detailedData.repos.length) return null;
    
    const totalStars = detailedData.repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const languagesMap: { [key: string]: number } = {};
    
    detailedData.repos.forEach(repo => {
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
      }
    });
    
    const topLanguages = Object.entries(languagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / (detailedData.repos.length || 1)) * 100)
      }));

    return { totalStars, topLanguages };
  }, [detailedData.repos]);

  const handleOpenDossier = () => {
    setIsDossierOpen(true);
    fetchDetailedStats();
  };

  return (
    <>
      <div 
        onClick={handleOpenDossier}
        className="inline-flex items-center gap-4 bg-white/[0.03] border border-white/10 p-2 pr-6 rounded-full hover:bg-white/[0.05] hover:border-brand-primary/30 transition-all group w-fit cursor-pointer active:scale-95"
      >
        <div className="relative">
          <img src={githubData.avatar_url} alt={githubData.login} className="w-10 h-10 rounded-full border border-white/10" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white group-hover:text-[#ff4d00] transition-colors flex items-center gap-2">
            @{githubData.login}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
            {githubData.public_repos || '...'} Repos • {githubData.followers || '...'} Followers
          </span>
        </div>
        <div className="ml-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ff4d00]/10 group-hover:border-[#ff4d00]/30 transition-all">
          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#ff4d00] transition-transform -rotate-45 group-hover:rotate-0" />
        </div>
      </div>

      <AnimatePresence>
        {isDossierOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-auto"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsDossierOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col backdrop-blur-3xl"
            >
              {/* Simple Close */}
              <button 
                onClick={() => setIsDossierOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-30"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                {detailedData.isLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-3">
                    <div className="w-6 h-6 border-2 border-[#ff4d00] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] uppercase font-mono tracking-widest text-[#ff4d00]/60">Syncing Profile</p>
                  </div>
                ) : (
                  <>
                    {/* Header: Identity */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-center gap-6">
                        <img 
                          src={githubData.avatar_url} 
                          alt="avatar"
                          className="w-20 h-20 rounded-2xl border border-white/10 p-0.5 shadow-2xl" 
                        />
                        <div>
                          <h2 className="text-2xl font-display font-bold text-white leading-tight">
                            {githubData.name || githubData.login}
                          </h2>
                          <p className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wider">
                            @{githubData.login}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <a 
                          href={githubData.html_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-6 py-3 rounded-full bg-[#ff4d00] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#ff6a2b] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
                        >
                          Open GitHub <Github className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                        </a>
                        <button className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                          <Star className="w-4 h-4" />
                        </button>
                        <button className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Simple Stats Row */}
                    <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/5">
                      {[
                        { label: 'Repos', val: githubData.public_repos },
                        { label: 'Followers', val: githubData.followers },
                        { label: 'Impact', val: dossierStats?.totalStars || 0, accent: true }
                      ].map((s, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">{s.label}</p>
                          <p className={`text-3xl font-display font-medium ${s.accent ? 'text-[#ff4d00]' : 'text-white'}`}>
                            {s.val}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Languages & Activity */}
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">Core Stack</p>
                        <div className="space-y-4">
                          {dossierStats?.topLanguages.map((lang, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                                <span>{lang.name}</span>
                                <span>{lang.percentage}%</span>
                              </div>
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${lang.percentage}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                                  className="h-full bg-neutral-100"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">Recent Syncs</p>
                        <div className="space-y-4">
                          {detailedData.events.slice(0, 3).map((ev: any, idx: number) => (
                            <div key={idx} className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
                               <div className="flex items-start gap-4">
                                 <div className="w-1 h-1 rounded-full bg-[#ff4d00] mt-1.5 shrink-0" />
                                 <div>
                                    <p className="text-[11px] text-white leading-tight font-medium">
                                      {ev.type.replace('Event', '')}
                                    </p>
                                    <p className="text-[9px] text-neutral-500 font-mono mt-0.5">
                                      {ev.repo.name.split('/')[1]}
                                    </p>
                                 </div>
                               </div>
                               <a 
                                 href={`https://github.com/${ev.repo.name}`}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-white/5 hover:bg-[#ff4d00] hover:text-black transition-all"
                               >
                                 <ExternalLink className="w-3 h-3" />
                               </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
