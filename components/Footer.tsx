import React from 'react';
import { personalInfo } from '../constants';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-light-background dark:bg-background py-8 border-t border-light-surface dark:border-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-light-text-secondary dark:text-text-secondary">
        <div className="flex justify-center items-center space-x-6 mb-4">
            {personalInfo.contacts.map((contact, index) => {
                 if (contact.icon.displayName === 'Linkedin' || contact.icon.displayName === 'Github') {
                    const Icon = contact.icon;
                    return (
                        <a 
                            key={index}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors duration-300"
                            aria-label={contact.text}
                        >
                            <Icon size={24} />
                        </a>
                    );
                 }
                 return null;
            })}
        </div>
        <p>&copy; {year} {personalInfo.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;