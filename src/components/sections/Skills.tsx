import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SkillCategory } from '../../types/portfolio';

interface SkillsProps {
  data: SkillCategory[];
}

export function Skills({ data }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-80 h-80 bg-primary-200 rounded-full opacity-25"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30"
          animate={{
            scale: [1.4, 1, 1.4],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 16,
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
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.2 + categoryIndex * 0.1,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + categoryIndex * 0.1 }}
                className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-600"
              >
                {category.category}
              </motion.h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.7 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className="text-gray-700 font-medium"
                      >
                        {skill.name}
                      </motion.span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1, type: 'spring' }}
                        className="text-sm text-gray-500"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1, duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-primary-500 to-blue-500 h-full rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

