import React from "react";
// overflow-y-auto h-[500px] custom-scroll
const TermsAndConditions = () => {
  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-semibold mb-7">Terms & Condition</h3>
      <div className="mx-auto overflow-y-auto h-[500px] sm:h-[550px] custom-scroll border rounded-xl p-5">      
      <p className="mb-4 text-gray-700">
        Welcome to the Patient Management System (Admin Panel). By accessing
        or using this platform, you agree to comply with and be bound by the
        following terms and conditions of use. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mb-3">1. Usage of the System</h2>
      <p className="mb-4 text-gray-700">
        As an admin, you are granted access to manage patients, doctors, and
        other associated data within the system. You are expected to use this
        system responsibly and solely for the purposes it is intended for.
        Unauthorized use or sharing of access credentials is strictly
        prohibited.
      </p>

      <h2 className="text-xl font-semibold mb-3">2. Confidentiality</h2>
      <p className="mb-4 text-gray-700">
        The system contains sensitive patient and doctor information. You must
        maintain confidentiality and ensure that no data is disclosed,
        shared, or misused. Failure to comply with this condition may lead to
        immediate termination of your access and legal action.
      </p>

      <h2 className="text-xl font-semibold mb-3">3. Data Accuracy</h2>
      <p className="mb-4 text-gray-700">
        It is your responsibility to ensure the accuracy of the data entered
        into the system. Inaccurate or fraudulent data entry may result in
        disciplinary action.
      </p>

      <h2 className="text-xl font-semibold mb-3">4. System Monitoring</h2>
      <p className="mb-4 text-gray-700">
        All actions performed on the Admin Panel are monitored and logged for
        security purposes. Any misuse or violation of terms may result in the
        revocation of your access and further investigation.
      </p>

      <h2 className="text-xl font-semibold mb-3">5. Prohibited Activities</h2>
      <ul className="list-disc pl-5 mb-4 text-gray-700">
        <li>Sharing login credentials with unauthorized users.</li>
        <li>Exporting or sharing sensitive patient or doctor data without proper authorization.</li>
        <li>Using the system for any illegal or unauthorized purpose.</li>
        <li>Attempting to hack, modify, or disrupt the platform's functionality.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700">
        The Patient Management System is provided "as is" without any
        guarantees or warranties. The organization is not responsible for any
        damages arising from the use or inability to use the system.
      </p>

      <h2 className="text-xl font-semibold mb-3">7. Termination of Access</h2>
      <p className="mb-4 text-gray-700">
        The organization reserves the right to revoke your access to the
        system at any time, without prior notice, for any violation of these
        terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mb-3">8. Amendments to the Terms</h2>
      <p className="mb-4 text-gray-700">
        These terms and conditions may be updated or amended from time to time
        without prior notice. It is your responsibility to regularly review
        the terms and stay informed of any changes.
      </p>

      <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
      <p className="mb-4 text-gray-700">
        For any questions or concerns regarding these terms, please contact
        the system administrator at <span className="text-blue-500">admin@patientmanagement.com</span>.
      </p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Agreement</h3>
        <p className="text-gray-700">
          By using this Admin Panel, you acknowledge that you have read,
          understood, and agreed to these terms and conditions.
        </p>
      </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
