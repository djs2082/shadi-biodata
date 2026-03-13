import React from 'react';

const raw = `Privacy Policy

Introduction
This Privacy Policy describes how Joshi Solutions and its affiliates (collectively "Joshi Solutions, we, our, us") collect, use, share, protect or otherwise process your information/ personal data through our website https://shadibiodata.com (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.

Collection
We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address. Some sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (to enable certain features when opted for), all in accordance with applicable law(s). You always have the option to not provide information by choosing not to use a particular service or feature on the Platform.

Usage
We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information.

Sharing
We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment providers opted by you. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process.

Security Precautions
To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. However, transmission of information over the internet is not completely secure and there are inherent risks regarding use of the Platform.

Data Deletion and Retention
You have an option to delete your account by visiting your profile and settings on our Platform. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. We may retain data in anonymised form for analytical and research purposes.

Your Rights & Consent
You may access, rectify, and update your personal data directly through the functionalities provided on the Platform. By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy.

Changes to this Privacy Policy
Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices.

Grievance Officer
Insert Name of the Office:
Designation:
Insert Name and Address of the Company:

Contact us:
Phone: Time: Monday - Friday(9:00 - 18:00)
`;

const Privacy: React.FC = () => {
  return (
    <div className="terms-page">
      {raw.split(/\n\n+/).map((b, i) => {
        const t = b.trim();
        if (!t) return null;
        if (/^Privacy Policy/i.test(t)) return <h1 key={i}>{t}</h1>;
        if (
          /^Introduction|Collection|Usage|Sharing|Security Precautions|Data Deletion and Retention|Your Rights|Consent|Changes to this Privacy Policy|Grievance Officer|Contact us/i.test(
            t
          )
        )
          return <h2 key={i}>{t}</h2>;
        return <p key={i}>{t}</p>;
      })}
    </div>
  );
};

export default Privacy;
