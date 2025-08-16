import React from "react";

const TermsPrivacy = () => {
  return (
    <section className="w-full px-6 sm:px-10 md:px-20 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Terms & <span className="text-[#FF8000]">Privacy</span>
        </h1>
        <p className="text-lg mb-12">
          Welcome to <strong>AppOrbit</strong>. Please read our Terms of Service and 
          Privacy Policy carefully to understand how we operate and protect your information.
        </p>
      </div>

      
      <div className="mb-16 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF8000]">Terms of Service</h2>
        <ul className="list-disc list-inside space-y-3">
          <li>
            By creating an account on <strong>AppOrbit</strong>, you agree to provide
            accurate information and maintain the security of your login credentials.
          </li>
          <li>
            You may not upload harmful, offensive, or illegal content. Any violation 
            may result in suspension or termination of your account.
          </li>
          <li>
            Products and reviews must follow our community guidelines. Spamming 
            or fraudulent activity will not be tolerated.
          </li>
          <li>
            <strong>AppOrbit</strong> reserves the right to update, modify, or remove 
            content that violates these terms.
          </li>
        </ul>
      </div>

      
      <div className="p-8 rounded-2xl shadow-md hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF8000]">Privacy Policy</h2>
        <ul className="list-disc list-inside space-y-3">
          <li>
            We collect basic user information such as name, email, and profile picture 
            for authentication and personalization purposes.
          </li>
          <li>
            Payment information is securely handled through trusted third-party 
            providers like <strong>Stripe</strong>. We do not store sensitive card details.
          </li>
          <li>
            Your personal data will never be sold or shared with unauthorized 
            third parties.
          </li>
          <li>
            We use cookies to improve your browsing experience. You can manage 
            cookie settings through your browser.
          </li>
          <li>
            By using <strong>AppOrbit</strong>, you consent to our data collection 
            and usage practices as described in this policy.
          </li>
        </ul>
      </div>

      
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Need More Information?</h2>
        <p className="mb-6">
          If you have any questions regarding our Terms or Privacy Policy, 
          please feel free to contact us.
        </p>
        <a href="/contact" className="btn bg-[#FF8000] px-6 text-white">
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default TermsPrivacy;
