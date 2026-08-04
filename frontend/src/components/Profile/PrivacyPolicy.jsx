import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-8 relative overflow-hidden">
      <div className="relative z-10 animate-slide-up">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">Privacy Policy</h3>
          
          <div className="mx-auto overflow-y-auto h-[400px] sm:h-[500px] lg:h-[550px] custom-scroll bg-gray-50/50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-inner">
            <p className="mb-6 text-gray-600 font-medium leading-relaxed">
              This Privacy Policy explains how we collect, use, and protect
              information in the Patient Management System (Admin Panel). By using
              this platform, you agree to the terms outlined in this policy.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-2">We collect and process the following types of information:</p>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li>
                    <strong className="text-gray-800">Personal Information:</strong> Includes names, contact details (phone
                    numbers, email addresses), and addresses of patients and doctors.
                  </li>
                  <li>
                    <strong className="text-gray-800">Health Information:</strong> Includes medical history, diagnoses,
                    treatments, and prescription data of patients.
                  </li>
                  <li>
                    <strong className="text-gray-800">Usage Data:</strong> Includes user activity logs, IP addresses, browser
                    type, and access timestamps for security and audit purposes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use the Information</h2>
                <p className="text-gray-600 leading-relaxed mb-2">The collected information is used for the following purposes:</p>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li>To manage and maintain patient and doctor records.</li>
                  <li>To facilitate scheduling, billing, and communication.</li>
                  <li>To improve platform security and detect unauthorized access.</li>
                  <li>To generate reports and analytics for administrative purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Protect Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-2">We prioritize the security and confidentiality of your data by implementing the following measures:</p>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li>Data is encrypted during storage and transmission.</li>
                  <li>Access to sensitive information is restricted to authorized users only.</li>
                  <li>Regular security audits and vulnerability assessments are conducted.</li>
                  <li>User actions are logged and monitored to detect and prevent unauthorized access.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-2">We do not share your data with third parties unless required for the following:</p>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li><strong className="text-gray-800">Legal Compliance:</strong> When required to comply with legal obligations or government requests.</li>
                  <li><strong className="text-gray-800">Service Providers:</strong> Trusted third-party services that assist in platform maintenance, only under strict confidentiality agreements.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  Patient and doctor information will be retained as long as it is
                  necessary for the operation of the platform or as required by law.
                  Upon termination of the system, data will be securely deleted or
                  anonymized.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-2">You have the right to:</p>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li>Access your personal data and request corrections.</li>
                  <li>Request deletion of your data if it is no longer necessary for platform operations.</li>
                  <li>Withdraw your consent for processing personal information at any time.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">7. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  The platform uses cookies to enhance user experience and facilitate
                  efficient navigation. You may disable cookies in your browser
                  settings, though this may limit some platform functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">8. Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to update this Privacy Policy at any time. Any
                  changes will be reflected on this page, and it is your responsibility
                  to review it periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">9. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For questions or concerns regarding this Privacy Policy, please
                  contact us at:{" "}
                  <span className="text-[#10b981] font-bold">privacy@patientmanagement.com</span>.
                </p>
              </section>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Agreement</h3>
              <p className="text-gray-600">
                By using the Patient Management System (Admin Panel), you
                acknowledge that you have read, understood, and agreed to this
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
