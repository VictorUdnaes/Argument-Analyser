import { useEffect, useState } from 'react';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1);
            setIsVisible(isBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer id="footer" className="footer" style={{ display: isVisible ? 'block' : 'none' }}>
            <p>&copy; 2024 vudnaes.com All rights reserved.</p>
            <p>
                <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
            </p>
        </footer>
    );
};


export default Footer;