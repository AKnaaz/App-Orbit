import React from "react";

const FAQs = () => {
  return (
    <section className="w-full px-6 py-12 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-16">
        Frequently Asked Questions
      </h2>
    
      <div className="collapse collapse-arrow border rounded-xl shadow-md mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          How do I submit a product?
        </div>
        <div className="collapse-content">
          You can submit a product by creating an account, logging in, and
          clicking the “Add Product” button. Fill in the required details,
          upload visuals, and submit for review.
        </div>
      </div>

      <div className="collapse collapse-arrow border rounded-xl shadow-md mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Is it free to use AppOrbit?
        </div>
        <div className="collapse-content">
          Yes, AppOrbit is completely free to browse, upvote, and explore.
          Product submission and community interaction do not require any
          payment.
        </div>
      </div>

      <div className="collapse collapse-arrow border rounded-xl shadow-md mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Can I upvote without logging in?
        </div>
        <div className="collapse-content">
          No, you need to create an account and log in to upvote products.
          This ensures authenticity and prevents spam voting.
        </div>
      </div>

      <div className="collapse collapse-arrow border rounded-xl shadow-md mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          How can I contact support?
        </div>
        <div className="collapse-content">
          You can reach out to our support team via the “Contact” page.
          We usually respond within 24–48 hours.
        </div>
      </div>
    </section>
  );
};

export default FAQs;
