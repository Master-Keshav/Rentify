import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

import './index.scss';

const Footer = () => {
    return (
        <motion.footer className="footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="footer-content">
                <p>&copy; 2024 Rentify. All rights reserved.</p>
                <div className="social-icons">
                    <Link href="#" className="social-icon">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <FaFacebook />
                        </motion.div>
                    </Link>
                    <Link href="#" className="social-icon">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <FaTwitter />
                        </motion.div>
                    </Link>
                    <Link href="#" className="social-icon">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <FaInstagram />
                        </motion.div>
                    </Link>
                </div>
                <div className="additional-info">
                    <Link href="/terms" className="footer-link">Terms of Use</Link>
                    <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                    <Link href="/contact" className="footer-link">Contact Us</Link>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
