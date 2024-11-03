import React from "react";
// overflow-y-auto h-[500px] custom-scroll
const TermsAndConditions = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-7">Terms & Condition</h3>
      <div className="mx-auto overflow-y-auto h-[550px] custom-scroll border rounded-xl p-5 ">
        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-6">
          By accessing the System as an admin, you acknowledge that you have
          read, understood, and agree to be bound by these Terms and Conditions.
          If you do not agree with any part of these terms, you are not
          authorized to access or use the System in an administrative capacity.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          2. Admin Responsibilities
        </h2>
        <p className="text-gray-700 mb-6">
          As an admin, you are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Maintaining the accuracy and confidentiality of patient records.
          </li>
          <li>
            Monitoring user activities within the System to ensure compliance
            with all relevant laws and regulations.
          </li>
          <li>
            Facilitating patient management tasks, such as adding or updating
            patient profiles, managing appointments, and overseeing health
            records.
          </li>
          <li>
            Reporting any suspicious or unauthorized activity immediately to the
            relevant authorities within the organization.
          </li>
          <li>
            Ensuring that all information shared within the System is truthful,
            accurate, and not misleading.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          3. Confidentiality and Data Privacy
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>Patient Data Confidentiality:</strong> You must maintain the
          confidentiality of all patient data in compliance with data protection
          laws, such as HIPAA (for the US) or GDPR (for the EU), if applicable.
          Any unauthorized disclosure of patient data is strictly prohibited.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Data Access:</strong> Only authorized personnel may access,
          view, or modify patient information. Unauthorized access or misuse of
          patient data is strictly prohibited and may result in disciplinary
          action or legal consequences.
        </p>
        <p className="text-gray-700 mb-6">
          <strong>Data Security:</strong> You are responsible for ensuring that
          the System's data security measures, including password protection,
          encryption, and secure access protocols, are adhered to at all times.
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Prohibited Activities</h2>
        <p className="text-gray-700 mb-6">As an admin, you agree not to:</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Use the System to conduct or promote any illegal or unauthorized
            activity.
          </li>
          <li>
            Misuse patient information or share data with unauthorized third
            parties.
          </li>
          <li>
            Access or attempt to access data beyond your authorized level of
            permission.
          </li>
          <li>
            Engage in any activity that could harm the System, including
            introducing viruses, Trojans, or malicious code.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">
          5. Compliance with Legal and Regulatory Requirements
        </h2>
        <p className="text-gray-700 mb-6">
          As an admin, you agree to comply with all applicable local, state,
          national, and international laws and regulations concerning the
          handling of patient data. You are responsible for staying informed of
          any changes to laws or regulations that affect your role and
          responsibilities within the System.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          6. Data Accuracy and Integrity
        </h2>
        <p className="text-gray-700 mb-6">
          You agree to ensure that all data entered, updated, or maintained
          within the System is accurate, complete, and current. Deliberate
          falsification or misrepresentation of patient information is strictly
          prohibited and may lead to legal and/or disciplinary action.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Audit and Monitoring</h2>
        <p className="text-gray-700 mb-6">
          The System reserves the right to monitor and audit all admin activity.
          Your actions within the System may be recorded and reviewed to ensure
          compliance with these Terms and Conditions. Violations may result in
          the suspension or termination of access privileges and potential legal
          consequences.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          8. Termination of Admin Access
        </h2>
        <p className="text-gray-700 mb-6">
          The System reserves the right to revoke admin access at any time for
          any violation of these Terms and Conditions or if required by changes
          in organizational policies or applicable law.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          9. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-6">
          The System and its operators are not liable for any damages, losses,
          or liabilities arising from your misuse of the System or any
          unauthorized disclosure of patient data caused by your actions. You
          agree to indemnify and hold harmless the System and its affiliates,
          officers, and employees from any claims arising from your use of the
          System.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          10. Modifications to Terms
        </h2>
        <p className="text-gray-700 mb-6">
          The System reserves the right to modify these Terms and Conditions at
          any time. You will be notified of any significant changes, and
          continued use of the System as an admin following such changes
          constitutes your acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
