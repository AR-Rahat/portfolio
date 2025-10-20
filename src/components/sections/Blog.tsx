import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlogPost } from '../../types/portfolio';
import { FaClock, FaCalendar } from 'react-icons/fa';

interface BlogProps {
  data: BlogPost[];
}

export function Blog({ data }: BlogProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="min-h-screen flex items-center py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-20 w-64 h-64 bg-primary-100 rounded-full opacity-35"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-20 w-80 h-80 bg-blue-100 rounded-full opacity-30"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 13,
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
          Blog & Articles
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.2 + index * 0.15,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Post Image */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-blue-500 relative overflow-hidden group">
                {post.image ? (
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="w-full h-full flex items-center justify-center text-white text-6xl font-bold opacity-20"
                  >
                    {post.title[0]}
                  </motion.div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="flex items-center space-x-4 text-sm text-gray-500 mb-3"
                >
                  <div className="flex items-center space-x-1">
                    <FaCalendar />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="text-xl font-bold text-gray-900 mb-2"
                >
                  {post.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.15 }}
                  className="text-gray-600 mb-4 line-clamp-3"
                >
                  {post.excerpt}
                </motion.p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.7 + index * 0.15 + i * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

