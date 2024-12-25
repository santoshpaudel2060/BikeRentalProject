import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function AwesomeFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Bike Rental Service</h3>
            <p className="text-gray-400">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                {
                  name: "Home",
                  href: "/",
                },
                {
                  name: "About",
                  href: "/about",
                },
                {
                  name: "Services",
                  href: "/services",
                },
                {
                  name: "Contact",
                  href: "/contact",
                },
                {
                  name: "Bikes",
                  href: "/bikes",
                },
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.href.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Newsletter", "Events", "Help Center"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={`https://${social.label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()}Bike Rental Service. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:info@awesomecompany.com"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
