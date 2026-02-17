import React, { useState } from 'react';

const languages = [
  { code: 'en', name: 'English (US)', flag: 'https://flagcdn.com/us.svg' },
  { code: 'es', name: 'Spanish', flag: 'https://flagcdn.com/es.svg' },
  { code: 'fr', name: 'French', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'de', name: 'German', flag: 'https://flagcdn.com/de.svg' },
  { code: 'hi', name: 'Hindi', flag: 'https://flagcdn.com/in.svg' },
  { code: 'zh', name: 'Chinese', flag: 'https://flagcdn.com/cn.svg' },
  { code: 'ja', name: 'Japanese', flag: 'https://flagcdn.com/jp.svg' },
  { code: 'it', name: 'Italian', flag: 'https://flagcdn.com/it.svg' },
  { code: 'pt', name: 'Portuguese', flag: 'https://flagcdn.com/pt.svg' },
  { code: 'ru', name: 'Russian', flag: 'https://flagcdn.com/ru.svg' },
];

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [loading, setLoading] = useState(false);

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText('');
  };

  const translateText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      const promptText = `Translate from ${
        languages.find(l => l.code === sourceLanguage)?.name
      } to ${
        languages.find(l => l.code === targetLanguage)?.name
      }: ${inputText}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=YOUR_API_KEY`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 200 }
          })
        }
      );

      const data = await response.json();

      const result =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Translation failed';

      setTranslatedText(result);

    } catch (error) {
      console.error('Translation Error:', error);
      setTranslatedText('Error occurred while translating');
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <div className="p-8 w-full max-w-4xl bg-white text-black shadow-2xl rounded-2xl overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">Translator</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <img
              src={languages.find(l => l.code === sourceLanguage)?.flag}
              alt="Flag"
              className="w-6 h-6"
            />
            <select
              className="border p-2 rounded-lg"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button className="text-2xl p-2" onClick={swapLanguages}>
            ↔️
          </button>

          <div className="flex items-center gap-2">
            <img
              src={languages.find(l => l.code === targetLanguage)?.flag}
              alt="Flag"
              className="w-6 h-6"
            />
            <select
              className="border p-2 rounded-lg"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          className="w-full p-3 border rounded-lg mb-4 h-40"
          placeholder="Write your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          onClick={translateText}
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {translatedText && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 overflow-y-auto max-h-80">
            <h2 className="font-semibold mb-2">Translated Text:</h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
