import React from "react";
// overflow-y-auto h-[500px] custom-scroll
const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-8 relative overflow-hidden">
      <div className="relative z-10 animate-slide-up">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">Terms & Condition</h3>
          
          <div className="mx-auto overflow-y-auto h-[500px] sm:h-[550px] custom-scroll bg-gray-50/50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-inner">
            <p className="mb-6 text-gray-600 font-medium leading-relaxed">
              Welcome to the Patient Management System (Admin Panel). By accessing
              or using this platform, you agree to comply with and be bound by the
              following terms and conditions of use. Please read them carefully.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">1. Usage of the System</h2>
                <p className="text-gray-600 leading-relaxed">
                  As an admin, you are granted access to manage patients, doctors, and
                  other associated data within the system. You are expected to use this
                  system responsibly and solely for the purposes it is intended for.
                  Unauthorized use or sharing of access credentials is strictly
                  prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">2. Confidentiality</h2>
                <p className="text-gray-600 leading-relaxed">
                  The system contains sensitive patient and doctor information. You must
                  maintain confidentiality and ensure that no data is disclosed,
                  shared, or misused. Failure to comply with this condition may lead to
                  immediate termination of your access and legal action.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Accuracy</h2>
                <p className="text-gray-600 leading-relaxed">
                  It is your responsibility to ensure the accuracy of the data entered
                  into the system. Inaccurate or fraudulent data entry may result in
                  disciplinary action.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">4. System Monitoring</h2>
                <p className="text-gray-600 leading-relaxed">
                  All actions performed on the Admin Panel are monitored and logged for
                  security purposes. Any misuse or violation of terms may result in the
                  revocation of your access and further investigation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">5. Prohibited Activities</h2>
                <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-2">
                  <li>Sharing login credentials with unauthorized users.</li>
                  <li>Exporting or sharing sensitive patient or doctor data without proper authorization.</li>
                  <li>Using the system for any illegal or unauthorized purpose.</li>
                  <li>Attempting to hack, modify, or disrupt the platform's functionality.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  The Patient Management System is provided "as is" without any
                  guarantees or warranties. The organization is not responsible for any
                  damages arising from the use or inability to use the system.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">7. Termination of Access</h2>
                <p className="text-gray-600 leading-relaxed">
                  The organization reserves the right to revoke your access to the
                  system at any time, without prior notice, for any violation of these
                  terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">8. Amendments to the Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms and conditions may be updated or amended from time to time
                  without prior notice. It is your responsibility to regularly review
                  the terms and stay informed of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">9. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For any questions or concerns regarding these terms, please contact
                  the system administrator at <span className="text-[#10b981] font-bold">admin@patientmanagement.com</span>.
                </p>
              </section>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Agreement</h3>
              <p className="text-gray-600">
                By using this Admin Panel, you acknowledge that you have read,
                understood, and agreed to these terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
