const Footer = () => {
  return (
    <footer className="border-t border-dark/10 bg-white/50 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center font-body text-sm text-muted sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} TravelBharat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
