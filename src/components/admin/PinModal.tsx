import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLock } from 'react-icons/fa';
import { verifyPin } from '../../utils/security';
import { defaultAdminConfig } from '../../data/defaultData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AdminConfig } from '../../types/portfolio';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PinModal({ isOpen, onClose, onSuccess }: PinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminConfig] = useLocalStorage<AdminConfig>('adminConfig', defaultAdminConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const isValid = await verifyPin(pin, adminConfig.pinHash);

    if (isValid) {
      onSuccess();
      setPin('');
      onClose();
    } else {
      setError('Invalid PIN. Default PIN is "1234".');
      setPin('');
    }

    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaLock className="mr-2 text-primary-600" />
                  Enter PIN
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                    Admin PIN
                  </label>
                  <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your PIN"
                    autoFocus
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition text-center text-2xl tracking-widest"
                    maxLength={10}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Default PIN: 1234
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || pin.length === 0}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Unlock Editor'}
                </button>
              </form>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> You can change the PIN in the admin panel settings.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

