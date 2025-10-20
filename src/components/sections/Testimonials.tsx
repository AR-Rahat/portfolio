import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Testimonial } from '../../types/portfolio';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

interface TestimonialsProps {
  data: Testimonial[];
}

export function Testimonials({ data }: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  if (data.length === 0) return null;

  const current = data[currentIndex];

  return (
    <section id="testimonials" className="min-h-screen flex items-center py-20 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-1/4 w-72 h-72 bg-yellow-100 rounded-full opacity-35"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-80 h-80 bg-primary-100 rounded-full opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Testimonials
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          className="relative bg-white p-8 md:p-12 rounded-2xl shadow-xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-primary-200" />
          </motion.div>

          <div className="relative z-10">
            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <FaStar
                    className={`text-2xl ${
                      i < current.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-gray-700 text-center mb-8 italic leading-relaxed"
            >
              "{current.content}"
            </motion.p>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full mb-4 overflow-hidden"
              >
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                    {current.name[0]}
                  </div>
                )}
              </motion.div>
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg font-bold text-gray-900"
              >
                {current.name}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600"
              >
                {current.position} at {current.company}
              </motion.p>
            </motion.div>
          </div>

          {/* Navigation */}
          {data.length > 1 && (
            <>
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-primary-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="text-primary-600" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-primary-50 transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="text-primary-600" />
              </motion.button>

              {/* Dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-primary-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

