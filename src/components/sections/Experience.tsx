import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExperienceData } from '../../types/portfolio';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

interface ExperienceProps {
  data: ExperienceData[];
}

export function Experience({ data }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formatDate = (dateStr: string) => {
    if (dateStr.toLowerCase() === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="min-h-screen flex items-center py-20 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary-200 rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-200 rounded-full opacity-25"
          animate={{
            scale: [1.3, 1, 1.3],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-blue-300 to-primary-200 origin-top"
          />

          <div className="space-y-12">
            {data.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 0.5 + index * 0.2,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: 'spring', stiffness: 200 }}
                  className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full rounded-full"
                  />
                </motion.div>

                {/* Content */}
                <div className={index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9 + index * 0.2 }}
                        className="text-xl font-bold text-gray-900"
                      >
                        {exp.position}
                      </motion.h3>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: 0.9 + index * 0.2, type: 'spring', stiffness: 200 }}
                      >
                        <FaBriefcase className="text-primary-600" />
                      </motion.div>
                    </div>
                    
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="text-lg font-semibold text-primary-600 mb-2"
                    >
                      {exp.company}
                    </motion.h4>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.1 + index * 0.2 }}
                      className="flex items-center text-gray-600 mb-2"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{exp.location}</span>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.2 + index * 0.2 }}
                      className="text-sm text-gray-500 mb-4"
                    >
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.3 + index * 0.2 }}
                      className="text-gray-700 mb-4"
                    >
                      {exp.description}
                    </motion.p>
                    
                    <ul className="space-y-2 text-left">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 1.4 + index * 0.2 + i * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="text-primary-600 mr-2">•</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

