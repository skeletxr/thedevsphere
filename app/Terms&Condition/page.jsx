"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Terms and Conditions</h1>

      <p className="text-sm text-gray-500 mb-4">
        <strong>Effective Date:</strong> 1/01/2024 - 31/12/2027
      </p>

      <p className="text-gray-700 mb-6">
        These Terms and Conditions (hereinafter referred to as the “Terms”)
        constitute a legally binding agreement between you (“Participant,”
        “Student,” “You,” or “Your”) and TheDevSphere (“Company,” “We,”
        “Us,” or “Our”), governing your participation in the web development
        training program (the “Course”) offered through various digital
        platforms, including but not limited to Google Meet, WhatsApp, and
        online video repositories.
      </p>

      <p className="text-gray-700 mb-6">
        By accessing, enrolling, or participating in the Course, you acknowledge
        that you have read, understood, and agreed to be bound by these Terms in
        their entirety. Non-acceptance of these Terms precludes your
        participation in the Course.
      </p>

      <div className="space-y-8">
        {termsSections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl text-gray-500 font-semibold mb-4">{section.title}</h2>
            {section.content.map((item, idx) => (
              <p key={idx} className="text-gray-700 mb-4">
                {item}
              </p>
            ))}
          </section>
        ))}
      </div>

      <footer className="mt-10 text-center text-gray-600">
        For queries, clarifications, or complaints, contact us at:
        <br />
        <strong>Email:</strong> contact.thedevsphere@gmail.com | <strong>WhatsApp:</strong> 9999999999
      </footer>
    </div>
  );
};

