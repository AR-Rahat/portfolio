import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AboutData } from '../../types/portfolio';
import { FaCheckCircle, FaDownload } from 'react-icons/fa';

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-primary-100 rounded-full opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            {data.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="w-64 h-64 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {data.image && (
                  <motion.img
                    src={data.image}
                    alt="Profile"
                    className="absolute inset-0 w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-lg text-gray-600 mb-6 leading-relaxed"
              >
                {data.bio}
              </motion.p>

              <div className="space-y-3 mb-6">
                {data.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ 
                      delay: 1 + index * 0.15,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 1 + index * 0.15, type: 'spring', stiffness: 200 }}
                    >
                      <FaCheckCircle className="text-primary-600 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {data.resumeLink && (
                <motion.a
                  href={data.resumeLink}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaDownload />
                  </motion.div>
                  <span>Download Resume</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

