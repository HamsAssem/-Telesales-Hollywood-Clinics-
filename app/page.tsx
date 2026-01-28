'use client';

import { useState } from 'react';
import { TelesalesForm } from '@/components/telesales-form';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6">
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                language === 'ar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        {/* Form */}
        <TelesalesForm language={language} />
      </div>
    </main>
  );
}
