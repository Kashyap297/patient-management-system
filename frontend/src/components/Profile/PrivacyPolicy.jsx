import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7">
        Privacy Policy
      </h3>
      <div className="mx-auto overflow-y-auto h-[400px] sm:h-[500px] lg:h-[550px] custom-scroll border rounded-xl p-4 sm:p-5">
        <p className="mb-4 text-gray-700">
          This Privacy Policy explains how we collect, use, and protect
          information in the Patient Management System (Admin Panel). By using
          this platform, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p className="mb-4 text-gray-700">
          We collect and process the following types of information:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>
            **Personal Information**: Includes names, contact details (phone
            numbers, email addresses), and addresses of patients and doctors.
          </li>
          <li>
            **Health Information**: Includes medical history, diagnoses,
            treatments, and prescription data of patients.
          </li>
          <li>
            **Usage Data**: Includes user activity logs, IP addresses, browser
            type, and access timestamps for security and audit purposes.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">
          2. How We Use the Information
        </h2>
        <p className="mb-4 text-gray-700">
          The collected information is used for the following purposes:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>To manage and maintain patient and doctor records.</li>
          <li>To facilitate scheduling, billing, and communication.</li>
          <li>To improve platform security and detect unauthorized access.</li>
          <li>
            To generate reports and analytics for administrative purposes.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">
          3. How We Protect Your Information
        </h2>
        <p className="mb-4 text-gray-700">
          We prioritize the security and confidentiality of your data by
          implementing the following measures:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Data is encrypted during storage and transmission.</li>
          <li>
            Access to sensitive information is restricted to authorized users
            only.
          </li>
          <li>
            Regular security audits and vulnerability assessments are conducted.
          </li>
          <li>
            User actions are logged and monitored to detect and prevent
            unauthorized access.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
        <p className="mb-4 text-gray-700">
          We do not share your data with third parties unless required for the
          following:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>
            **Legal Compliance**: When required to comply with legal obligations
            or government requests.
          </li>
          <li>
            **Service Providers**: Trusted third-party services that assist in
            platform maintenance, only under strict confidentiality agreements.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
        <p className="mb-4 text-gray-700">
          Patient and doctor information will be retained as long as it is
          necessary for the operation of the platform or as required by law.
          Upon termination of the system, data will be securely deleted or
          anonymized.
        </p>

        <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
        <p className="mb-4 text-gray-700">You have the right to:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Access your personal data and request corrections.</li>
          <li>
            Request deletion of your data if it is no longer necessary for
            platform operations.
          </li>
          <li>
            Withdraw your consent for processing personal information at any
            time.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
        <p className="mb-4 text-gray-700">
          The platform uses cookies to enhance user experience and facilitate
          efficient navigation. You may disable cookies in your browser
          settings, though this may limit some platform functionality.
        </p>

        <h2 className="text-xl font-semibold mb-3">
          8. Updates to This Policy
        </h2>
        <p className="mb-4 text-gray-700">
          We reserve the right to update this Privacy Policy at any time. Any
          changes will be reflected on this page, and it is your responsibility
          to review it periodically.
        </p>

        <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
        <p className="mb-4 text-gray-700">
          For questions or concerns regarding this Privacy Policy, please
          contact us at:{" "}
          <span className="text-blue-500">privacy@patientmanagement.com</span>.
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Agreement</h3>
          <p className="text-gray-700">
            By using the Patient Management System (Admin Panel), you
            acknowledge that you have read, understood, and agreed to this
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
