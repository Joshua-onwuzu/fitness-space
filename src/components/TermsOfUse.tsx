"use client";

import {
  Container,
  Heading,
  Text,
  Stack,
  ListItem,
  ListRoot,
} from "@chakra-ui/react";

export default function TermsOfUse() {
  return (
    <Container maxW="4xl" py={16} color="white">
      <Stack gap={6}>
        <Heading size="lg" textAlign="center">
          Fitness Space
        </Heading>
        <Heading size="md" textAlign="center">
          Terms of Use
        </Heading>
        <Text fontWeight="bold">Last Updated: 06/12/2025</Text>
        {/* 1 */}
        <Heading size="md">1. Introduction & Acceptance of Terms</Heading>
        <Text>
          Welcome to Fitness Space ("we," "our," or "us"). Our application
          provides a digital platform that promotes a healthier lifestyle
          through guided home workouts, AI-assisted nutritional guidance,
          community support, and coaching.
        </Text>
        <Text>
          By accessing or using the Fitness Space website, mobile application,
          and services (collectively, the "Service"), you agree to be bound by
          these Terms of Use ("Terms"). If you do not agree to these Terms, you
          may not access or use the Service. Your use of the Service also
          constitutes your agreement to our Privacy Policy, which is
          incorporated herein by reference.
        </Text>
        <Text>
          The Service is not intended for users under the age of 16, and you
          must be at least 18 years old to use it. If you are between 16 and the
          age of majority in your jurisdiction, you must have your parent or
          guardian's permission to use the Service.
        </Text>
        {/* 2 */}
        <Heading size="md">
          2. Description of Service & Critical Disclaimer
        </Heading>
        <Text>
          Fitness Space provides a digital platform encompassing AI-personalised
          meal guidance, home workout programs, and community support led by
          expert coaches.
        </Text>
        <Text fontWeight="bold">Critical Disclaimer: No Medical Advice</Text>
        <Text>
          Fitness Space provides wellness information, fitness guidance, and
          community support. Our coaches are not licensed medical professionals,
          dieticians, or nutritionists unless explicitly stated. Even in cases
          where they are, the service is not intended to be, and does not
          constitute, medical advice, diagnosis, or treatment. You should always
          consult with a qualified healthcare professional before starting any
          new fitness or nutrition program, especially if you have any
          pre-existing medical conditions, are pregnant, or are post-partum.
        </Text>
        <Text fontWeight="bold">Acknowledgment of Inherent Risks</Text>
        <Text>
          You understand and acknowledge that participating in physical
          exercise, whether using our guided workouts or other content, carries
          inherent risks of injury, including serious injury or death. You
          voluntarily assume all such risks.
        </Text>
        {/* 3 */}
        <Heading size="md">3. User Account & Responsibilities</Heading>
        <Text>
          To access certain features, you must create an account. You agree to
          provide accurate and complete information and to keep this information
          updated.
        </Text>
        <Text fontWeight="semibold">You are responsible for:</Text>
        <ListRoot pl={4} gap={2}>
          <ListItem>
            Maintaining the confidentiality of your account credentials.
          </ListItem>
          <ListItem>All activities that occur under your account.</ListItem>
          <ListItem>
            Your own health and well-being. You represent that you are in good
            physical condition and have no medical condition that would prevent
            your safe participation in our programs. You agree to listen to your
            body and cease any activity that causes pain or severe discomfort.
          </ListItem>
        </ListRoot>
        {/* 4 */}
        <Heading size="md">4. Subscription, Fees, and Cancellation</Heading>
        <Text fontWeight="bold">4.1 Health Score-Based Dynamic Pricing</Text>
        <Text>
          Fitness Space uses a proprietary Health Score System to determine
          personalised subscription pricing for each user. Your subscription
          price is not fixed — it is dynamically calculated based on your level
          of participation and engagement during your 14-day trial period or the
          preceding 30-day subscription period. Higher engagement and activity
          levels result in greater discounts on your subscription price. This
          system is designed to reward your commitment to your fitness journey.
        </Text>
        <Text>
          Because pricing is personalised per user, no two users may pay the
          same amount. Your specific price will be calculated and presented to
          you at the point of payment initiation.
        </Text>
        <Text fontWeight="bold">4.2 Trial Period</Text>
        <Text>
          The Service offers a 14-day free trial period. During this period,
          your activity and participation are tracked to calculate your initial
          Health Score and determine your first subscription price upon trial
          completion.
        </Text>
        <Text fontWeight="bold">4.3 Subscription Duration</Text>
        <Text>
          Regular subscriptions run for a period of 30 days from the date of
          payment. At the end of each 30-day period, your Health Score is
          recalculated based on your participation during that period, and a new
          personalised price is presented to you for the next period.
        </Text>
        <Text fontWeight="bold">4.4 Manual Payment — No Automatic Renewal</Text>
        <Text>
          Fitness Space does not automatically renew subscriptions or charge
          your payment method without your explicit action. At the end of each
          subscription period, you must manually initiate a new payment to
          continue accessing the Service. You will not be charged unless you
          actively choose to renew.
        </Text>
        <Text fontWeight="bold">4.5 Payment Methods by Platform</Text>
        <Text fontWeight="semibold">iOS (Apple App Store):</Text>
        <Text>
          For users subscribing through the iOS app, payments are processed
          through Apple In-App Purchase (IAP). Apple manages all billing,
          payment processing, and receipts for iOS transactions. Your
          subscription pricing on iOS is based on the closest available Apple
          price tier to your calculated Health Score price. By purchasing
          through Apple IAP, you agree to Apple's payment terms and conditions.
          Apple Inc. is not a party to these Terms and has no responsibility for
          the Service or its content.
        </Text>
        <Text fontWeight="semibold">Android (Google Play):</Text>
        <Text>
          For users subscribing through the Android app, payments may be
          processed through Google Play Billing or Paystack, depending on your
          region and preference. Google Play's billing terms apply to
          transactions processed through Google Play.
        </Text>
        <Text fontWeight="semibold">Web (getfitness.space):</Text>
        <Text>
          For users subscribing through our website, payments are processed
          through Paystack. Full dynamic Health Score pricing with your exact
          personalised discount applies to web purchases. Paystack's terms and
          conditions apply to all web transactions.
        </Text>
        <Text fontWeight="bold">4.6 Refunds</Text>
        <Text>
          iOS purchases: Refunds for purchases made through Apple In-App
          Purchase are handled entirely by Apple in accordance with Apple's
          refund policy.
        </Text>
        <Text>
          Android/Google Play purchases: Refunds are subject to Google Play's
          refund policy.
        </Text>
        <Text>
          Web/Paystack purchases: Refunds are processed by Fitness Space and
          assessed case-by-case.
        </Text>
        <Text fontWeight="bold">4.7 Consumer Rights</Text>
        <Text>
          Users in the EU/UK and other jurisdictions may have additional
          statutory rights including a cooling-off period of up to 14 days.
        </Text>
        {/* 5 */}
        <Heading size="md">5. User Conduct & Community Guidelines</Heading>
        <Heading size="md" fontStyle="italic" fontWeight="medium">
          You agree not to use the Service to:
        </Heading>
        <ListRoot pl={4} gap={2}>
          <ListItem>
            Post any content that is unlawful, harmful, threatening, abusive,
            harassing, defamatory, or otherwise objectionable.
          </ListItem>
          <ListItem>
            Impersonate any person or entity, including a Fitness Space coach or
            employee.
          </ListItem>
          <ListItem>
            Post unauthorised medical advice or promote dangerous,
            non-scientific practices.
          </ListItem>
          <ListItem>
            {" "}
            Engage in body-shaming, harassment, or make derogatory comments
            about other users.
          </ListItem>
          <ListItem>Infringe upon any intellectual property rights.</ListItem>
        </ListRoot>
        <Text>
          We reserve the right, but are not obligated, to remove any user
          content and to suspend or terminate your account for any violation of
          these conduct rules, at our sole discretion.
        </Text>
        {/* 6 */}
        <Heading size="md">6. Intellectual Property</Heading>
        <Text>
          The Service, including its original content, features, functionality,
          design, and branding, are owned by Fitness Space and are protected by
          international copyright and intellectual property laws. We grant you a
          limited, non-exclusive, non-transferable license to access and use the
          Service for your personal, non-commercial use.
        </Text>
        <Text>
          You retain ownership of any content you post, such as progress photos
          or comments ("User Content"). By posting User Content, you grant
          Fitness Space a worldwide, royalty-free, sublicensable license to use,
          display, and distribute that content in connection with providing the
          Service.
        </Text>
        {/* 7 */}
        <Heading size="md">7. Disclaimers & Limitation of Liability</Heading>
        <Text>
          The Service and all content are provided on an "as is" and "as
          available" basis without any warranties of any kind. Fitness Space
          makes no guarantees, representations, or warranties regarding specific
          fitness, health, or weight-loss results. Individual results will vary
          based on a user's dedication, effort, genetics, diet, and other
          factors beyond our control.
        </Text>
        <Text>
          To the fullest extent permitted by law, Fitness Space, its directors,
          employees, and agents shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from (i) your access to or use of or
          inability to access or use the Service; (ii) any conduct or content of
          any third party on the Service; (iii) any content obtained from the
          Service; and (iv) any personal injury, health issues, or damages
          arising from your use of the workouts, meal plans, or other content
          provided by the Service.
        </Text>
        {/* 8 */}
        <Heading size="md">8. Termination</Heading>
        <Text>
          We may terminate or suspend your account and access to the Service
          immediately, without prior notice or liability, for any reason,
          including if you breach these Terms.
        </Text>
        {/* 9 */}
        <Heading size="md">9. Governing Law</Heading>
        <Text>
          These Terms shall be governed by the laws of the Federal Republic of
          Nigeria, without regard to its conflict of law provisions.
          Notwithstanding the foregoing, nothing in these Terms limits any
          rights you may have under the mandatory consumer protection laws of
          your country of residence, including but not limited to the European
          Union, United Kingdom, and United States consumer protection
          regulations. If you are a resident of any such jurisdiction, you
          retain all rights afforded to you under the applicable laws of your
          country, and those rights shall apply in addition to and shall not be
          overridden by these Terms.
        </Text>
        <Text>
          International Note: If you are a resident of the European Union,
          United Kingdom, or United States, you may also have rights under the
          mandatory consumer protection laws of your country of residence, and
          nothing in these Terms limits those rights.
        </Text>
        {/* 10 */}
        <Heading size="md">10. Changes to Terms</Heading>
        <Text>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. We will notify you of any material changes by
          posting the new Terms on this site, updating the "Last Updated" date,
          and/or by sending you an in-app notification. Your continued use of
          the Service after the effective date of the revised Terms constitutes
          your acceptance of them.
        </Text>
        {/* 11 */}
        <Heading size="md">11. Contact Us</Heading>
        <Text>
          If you have any questions about these Terms, please contact us at:
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Email:
          </Text>{" "}
          info@getfitness.space
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Address:
          </Text>{" "}
          46 Kenneth Road, Achara Layout, Enugu, Enugu State, Nigeria.
        </Text>
        {/* 12 */}
        <Heading size="md">12. Western Compliance Additions</Heading>
        <Heading size="md" fontStyle="italic" fontWeight="medium">
          Data Protection & Privacy (GDPR/CCPA)
        </Heading>
        <Text>
          Users located in the European Union, United Kingdom, and California
          have specific rights under applicable data protection laws (including
          the General Data Protection Regulation (GDPR) and the California
          Consumer Privacy Act (CCPA)). These rights include the ability to
          access, correct, delete, or restrict the processing of your personal
          data. Please refer to our Privacy Policy for details on how to
          exercise these rights.
        </Text>
        <Heading size="md" fontStyle="italic" fontWeight="medium">
          Age of Majority
        </Heading>
        <Text>
          In jurisdictions where the age of majority is 18, you must be at least
          18 years old to use the Service without parental consent. If you are
          between 16 and 18, you may only use the Service with verifiable
          parental or guardian consent.
        </Text>
        <Heading size="md" fontStyle="italic" fontWeight="medium">
          {" "}
          Dispute Resolution / Arbitration
        </Heading>
        <Text>
          If you are a resident of the United States, any dispute arising out of
          or relating to these Terms or the Service shall be resolved through
          binding arbitration in accordance with the rules of the American
          Arbitration Association. Arbitration shall take place in English and
          in a location mutually agreed upon. Users outside the United States
          may have rights to bring claims in their local courts under applicable
          consumer protection laws.
        </Text>
        {/* 13 */}
        <Heading size="md">13. Apple Inc. — Third-Party Beneficiary</Heading>
        <Text>
          These Terms of Use are entered into between you and Fitness Space
          only, and not with Apple Inc. ("Apple"). Apple is not responsible for
          the Fitness Space application or its content. Apple has no obligation
          whatsoever to furnish any maintenance and support services with
          respect to the application.
        </Text>
        <Text>
          In the event of any failure of the application to conform to any
          applicable warranty, you may notify Apple, and Apple will refund the
          purchase price for the application to you (if applicable). To the
          maximum extent permitted by applicable law, Apple will have no other
          warranty obligation whatsoever with respect to the application.
        </Text>
        <Text>
          Apple is not responsible for addressing any claims by you or any third
          party relating to the application or your possession and/or use of the
          application, including but not limited to: (i) product liability
          claims; (ii) any claim that the application fails to conform to any
          applicable legal or regulatory requirement; and (iii) claims arising
          under consumer protection, privacy, or similar legislation.
        </Text>
        <Text>
          Apple and Apple's subsidiaries are third-party beneficiaries of these
          Terms of Use. Upon your acceptance of these Terms, Apple will have the
          right (and will be deemed to have accepted the right) to enforce these
          Terms against you as a third-party beneficiary thereof.
        </Text>
        {/* Footer */}
        <Text mt={10} fontSize="sm" textAlign="center">
          © 2025 Fitness Space. All rights reserved. | getfitness.space
        </Text>
      </Stack>
    </Container>
  );
}