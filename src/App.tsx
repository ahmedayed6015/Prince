import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, ShieldCheck, MessageCircle, X, Send, Lock, ShieldAlert, Download, ClipboardList, CheckCircle2, Bell } from 'lucide-react';

export default function App() {
  const prizes = ["350,000", "400,000", "500,000", "750,000", "1,000,000", "1,500,000"];
  const [prize, setPrize] = useState("");
  
  const names = ["John", "Michael", "Sarah", "Emma", "David", "Olivia", "James", "Sophia", "Robert", "Isabella", "William", "Mia", "Richard", "Charlotte", "Thomas", "Amelia"];
  const countries = ["USA", "UK", "Canada", "Australia", "New Zealand", "Ireland"];
  const notificationPrizes = ["350,000", "400,000", "500,000", "750,000"];

  interface Notification {
    id: number;
    name: string;
    country: string;
    amount: string;
  }

  interface Message {
    id: number;
    text: string;
    time: string;
    sender: 'bot' | 'user';
  }

  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLinkButton, setShowLinkButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const simulationStarted = useRef(false);

  const profileImage = "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/648388936_2322973091545228_8114416765090569899_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=SMFLECZEs9wQ7kNvwHyLRWq&_nc_oc=AdkslPmXANgleL97CPDZBTK5UKT6bmZIWCaDMFUeJhKSsoDDCbZF8L3CZdKX-SP8wm8&_nc_zt=23&_nc_ht=scontent.fcai19-5.fna&_nc_gid=TjcR7yfInRgmf0TKiUtxpw&_nc_ss=8&oh=00_AfwH3n91prv9JYd05l7ZF0SNx1kaoBkFQPel6QU1rcA9rA&oe=69B378DD";

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showLinkButton]);

  useEffect(() => {
    if (!isChatOpen || !prize || simulationStarted.current) return;
    simulationStarted.current = true;

    const runChat = async () => {
      const addMsg = async (text: string, delay: number) => {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, delay));
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now(), text, time: getCurrentTime(), sender: 'bot' }]);
        await new Promise(r => setTimeout(r, 400));
      };

      await new Promise(r => setTimeout(r, 500));
      await addMsg("Hello and welcome! ✋", 800);
      await addMsg(`Congratulations! I am pleased to inform you that you have been randomly selected among the lucky winners of a grand cash prize of $${prize} 🎉`, 1500);
      await addMsg("To receive the prize in your bank account, please follow these simple and verified steps:", 1000);
      await addMsg("1️⃣ Click on the link below.\n2️⃣ Complete a quick survey or download a free app.\n3️⃣ Run the app for 5 minutes to verify you are human.\n\nAfter confirmation, the amount will be transferred immediately.", 2000);
      
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 800));
      setIsTyping(false);
      setShowLinkButton(true);
    };

    runChat();
  }, [isChatOpen, prize]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, time: getCurrentTime(), sender: 'user' }]);

    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsTyping(false);

    const replyText = "Dear winner, please follow the steps via the link below to verify your identity and receive your prize immediately.";
    setMessages(prev => [...prev, { id: Date.now(), text: replyText, time: getCurrentTime(), sender: 'bot' }]);
    setShowLinkButton(true);
  };

  useEffect(() => {
    const showRandomNotification = () => {
      setCurrentNotification({
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        amount: notificationPrizes[Math.floor(Math.random() * notificationPrizes.length)]
      });
      setTimeout(() => setCurrentNotification(null), 4000);
    };

    const initialTimeout = setTimeout(showRandomNotification, 5000);
    const interval = setInterval(showRandomNotification, 12000);
    return () => { clearTimeout(initialTimeout); clearInterval(interval); };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans overflow-x-hidden pb-24 selection:bg-amber-500/30">
      {/* Header */}
      <header className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-amber-500 w-6 h-6" />
            <span className="font-serif font-bold text-xl text-white tracking-wide">VIP Rewards</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            <Lock className="w-3 h-3" />
            <span className="uppercase tracking-wider text-[10px]">Secure</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Profile Section */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-2xl shadow-amber-500/20">
              <img 
                src={profileImage} 
                alt="Prince Sultan" 
                className="w-full h-full rounded-full object-cover border-4 border-[#050505]"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-amber-500 text-[11px] font-bold px-4 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-lg whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Online
            </div>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-2">
            Prince Sultan
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500 fill-current" aria-label="Verified account">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path>
            </svg>
          </h1>
        </motion.div>

        {/* Prize Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full bg-[#111] rounded-3xl p-8 shadow-2xl border border-white/5 text-center relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-600"></div>
          
          <h2 className="text-lg font-serif text-slate-400 mb-4">
            You have been selected to receive
          </h2>
          
          <div className="mb-6">
            <span className="block text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600">
              <span className="text-3xl text-amber-500 align-top mr-1">$</span>{prize}
            </span>
          </div>
          
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Your funds are ready for transfer. Please verify your identity to claim your exclusive reward.
          </p>

          <button 
            onClick={() => setShowVerificationModal(true)}
            className="group relative flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-lg py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] gap-2"
          >
            <Gift className="w-6 h-6" />
            Claim Reward
          </button>
          
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Officially Verified</span>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <h3 className="text-xl font-serif font-bold text-white mb-6 text-center">Verification Process</h3>
          
          <div className="space-y-4">
            {[
              { icon: ClipboardList, title: "Select an Offer", desc: "Choose to complete a quick survey or download a sponsored app." },
              { icon: Download, title: "Complete Verification", desc: "Run the downloaded app for 5 minutes or finish the survey." },
              { icon: CheckCircle2, title: "Receive Funds", desc: "The prize will be transferred immediately upon completion." }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-5 bg-[#111] p-5 rounded-2xl border border-white/5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-amber-500 text-black rounded-full flex items-center justify-center shadow-xl shadow-amber-500/20 z-40"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-[#050505] rounded-full animate-pulse"></span>
        </motion.button>
      )}

      {/* Live Notifications */}
      <div className="fixed bottom-24 left-0 right-0 z-30 flex justify-center pointer-events-none px-4">
        <AnimatePresence>
          {currentNotification && !isChatOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              className="bg-[#111] border border-white/10 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm w-full pointer-events-auto"
            >
              <div className="bg-amber-500/10 p-2.5 rounded-full shrink-0 text-amber-500 border border-amber-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {currentNotification.name} <span className="text-slate-500 font-normal text-xs">from {currentNotification.country}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1 truncate">
                  just received <span className="text-amber-500 font-bold">${currentNotification.amount}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
          >
            <header className="bg-[#111] border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-[#111] rounded-full"></span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm flex items-center gap-1">
                    Prince Sultan
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-500 fill-current" aria-label="Verified account">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"></path>
                    </svg>
                  </h2>
                  <p className="text-amber-500 text-[11px] font-medium">
                    {isTyping ? 'typing...' : 'Online Now'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#050505]">
              <div className="text-center my-2">
                <span className="bg-white/5 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full border border-white/5">
                  Today
                </span>
              </div>

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 items-end ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.sender === 'bot' && (
                      <img src={profileImage} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm border border-white/10" />
                    )}
                    <div className={`p-3.5 shadow-sm max-w-[80%] relative ${
                      msg.sender === 'user' 
                        ? 'bg-amber-500 text-black rounded-2xl rounded-br-sm' 
                        : 'bg-[#1a1a1a] text-slate-200 rounded-2xl rounded-bl-sm border border-white/5'
                    }`}>
                      <p className="text-[14px] leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                      <div className={`flex items-center gap-1 mt-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[10px] ${msg.sender === 'user' ? 'text-black/60' : 'text-slate-500'}`}>{msg.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 items-end"
                >
                  <img src={profileImage} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm border border-white/10" />
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3.5 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </motion.div>
              )}

              {showLinkButton && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mt-2 flex justify-center w-full"
                >
                  <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl text-center">
                    <h3 className="text-2xl font-serif font-bold text-amber-500 mb-5">
                      ${prize}
                    </h3>
                    <button 
                      onClick={() => setShowVerificationModal(true)}
                      className="block w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl shadow-sm transition-colors"
                    >
                      Click here to claim your prize
                    </button>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-2" />
            </div>

            <div className="bg-[#111] p-3 shrink-0 border-t border-white/5">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-2xl mx-auto">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#222] text-white rounded-full px-5 py-3.5 outline-none border border-white/5 focus:border-amber-500/50 transition-colors shadow-sm text-sm placeholder:text-slate-500"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-amber-500 text-black w-12 h-12 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                <ShieldAlert className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white text-center mb-3">
                Verification Required
              </h3>
              
              <p className="text-slate-400 text-center text-sm mb-8 leading-relaxed">
                We couldn't verify that you are human. Please complete an offer by clicking here, by downloading an app and running it for 5 minutes, or by completing a survey.
              </p>
              
              <a 
                href="https://smrturl.co/7e74738"
                className="block w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-center py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
              >
                Verify Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
