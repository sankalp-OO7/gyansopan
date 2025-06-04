import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseCircleOutline } from 'react-icons/io5'; // Using react-icons for a close button

const ImageModal = ({ isOpen, imageSrc, onClose, altText }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-full max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 text-white hover:text-gray-300 transition-colors z-50 focus:outline-none"
              aria-label="Close image modal"
            >
              <IoCloseCircleOutline size={36} />
            </button>
            <img
              src={imageSrc} // Image path passed directly
              alt={altText}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-white/20"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;