'use client';

import { useState, useEffect } from 'react';
import { Mail, Users, Send, Download, Calendar, LogOut } from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';

interface Subscriber {
  email: string;
  subscribedAt: string;
  ipAddress?: string;
}

export default function NewsletterAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Newsletter form state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        setAuthenticated(true);
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        credentials: 'include',
      });
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAuthenticated = () => {
    setAuthenticated(true);
    setCheckingAuth(false);
    fetchSubscribers();
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        credentials: 'include',
      });
      const data = await response.json();
      setSubscribers(data.subscribers || []);
      setTotalSubscribers(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    setSending(true);
    setSendStatus('idle');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          subject,
          message,
          recipients: subscribers.map(s => s.email)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSendStatus('success');
        setSubject('');
        setMessage('');
        
        // Show detailed success message
        if (result.failedCount > 0) {
          alert(`Newsletter sent with some issues:\n✅ ${result.sentCount} delivered successfully\n❌ ${result.failedCount} failed\n📧 Total: ${result.totalCount}`);
        } else {
          alert(`🎉 Newsletter sent successfully to all ${result.sentCount} subscribers!`);
        }
      } else {
        setSendStatus('error');
        const errorData = await response.json();
        alert(`Failed to send newsletter: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setSendStatus('error');
      console.error('Failed to send newsletter:', error);
    } finally {
      setSending(false);
    }
  };

  const exportSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/export?format=csv', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to export subscribers');
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onAuthenticated={handleAuthenticated} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Admin</h1>
              <p className="text-gray-600">Manage your newsletter subscribers and send campaigns</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">{totalSubscribers}</div>
                <div className="text-sm text-gray-600">Subscribers</div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Newsletter */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Send Newsletter</h2>
            </div>

            <form onSubmit={handleSendNewsletter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., New UI Kit Available!"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  placeholder="Write your newsletter content here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  disabled={sending}
                />
              </div>

              <button
                type="submit"
                disabled={sending || totalSubscribers === 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send to {totalSubscribers} subscriber{totalSubscribers !== 1 ? 's' : ''}
                  </>
                )}
              </button>

              {sendStatus === 'success' && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg text-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <strong>Newsletter sent successfully!</strong>
                  </div>
                  <p className="text-xs text-green-600">
                    Your newsletter has been delivered to all subscribers. Check the terminal for detailed sending statistics.
                  </p>
                </div>
              )}

              {sendStatus === 'error' && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg text-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <strong>Failed to send newsletter</strong>
                  </div>
                  <p className="text-xs text-red-600">
                    Please check your internet connection and try again. If the problem persists, check the terminal for error details.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Subscribers List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Subscribers</h2>
              </div>
              <button
                onClick={exportSubscribers}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No subscribers yet</p>
                <p className="text-sm text-gray-400">Subscribers will appear here when people sign up</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subscribers.map((subscriber, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium">{subscriber.email}</span>
                        {subscriber.ipAddress && (
                          <div className="text-xs text-gray-500">IP: {subscriber.ipAddress}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🔒 Admin Panel Security</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p>• <strong>Protected Access:</strong> Password + IP restriction enabled</p>
            <p>• <strong>Session Security:</strong> Auto-logout after 24 hours</p>
            <p>• <strong>Monitoring:</strong> All access attempts are logged</p>
            <p>• <strong>URL:</strong> <code className="bg-green-100 px-2 py-1 rounded">/admin/newsletter</code> (keep this URL private)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