const termsSections = [
  {
    title: "1. Scope of Agreement",
    content: [
      "1.1 The delivery of educational content, live sessions, and assignments.",
      "1.2 The issuance of a Certificate of Completion based on fulfillment of specific criteria.",
      "1.3 Communication through electronic channels, including WhatsApp and email, for Course updates.",
    ],
  },
  {
    title: "2. Eligibility and Enrolment",
    content: [
      "2.1 Eligibility Criteria: Participants must be at least 16 years of age. If under 18, parental or legal guardian consent is mandatory.",
      "2.2 Technical Requirements: Participants are responsible for securing access to a computer with a functional webcam, microphone, and a reliable internet connection.",
    ],
  },
  {
    title: "3. Course Components",
    content: [
      "3.1 The Course comprises:",
      "a. Live virtual sessions conducted on pre-scheduled dates.",
      "b. Pre-recorded educational videos accessible for a limited duration.",
      "c. Assignments and projects designed to evaluate understanding.",
      "3.2 The schedule, structure, and content of the Course are subject to revision at our discretion, with prior notification.",
    ],
  },
  {
    title: "4. Fees, Payments, and Refunds",
    content: [
      "4.1 Fees: A non-refundable fee of ₹9,990 (Indian Rupees) is applicable for the Course.",
      "4.2 Payment Methods: Payments must be made through the specified channels, including UPI, bank transfers, or other methods communicated via WhatsApp or this website.",
      "4.3 Referral Bonus: Participants referring new enrollees will receive ₹2000 per successful referral, contingent upon the referred individual completing their payment and enrollment.",
      "4.4 Refund Policy: You are entitled to a refund in the case of the purchased course not being assigned to you within the expiration date from your date of purchase or if you have paid twice for the same course. Under any other circumstance, we will not consider any requests for refund as this is a digital course purchase.",
    ],
  },
  {
    title: "5. Intellectual Property Rights",
    content: [
      "5.1 Ownership: All materials provided, including but not limited to videos, assignments, guides, and resources, remain the exclusive intellectual property of TheDevSphere.",
      "5.2 Prohibitions: Reproduction, distribution, resale, or modification of the materials in any form without explicit written consent is strictly prohibited.",
    ],
  },
  {
    title: "6. Participant Conduct and Responsibilities",
    content: [
      "6.1 Code of Conduct: Participants are expected to engage respectfully with instructors and peers.",
      "6.2 Academic Integrity: Submissions must reflect original work unless explicitly stated otherwise.",
      "6.3 Attendance: Regular attendance in live sessions is essential for successful completion.",
    ],
  },
  {
    title: "7. Internship and Placement Disclaimer",
    content: [
      "7.1 No Guarantee of Placement: Participation in the Course does not guarantee internship placement or employment opportunities.",
      "7.2 Recommendations Only: Guidance on applying for internships will be provided, but final placement is beyond our control.",
    ],
  },
  {
    title: "8. Privacy and Data Usage",
    content: [
      "8.1 Data Collection: We collect personal information for Course-related purposes.",
      "8.2 Data Usage: Your information will not be shared with third parties except when required.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "9.1 Disclaimer: The Course is provided “as is,” without warranties of any kind, whether express or implied.",
      "9.2 Limitation: Under no circumstances shall TheDevSphere be held liable for technical disruptions or connectivity issues.",
    ],
  },
  {
    title: "10. Non-Compete and Confidentiality",
    content: [
      "Non-Compete Clause: Participants agree not to replicate, compete with, or create a similar training program using the materials or methodology provided during or after the Course.",
"Confidentiality: Participants must not share login credentials, course materials, or proprietary resources with third parties or anyone.",
    ],
  },
  {
    title: "11. Amendments to Terms",
    content: [
      "11.1 We reserve the unilateral right to revise or modify these Terms at any time.",
      "11.2 Participants will be notified of significant changes via email or WhatsApp. Continued participation constitutes acceptance of revised Terms.",
    ],
  },
  {
    title: "12. Termination and Withdrawal",
    content: [
      "12.1 Termination: Breach of these Terms may result in immediate termination of participation without refund.",
      "12.2 Voluntary Withdrawal: Participants may withdraw at any time; however, fees paid are non-refundable.",
    ],
  },
  {
    title: "13. Miscellaneous Provisions",
    content: [
      "13.1 Severability: If any provision of these Terms is deemed unenforceable, the remaining provisions shall remain valid and enforceable.",
      "13.2 Entire Agreement: These Terms constitute the entire agreement between the parties and supersede any prior agreements or communications.",
    ],
  },
  {
    title: "14. Contact Information",
    content: [
      "For queries, clarifications, or complaints, you may contact us at:",
      "Email: contact.thedevsphere@gmail.com",
      "WhatsApp: [--------------]",
    ],
  },
  {
    title: "15. Code of Ethics for Referrals",
    content: [
      "- **Prohibition of Misrepresentation**: Referrers must provide accurate information about the Course and its benefits. Misleading or exaggerated claims to induce enrollment will result in disqualification from the referral program and may lead to termination from the Course and no refunds will be processed.",
    ],
  },
  {
    title: "16. Certificate(s)",
    content: [
      "16.1 The Certificate of Completion signifies that the participant has met the requirements set forth for the Course.",
      "16.2 Certificates are not accredited by any official body and are not a substitute for formal qualifications.",
    ],
  },
  {
    title: "17. Technology Disclaimer",
    content: [
      "- **System Downtime**: The Company is not liable for disruptions caused by platform downtimes, maintenance, or any service outages.",
      "- **Software and Tools**: While we recommend certain tools and software during the Course, their performance and reliability are beyond our control.",
    ],
  },
  {
    title: "18. Indemnification",
    content: [
      "- Participants agree to indemnify and hold harmless TheDevSphere from any claims, damages, liabilities, and expenses arising from:",
      "  a. Violation of these Terms.",
      "  b. Use or misuse of the Course content.",
      "  c. Breaches of intellectual property rights of third parties.",
    ],
  },
  {
    title: "19. Compliance with Laws",
    content: [
      "- Participants must comply with all applicable laws and regulations while using our services, including but not limited to intellectual property and data protection laws.",
    ],
  },
  {
    title: "20. Certificate Misuse Disclaimer",
    content: [
      "- Certificates issued are for personal achievement recognition. Any misuse, such as falsification or misrepresentation of the Certificate for unauthorized purposes, will result in a permanent ban and potential legal action.",
    ],
  },
  {
    title: "21. Refund for Failed Referrals",
    content: [
      "- If a referred participant is found ineligible, requests a refund, or withdraws from the program, the referral bonus for that participant will not be issued.",
    ],
  },
  {
    title: "22. Feedback and Testimonials",
    content: [
      "- Participants agree that feedback or testimonials provided during or after the Course can be used by TheDevSphere for promotional purposes, with anonymity preserved unless explicit consent for identification is provided.",
    ],
  },
  {
    title: "23. Fair Usage Policy",
    content: [
      "- Participants must use the resources, tools, and materials provided as per the intended purpose. Excessive or unauthorized use may lead to restricted access.",
    ],
  },
  {
    title: "24. Anti-Discrimination and Inclusion Policy",
    content: [
      "- The Course is committed to fostering an inclusive environment. Discrimination based on race, gender, religion, or any other protected category is strictly prohibited and may result in termination without refund.",
    ],
  },
];

export default Page;