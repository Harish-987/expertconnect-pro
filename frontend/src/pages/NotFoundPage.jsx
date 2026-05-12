import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { staggerContainer, fadeUp } from '../animations/variants';

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      animate="visible"
      className="text-center max-w-md"
    >
      {/* Glowing 404 */}
      <motion.div variants={fadeUp} className="relative mb-8">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-violet-400 select-none">
          404
        </div>
        <div className="absolute inset-0 text-8xl font-black text-brand-500/10 blur-2xl select-none">
          404
        </div>
      </motion.div>

      <motion.h1 variants={fadeUp} className="text-2xl font-bold text-white mb-3">
        Page not found
      </motion.h1>
      <motion.p variants={fadeUp} className="text-slate-400 mb-8">
        This page doesn&apos;t exist or has been moved. Head back and find something awesome.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/experts">
          <Button variant="secondary">Browse Experts</Button>
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default NotFoundPage;
