
import React from 'react';

const Footer: React.FC = () => {
  const sections = {
    ABOUT: ['Contact Us', 'About Us', 'Careers', 'Flipkart Stories'],
    HELP: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ'],
    POLICY: ['Return Policy', 'Terms Of Use', 'Security', 'Privacy'],
    SOCIAL: ['Facebook', 'Twitter', 'YouTube'],
  };

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-gray-400 uppercase text-sm font-semibold mb-3">{title}</h3>
              <ul>
                {links.map((link) => (
                  <li key={link} className="mb-2">
                    <a href="#" className="hover:underline text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-2 border-l border-gray-700 pl-8">
             <h3 className="text-gray-400 uppercase text-sm font-semibold mb-3">Mail Us</h3>
             <p className="text-sm">
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
             </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6"/>
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6"/>
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6"/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
