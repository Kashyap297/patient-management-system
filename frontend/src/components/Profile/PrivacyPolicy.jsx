import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-7">Privacy Policy</h3>
      <div className="mx-auto overflow-y-auto h-[550px] custom-scroll border rounded-xl p-5 ">
        <p className="text-gray-700 mb-6">
          This Privacy Policy describes how we collect, use, disclose, and
          protect information within the Patient Management System (the
          "System") as it pertains to admins. By accessing and using the System,
          you agree to abide by this Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-6">
          As an admin, we may collect and store the following information about
          you:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Personal identification information, such as your name, email
            address, and contact details.
          </li>
          <li>
            Employment details related to your role as an admin, including your
            assigned hospital or healthcare facility.
          </li>
          <li>
            Login and usage data, including IP address, login timestamps, and
            actions taken within the System.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">2. Use of Information</h2>
        <p className="text-gray-700 mb-6">
          We use the information collected from admins to:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Verify your identity and manage your access to the System.</li>
          <li>
            Monitor and log your actions within the System to ensure compliance
            with security and legal standards.
          </li>
          <li>
            Facilitate effective communication with patients and other staff
            members within your assigned facility.
          </li>
          <li>
            Maintain the security and integrity of the System, including
            detecting and preventing unauthorized access.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          3. Data Protection and Security
        </h2>
        <p className="text-gray-700 mb-6">
          We take data security seriously and implement industry-standard
          security measures to protect admin information:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Data Encryption: All admin data is encrypted to protect it during
            transmission and storage.
          </li>
          <li>
            Access Controls: Only authorized personnel can access, modify, or
            delete admin data within the System.
          </li>
          <li>
            Audit Logs: We maintain audit logs of all admin actions within the
            System for security and compliance purposes.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          4. Data Sharing and Disclosure
        </h2>
        <p className="text-gray-700 mb-6">
          We do not share admin information with third parties, except:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            When required by law, such as in response to a subpoena or other
            legal process.
          </li>
          <li>
            When necessary to protect the rights, property, or safety of the
            System, our users, or the public.
          </li>
          <li>
            With authorized personnel within your organization for operational
            and compliance purposes.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
        <p className="text-gray-700 mb-6">
          We retain admin information for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy, unless a longer retention
          period is required by law. When admin information is no longer needed,
          we securely delete or anonymize it.
        </p>

        <h2 className="text-xl font-semibold mb-4">6. Your Responsibilities</h2>
        <p className="text-gray-700 mb-6">
          As an admin, you are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Maintaining the confidentiality of your login credentials and access
            rights.
          </li>
          <li>
            Ensuring that any patient information you access or modify complies
            with applicable data protection laws and organizational policies.
          </li>
          <li>
            Reporting any security incidents or unauthorized access immediately
            to the appropriate authority.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          7. Access and Correction of Information
        </h2>
        <p className="text-gray-700 mb-6">
          You have the right to access the personal information we hold about
          you as an admin. You may also request corrections to any inaccurate or
          incomplete information. To make such requests, please contact the
          System administrator.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          8. Updates to Privacy Policy
        </h2>
        <p className="text-gray-700 mb-6">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. You will be notified of any
          significant changes. Your continued use of the System as an admin
          after the changes are effective constitutes your acceptance of the
          updated policy.
        </p>

        <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
        <p className="text-gray-700 mb-6">
          If you have any questions or concerns about this Privacy Policy or
          your rights as an admin, please contact the System administrator or
          the designated Data Protection Officer within your organization.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
