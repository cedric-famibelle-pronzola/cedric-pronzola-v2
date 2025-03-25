'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mastodonModalOpen, setMastodonModalOpen] = useState(false);
  const [mastodonInstance, setMastodonInstance] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = [
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      className: "bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="22" 
          height="22" 
          viewBox="0 0 1000 1000" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="40" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M226.328419,494.722069 C372.088573,431.216685 469.284839,389.350049 517.917216,369.122161 C656.772535,311.36743 685.625481,301.334815 704.431427,301.003532 C708.567621,300.93067 717.815839,301.955743 723.806446,306.816707 C728.864797,310.92121 730.256552,316.46581 730.922551,320.357329 C731.588551,324.248848 732.417879,333.113828 731.758626,340.040666 C724.234007,419.102486 691.675104,610.964674 675.110982,699.515267 C668.10208,736.984342 654.301336,749.547532 640.940618,750.777006 C611.904684,753.448938 589.856115,731.588035 561.733393,713.153237 C517.726886,684.306416 492.866009,666.349181 450.150074,638.200013 C400.78442,605.66878 432.786119,587.789048 460.919462,558.568563 C468.282091,550.921423 596.21508,434.556479 598.691227,424.000355 C599.00091,422.680135 599.288312,417.758981 596.36474,415.160431 C593.441168,412.561881 589.126229,413.450484 586.012448,414.157198 C581.598758,415.158943 511.297793,461.625274 375.109553,553.556189 C355.154858,567.258623 337.080515,573.934908 320.886524,573.585046 C303.033948,573.199351 268.692754,563.490928 243.163606,555.192408 C211.851067,545.013936 186.964484,539.632504 189.131547,522.346309 C190.260287,513.342589 202.659244,504.134509 226.328419,494.722069 Z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      className: "bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.997 22.265h-.08a11.092 11.092 0 01-5.622-1.524l-.403-.238-4.173 1.094 1.116-4.076-.263-.416A11.066 11.066 0 011 11.997c0-6.103 4.971-11.074 11.077-11.074 2.958.001 5.736 1.154 7.824 3.245a10.94 10.94 0 013.234 7.829c-.001 6.104-4.972 11.073-11.079 11.073l-.001-.003-.058-.002zm-5.6-3.423a9.241 9.241 0 004.705 1.289h.06c5.086 0 9.22-4.136 9.222-9.222a9.203 9.203 0 00-2.707-6.526 9.196 9.196 0 00-6.515-2.707c-5.09 0-9.228 4.136-9.23 9.222a9.21 9.21 0 001.336 4.792l.208.331-.884 3.23 3.805-.999z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.101 23.691v-9.689H5.627V9.691h3.474V6.941c0-3.407 2.055-5.262 5.099-5.262 1.451 0 2.697.108 3.06.156v3.549h-2.098c-1.65 0-1.969.785-1.969 1.936v2.372h3.918l-.51 4.311h-3.408v9.688H9.101z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      className: "bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
        </svg>
      ),
    },
    {
      name: 'Bluesky',
      url: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
      className: "bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 600"
          width="20"
          height="20"
          fill="currentColor"
          className="scale-75"
        >
          <path transform="translate(0, 35)" d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"/>
        </svg>
      ),
    },
  ];

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMastodonModalOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus the input when modal opens
  useEffect(() => {
    if (mastodonModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mastodonModalOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setShowMessage(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const openMastodonModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setMastodonModalOpen(true);
  };

  const handleMastodonShare = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mastodonInstance) return;
    
    // Make sure instance has https:// prefix
    let instanceUrl = mastodonInstance;
    if (!instanceUrl.startsWith('http://') && !instanceUrl.startsWith('https://')) {
      instanceUrl = 'https://' + instanceUrl;
    }
    
    // Remove trailing slash if present
    if (instanceUrl.endsWith('/')) {
      instanceUrl = instanceUrl.slice(0, -1);
    }
    
    // Open the share URL in a new window
    window.open(`${instanceUrl}/share?text=${encodedTitle}%20${encodedUrl}`, '_blank');
    
    // Close the modal and reset the instance field
    setMastodonModalOpen(false);
    setMastodonInstance('');
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-medium mb-3">{t('share')}</h3>
      <div className="flex flex-wrap gap-2 items-center">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center p-2 rounded-full ${link.className} transition-transform hover:scale-110 shadow-md`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}

        {/* Mastodon Button */}
        <button
          onClick={openMastodonModal}
          className="inline-flex items-center justify-center p-2 rounded-full bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black transition-transform hover:scale-110 shadow-md cursor-pointer"
          aria-label="Share on Mastodon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.551-4.237-.551 0 .184.014.459.043.643.308 2.294 2.317 2.478 4.22 2.57 1.922.091 3.613-.46 3.613-.46l.087 1.736s-1.342.734-3.738.918c-1.32.091-2.958-.092-4.872-.551-4.143-1.102-4.872-5.51-4.985-10.01-.043-1.653-.014-3.213-.014-4.316 0-5.51 3.652-7.155 3.652-7.155C6.865.184 9.45.092 12.348 0h.072c2.899.092 5.484.184 7.438 1.47 0 0 3.652 1.653 3.652 7.154 0 0 .043 4.086-.367 5.29z"/>
            <path d="M17.834 7.904v4.274h-1.692V8.08c0-.868-.367-1.31-1.102-1.31-.808 0-1.218.524-1.218 1.56v2.26h-1.684V8.33c0-1.037-.404-1.56-1.211-1.56-.735 0-1.102.442-1.102 1.31v4.098h-1.693V7.904c0-.867.221-1.56.662-2.076.455-.524 1.058-.788 1.795-.788.857 0 1.51.33 1.97.982l.426.706.419-.706c.462-.652 1.114-.982 1.97-.982.738 0 1.34.264 1.795.788.442.517.663 1.21.663 2.076z" fill="currentColor"/>
          </svg>
        </button>

        {/* Copy Link Button */}
        <div className="relative inline-flex">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center justify-center p-2 rounded-full bg-gray-800 border border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black transition-transform hover:scale-110 shadow-md cursor-pointer"
            aria-label="Copy link"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            )}
          </button>
          {showMessage && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black text-xs rounded py-1 px-2 whitespace-nowrap">
              {t('copied')}
            </div>
          )}
        </div>
      </div>

      {/* Mastodon Instance Modal */}
      {mastodonModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4 border border-gray-300 dark:border-gray-600"
          >
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">{t('mastodonShare')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t('mastodonDescription')}</p>
            
            <form onSubmit={handleMastodonShare}>
              <div className="mb-4">
                <label htmlFor="mastodon-instance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('mastodonInstance')}
                </label>
                <div className="flex">
                  <input
                    ref={inputRef}
                    type="text"
                    id="mastodon-instance"
                    placeholder="mastodon.social"
                    className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={mastodonInstance}
                    onChange={(e) => setMastodonInstance(e.target.value)}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('mastodonExamples')}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => setMastodonModalOpen(false)}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  disabled={!mastodonInstance}
                >
                  {t('share')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 