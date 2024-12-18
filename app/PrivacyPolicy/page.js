"use client";

import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Privacy Policy</h1>

      <p className="text-sm text-gray-500 mb-4">
        <strong>Effective Date:</strong> 1/01/2024 - 31/12/2027
      </p>

      <p className="text-gray-700 mb-6">
        <strong>TheDevSphere</strong> (referred to as "we," "our," or "us") values your privacy and your personal
        information. This Privacy Policy outlines how we collect, use, and store the information you
        provide while using our website and services. By accessing or using our website, you agree to
        this Privacy Policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">1. Information We Collect</h2>

        <h3 className="text-lg text-gray-700 font-medium mb-2">1.1 Personal Information:</h3>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number (WhatsApp number, if applicable)</li>
          <li>Payment details (for fee processing)</li>
          <li>Any uploaded document or file</li>
        </ul>

        <h3 className="text-lg text-gray-700 font-medium mb-2">1.2 Non-Personal Information:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>IP address</li>
          <li>Cookies and usage data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>To provide and manage our services, including enrollment and course delivery.</li>
          <li>To process payments and issue invoices or receipts.</li>
          <li>To communicate updates, reminders, or important course-related notifications.</li>
          <li>To enhance user experience by analyzing website usage and feedback.</li>
          <li>To comply with legal obligations or resolve disputes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">3. Data Sharing and Disclosure</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>
            <strong>Service Providers:</strong> We may share information with trusted third-party providers who assist in hosting, payment
            processing, or delivering services. These parties are obligated to maintain confidentiality.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose information if required by law, court orders, or to protect our rights and
            property.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information may be transferred to the new
            entity, subject to continued privacy safeguards.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">4. Data Retention</h2>
        <p className="text-gray-700">
          We retain your information as long as necessary to fulfill the purposes outlined in this
          Privacy Policy or as required by law. Afterward, data will be securely deleted or anonymized.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700">
          Our website may use cookies to enhance functionality and gather analytical data. You can manage
          cookie preferences through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">6. Security Measures</h2>
        <p className="text-gray-700">
          No online platform can guarantee complete security. However, we implement industry-standard measures to
          protect your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">7. Your Rights</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Access to your data and the ability to request corrections.</li>
          <li>Deletion of your personal information, subject to legal or contractual obligations.</li>
          <li>Opting out of non-essential communications.</li>
        </ul>
        <p className="text-gray-700">
          To exercise these rights, contact us at <strong>contact.thedevsphere@gmail.com</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">8. Third-Party Links</h2>
        <p className="text-gray-700">
          Our website may include links to third-party websites. We are not responsible for the privacy practices of
          these websites and recommend reviewing their policies before sharing information.
        </p>
      </section>

      <footer className="mt-10 text-center text-gray-600">
        For queries, clarifications, or complaints, contact us at:
        <br />
        <strong>Email:</strong> contact.thedevsphere@gmail.com
      </footer>
    </div>
  );
};

export default PrivacyPolicy;