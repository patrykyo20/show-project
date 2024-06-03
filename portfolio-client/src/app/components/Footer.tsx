const Footer = () => {
  return (
    <footer className="w-full border-t-4 border-secondary">
        <div className="w-full max-w-[1520px] mx-auto flex flex-wrap gap-4 justify-center md:justify-between p-6 text-textPrimary">

        <div>
          © 2024 Click Craft. All rights reserved.
        </div>
        <div>
          <ul className="flex gap-8">
            <li>
              Terms of Service
            </li>
            <li>
              Privacy Policy
            </li>
            <li>
              Cookies
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;