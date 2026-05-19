"use client";

import {
  Container,
  Heading,
  Text,
  Stack,
  ListItem,
  ListRoot,
} from "@chakra-ui/react";

export default function PrivacyPolicy() {
  return (
    <Container maxW="4xl" py={16} color="white">
      <Stack gap={6}>
        <Heading size="lg" textAlign="center">
          Fitness Space
        </Heading>
        <Heading size="md" textAlign="center">
          Privacy Policy
        </Heading>
        <Text fontWeight="bold">Last Updated: 06/12/2025</Text>
        {/* 1 */}
        <Heading size="md">1. Introduction</Heading>
        <Text>
          Welcome to Fitness Space. We are committed to protecting your privacy
          and being fully transparent about how we handle your information. This
          Privacy Policy explains what data we collect, why we collect it, how
          we use it, and your rights in relation to it — across our iOS app,
          Android app, and website (getfitness.space).
        </Text>
        <Text>
          By using Fitness Space, you agree to the practices described in this
          policy. If you do not agree, please do not use the Service.
        </Text>
        {/* 2 */}
        <Heading size="md">2. Information We Collect</Heading>
        <Text>
          We collect the following categories of information to provide and
          improve our Service:
        </Text>
        <Text fontWeight="semibold">Account Information</Text>
        <Text>
          Your name, email address, and password when you create an account.
        </Text>
        <Text fontWeight="semibold">
          Health and Fitness Information (Sensitive Data)
        </Text>
        <ListRoot pl={4} gap={2}>
          <ListItem>Body weight, height, and body measurements</ListItem>
          <ListItem>
            Dietary preferences, food intolerances, and nutritional goals
          </ListItem>
          <ListItem>
            Medical conditions and health history (where voluntarily disclosed)
          </ListItem>
          <ListItem>Health and fitness goals</ListItem>
          <ListItem>
            Workout activity data: exercise logs, completed workouts, sets,
            reps, and duration
          </ListItem>
          <ListItem>
            Meal logging data: food entries, calorie tracking, and meal photos
            captured via your device camera
          </ListItem>
          <ListItem>
            Apple Health / Google Fit data: if you grant permission, we sync
            activity and health metrics such as steps, heart rate, and calories
            burned from Apple Health (iOS) or Google Fit (Android). This data is
            used solely to personalise your fitness experience and is never
            shared with third parties for advertising purposes.
          </ListItem>
        </ListRoot>
        <Text>
          <Text as="span" fontWeight="bold">
            Camera Access
          </Text>{" "}
          We request access to your device camera solely for the purpose of
          capturing meal photos for food logging. We do not access your camera
          at any other time, and photos are not shared with third parties except
          your assigned coach for guidance purposes.
        </Text>
        <Text fontWeight="semibold">Health Score Data</Text>
        <Text>
          Fitness Space uses a proprietary Health Score System that analyses
          your participation, activity levels, and engagement over your 14-day
          trial or 30-day subscription period. This score is used to calculate
          your personalised subscription pricing. The Health Score is generated
          through automated processing of your activity data. See Section 3 for
          full details on this automated decision-making process.
        </Text>
        <Text fontWeight="semibold">Community Content</Text>
        <Text>
          Any messages, posts, or photos you share in the community forums. Your
          community content is visible to other users of the platform.
        </Text>
        <Text fontWeight="semibold">Push Notification Data</Text>
        <Text>
          If you grant permission, we send push notifications to your device
          regarding workout reminders, coaching messages, subscription status,
          and Health Score updates. You can manage notification preferences in
          your device settings at any time.
        </Text>
        <Text fontWeight="semibold">Technical and Usage Data</Text>
        <Text>
          Information collected automatically when you use the Service,
          including:
        </Text>
        <ListRoot pl={4} gap={2}>
          <ListItem>
            IP address and approximate location (country/region level)
          </ListItem>
          <ListItem>Device type, operating system, and app version</ListItem>
          <ListItem>
            Features used, screens visited, and time spent in the app
          </ListItem>
          <ListItem>Crash reports and performance diagnostics</ListItem>
        </ListRoot>
        <Text>
          This data is collected and analysed only within Fitness Space. We do
          not use it to track you across other apps or websites.
        </Text>
        <Text fontWeight="semibold">Payment Information</Text>
        <Text>
          iOS payments are processed via Apple IAP. Android and web payments are
          processed via Paystack or Google Play. We do not store full card
          details.
        </Text>
        {/* 3 */}
        <Heading size="md">3. How We Use Your Information</Heading>
        <Text>
          We use your information for the following specific purposes:
        </Text>
        <Text fontWeight="semibold">
          To Provide and Personalise the Service
        </Text>
        <Text>
          We use your Health and Fitness Information to create your personalised
          meal and workout plans, track your progress, and tailor your
          experience to your goals.
        </Text>
        <Text fontWeight="semibold">
          To Calculate Your Health Score (Automated Decision-Making)
        </Text>
        <Text>
          We use your activity and participation data to automatically calculate
          your Health Score. This score directly determines the discount applied
          to your personalised subscription price. This constitutes automated
          decision-making that has a financial effect on you.
        </Text>
        <Text fontWeight="semibold">Specifically, the system evaluates:</Text>
        <ListRoot pl={4} gap={2}>
          <ListItem>Number of workouts completed in the period</ListItem>
          <ListItem>Meal logging consistency</ListItem>
          <ListItem>Community engagement and participation</ListItem>
          <ListItem>Coaching session attendance and responsiveness</ListItem>
        </ListRoot>
        <Text>
          The resulting Health Score maps to a discount tier that determines
          your subscription price for the next 30-day period. You have the right
          to request a human review of your Health Score and its impact on your
          pricing by contacting us at info@getfitness.space. Under GDPR, EU and
          UK users have the right to object to solely automated decisions that
          significantly affect them.
        </Text>
        <Text fontWeight="semibold">To Facilitate Coaching</Text>
        <Text>
          Your Health and Fitness Information is shared with your assigned
          Fitness Space coach to enable personalised guidance and feedback. All
          coaches are employed by Fitness Space and are bound by strict
          confidentiality agreements. Coaches are contractually prohibited from
          disclosing, misusing, or retaining your personal data outside of the
          Service. Data shared with a coach during your active subscription is
          protected under the same security standards as all other personal data
          we hold.
        </Text>
        <Text fontWeight="semibold">To Enable Community</Text>
        <Text>
          We use your Community Content to operate the community forums. Your
          posts are visible to other users. Your sensitive health data is never
          displayed publicly in the community.
        </Text>
        <Text fontWeight="semibold">To Communicate With You</Text>
        <Text>
          We use your Account Information and push notification permissions to
          send you service-related announcements, coaching messages,
          subscription reminders, and Health Score notifications.
        </Text>
        <Text fontWeight="semibold">To Improve Our Service</Text>
        <Text>
          We use Technical and Usage Data to analyse trends, diagnose
          performance issues, and improve the app. This analysis is conducted
          only within Fitness Space and is not used for cross-app advertising or
          profiling.
        </Text>
        <Text fontWeight="semibold">To Comply With Legal Obligations</Text>
        <Text>
          We may process or disclose data where required by applicable law,
          court order, or regulatory authority.
        </Text>
        {/* 4 */}
        <Heading size="md">4. How We Share Your Information</Heading>
        <Text fontWeight="semibold">
          We do not and will never sell your personal data.
        </Text>
        <Text>
          We only share your information in the following limited circumstances:
        </Text>
        <Text fontWeight="semibold">With Your Coaches</Text>
        <Text>
          Your health, fitness, and meal data is shared with your assigned
          Fitness Space coach for the purpose of delivering personalised
          coaching. Coaches are employees and are bound by confidentiality
          agreements. They are authorised to access only the data necessary to
          provide your coaching service.
        </Text>
        <Text fontWeight="semibold">With Other Users (Community)</Text>
        <Text>
          We share data with strictly vetted companies that help us operate the
          Service:
        </Text>
        <ListRoot pl={4} gap={2}>
          <ListItem>
            Cloud Hosting (e.g. Amazon Web Services): to store your data
            securely.
          </ListItem>
          <ListItem>
            Analytics (Google Analytics): to understand how the app is used and
            improve our Service. Google Analytics is configured to operate only
            within Fitness Space and does not track you across other apps or
            websites. Data is aggregated and anonymised where possible.
          </ListItem>
          <ListItem>
            Payment Processing (Paystack, Apple, Google): to handle subscription
            payments by platform. We do not store full payment card details.
          </ListItem>
          <ListItem>
            Push Notification Services: to deliver in-app and device
            notifications.
          </ListItem>
        </ListRoot>
        <Text fontWeight="semibold">
          All service providers are contractually required to process your data
          only as instructed by us and in accordance with applicable data
          protection laws.
        </Text>
        <Text fontWeight="semibold">Apple Health / Google Fit</Text>
        <Text>
          Data synced from Apple Health or Google Fit is used solely within
          Fitness Space to personalise your experience. It is never shared with
          third-party advertisers, analytics platforms, or any other external
          service.
        </Text>
        <Text fontWeight="semibold">For Legal Reasons</Text>
        <Text>
          We may disclose your information if required by law, legal process, or
          to protect the rights, property, or safety of Fitness Space, our
          users, or the public.
        </Text>
        {/* 5 */}
        <Heading size="md">5. App Tracking Transparency (iOS)</Heading>
        <Text>
          On iOS devices, Fitness Space complies with Apple's App Tracking
          Transparency (ATT) framework. We do not track you across other
          companies' apps or websites for advertising purposes.
        </Text>
        <Text>
          Our analytics (Google Analytics) are scoped exclusively to activity
          within Fitness Space. We do not use your data to serve targeted
          advertising, build advertising profiles, or share your data with
          advertising networks. You will not be prompted for ATT permission
          because we do not engage in cross-app tracking. If this changes in the
          future, we will update this policy and request your explicit
          permission before doing so.
        </Text>
        {/* 6 */}
        <Heading size="md">6. Apple Platform Disclosures</Heading>
        <Text>
          The following disclosures apply specifically to the iOS version of
          Fitness Space and are required under Apple's App Store guidelines:
        </Text>
        <Stack gap={4}>
          <Heading size="md">Device Permissions Used</Heading>
          <ListRoot pl={4} gap={2}>
            <ListItem>
              Camera: Used for meal photo logging only. Not accessed for any
              other purpose.
            </ListItem>
            <ListItem>
              Apple Health: Used to read and write fitness and health metrics
              with your explicit permission. You can revoke this permission at
              any time in iOS Settings.
            </ListItem>
            <ListItem>
              Push Notifications: Used to send workout reminders, coaching
              messages, and subscription alerts. Manageable in iOS Settings.
            </ListItem>
            <ListItem>
              Device Identifiers: Used for app functionality and analytics
              within Fitness Space only. Not used for cross-app advertising.
            </ListItem>
          </ListRoot>

          <Heading size="md">Required Reason APIs</Heading>
          <Text>
            Fitness Space uses the following Apple system APIs that require
            declared usage reasons:
          </Text>

          <ListRoot pl={4} gap={2}>
            <ListItem>
              UserDefaults: Used to store your in-app preferences and settings.
            </ListItem>
            <ListItem>
              File Timestamp APIs: Used to manage local data caching for offline
              workout access.
            </ListItem>
            <ListItem>
              Disk Space APIs: Used to ensure sufficient storage is available
              before downloading workout content.
            </ListItem>
            <ListItem>
              Active Keyboard API: Used to optimise text input fields for food
              logging and community posting.
            </ListItem>
          </ListRoot>

          <Heading size="md">Data Not Collected on iOS</Heading>

          <ListRoot pl={4} gap={2}>
            <ListItem>
              We do not collect precise real-time location data.
            </ListItem>
            <ListItem>
              We do not access your contacts, calendar, or microphone.
            </ListItem>
            <ListItem>
              We do not collect or store Apple ID credentials.
            </ListItem>
            <ListItem>
              We do not use your data for targeted advertising.
            </ListItem>
          </ListRoot>
        </Stack>
        {/* 7 */}
        <Heading size="md">7. Data Security</Heading>
        <Text>
          We implement industry-standard security measures to protect your
          personal information from unauthorised access, alteration, disclosure,
          or destruction. These measures include encrypted data transmission
          (TLS), secure cloud storage, access controls, and confidentiality
          agreements with all staff who handle personal data.
        </Text>
        <Text>
          However, no method of transmission over the Internet is 100% secure.
          While we strive to use commercially acceptable means to protect your
          data, we cannot guarantee its absolute security. In the event of a
          data breach that affects your rights and freedoms, we will notify you
          and relevant authorities as required by applicable law.
        </Text>
        {/* 8 */}
        <Heading size="md">8. Your Rights</Heading>
        <Text>You have meaningful control over your personal data:</Text>
        <Text fontWeight="semibold">Access & Correction </Text>
        <Text>
          View and update your personal data directly in the app via your
          profile settings.
        </Text>
        <Text fontWeight="semibold">Data Portability</Text>
        <Text>
          Request a copy of your personal data in a machine-readable format by
          contacting support@getfitness.space.
        </Text>
        <Text fontWeight="semibold">Deletion</Text>
        <Text>
          Request the deletion of your account and all associated personal data
          by contacting support@getfitness.space. Requests will be processed
          within 30 days, subject to any legal retention obligations.
        </Text>
        <Text fontWeight="semibold">
          Objection to Automated Decision-Making
        </Text>
        <Text>
          You have the right to request a human review of any automated decision
          made by our Health Score system that affects your subscription
          pricing. Contact info@getfitness.space to exercise this right.
        </Text>
        <Text fontWeight="semibold">Withdraw Consent</Text>
        <Text>
          Where processing is based on your consent (e.g. Apple Health
          integration, push notifications), you may withdraw consent at any time
          through your device settings. Withdrawal does not affect the
          lawfulness of processing before withdrawal.
        </Text>
        {/* 9 */}
        <Heading size="md">
          9. Additional Rights for EU and UK Users (GDPR/UK GDPR)
        </Heading>
        <Text fontWeight="semibold"> Right to Object</Text>
        <Text>
          You may object to the processing of your personal data for certain
          purposes, including automated decision-making that significantly
          affects you (such as Health Score pricing).
        </Text>
        <Text fontWeight="semibold">Right to Restrict Processing</Text>
        <Text>
          You may request that we limit how we process your data in certain
          circumstances, for example while a dispute about accuracy is being
          resolved.
        </Text>
        <Text fontWeight="semibold">Right to Lodge a Complaint</Text>
        <Text>
          You have the right to lodge a complaint with your local data
          protection authority if you believe your rights have been violated. In
          the EU, this is your national Data Protection Authority (DPA). In the
          UK, this is the Information Commissioner's Office (ICO) at ico.org.uk.
        </Text>

        {/* Legal Basis */}
        <Heading size="md">Legal Basis for Processing</Heading>
        <Text>
          We process your personal data under the following legal bases:
        </Text>

        <ListRoot pl={4} gap={2}>
          <ListItem>
            Consent: When you provide health and fitness information, grant
            camera or Apple Health access, or enable push notifications.
          </ListItem>
          <ListItem>
            Contract: When processing is necessary to fulfil your subscription
            and deliver the coaching service.
          </ListItem>
          <ListItem>
            Legitimate Interests: For technical analytics and service
            improvement, where our interests are not overridden by your rights.
          </ListItem>
          <ListItem>
            Legal Obligation: Where required by applicable law.
          </ListItem>
        </ListRoot>

        {/* EU/UK Representative */}
        <Heading size="md">EU/UK Representative</Heading>
        <Text>
          As Fitness Space is operated from Nigeria and processes data of EU and
          UK residents, we are committed to honouring all GDPR and UK GDPR
          rights. For all data protection enquiries relating to EU or UK users,
          please contact us directly at info@getfitness.space. We will respond
          within the statutory timeframe of 30 days.
        </Text>

        {/* 10 */}
        <Heading size="md">10. California Privacy Rights (CCPA)</Heading>
        <Text>
          If you are a resident of California, you have the following rights
          under the California Consumer Privacy Act (CCPA):
        </Text>

        <ListRoot pl={4} gap={2}>
          <ListItem>
            Right to Know: Request disclosure of the categories and specific
            pieces of personal information we collect about you.
          </ListItem>
          <ListItem>
            Right to Delete: Request deletion of your personal information,
            subject to certain exceptions.
          </ListItem>
          <ListItem>
            Right to Opt Out of Sale: We do not sell personal data. However, you
            have the right to opt out of any future sale.
          </ListItem>
          <ListItem>
            Right to Non-Discrimination: You will not be discriminated against
            for exercising your privacy rights.
          </ListItem>
        </ListRoot>
        {/* 11 */}
        <Heading size="md">11. International Data Transfers</Heading>
        <Text>
          Fitness Space is operated from Nigeria. Your data may be processed by
          our service providers in other countries, including the United States
          (Amazon Web Services, Google Analytics). We ensure that appropriate
          legal safeguards are in place for such transfers, including standard
          contractual clauses where required under GDPR.
        </Text>

        {/* 12 */}
        <Heading size="md">12. Cookies & Tracking Technologies</Heading>

        <Heading size="sm">Website (getfitness.space)</Heading>
        <Text>
          Our website uses cookies and similar tracking technologies to improve
          your experience and analyse usage. Cookies are small files stored on
          your device. You can manage or disable cookies through your browser
          settings. Disabling cookies may affect certain website functionality.
        </Text>

        <Heading size="sm">Mobile App</Heading>
        <Text>
          Our mobile apps do not use browser cookies. We use anonymised in-app
          analytics (Google Analytics for Firebase) to understand how the app is
          used. This tracking is limited to activity within Fitness Space and is
          not used for cross-app advertising. On iOS, this operates in
          compliance with Apple's App Tracking Transparency framework.
        </Text>

        {/* 13 */}
        <Heading size="md">13. Data Retention</Heading>
        <Text>
          We retain your personal data only for as long as necessary. The
          following approximate timeframes apply:
        </Text>

        <ListRoot pl={4} gap={2}>
          <ListItem>
            Account Information: Retained for the duration of your account plus
            90 days after account deletion, to allow for reactivation requests.
          </ListItem>
          <ListItem>
            Health and Fitness Data: Retained for the duration of your active
            subscription. Upon account deletion, health data is permanently
            deleted within 30 days unless longer retention is required by law.
          </ListItem>
          <ListItem>
            Health Score Data: Retained for the current and immediately
            preceding subscription period only, then deleted.
          </ListItem>
          <ListItem>
            Community Content: Retained until you delete it or request account
            deletion.
          </ListItem>
          <ListItem>
            Payment Records: Transaction records retained for 7 years to comply
            with financial and tax obligations.
          </ListItem>
          <ListItem>
            Technical and Usage Data: Retained in aggregated, anonymised form
            for up to 24 months for analytics purposes.
          </ListItem>
          <ListItem>
            Coach Interaction Data: Coaching notes and interactions retained for
            the duration of your active subscription plus 60 days, then deleted.
          </ListItem>
        </ListRoot>

        {/* 14 */}
        <Heading size="md">14. Children's Privacy</Heading>
        <Text>
          Fitness Space is not intended for users under the age of 16. We do not
          knowingly collect personal information from children under 16. If we
          become aware that we have collected data from a child under 16 without
          verifiable parental consent, we will delete that information promptly.
          If you believe a minor has provided us with personal data, please
          contact us at info@getfitness.space.
        </Text>

        {/* 15 */}
        <Heading size="md">15. Changes to This Policy</Heading>
        <Text>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, legal requirements, or other factors. We
          will notify you of any material changes by posting the updated policy
          on this site, updating the "Last Updated" date, and sending you an
          in-app notification. Your continued use of the Service after such
          changes constitutes your acceptance of the revised policy.
        </Text>

        {/* 16 */}
        <Heading size="md">16. Contact Us</Heading>

        <Text>
          <Text as="span" fontWeight="bold">
            Email:
          </Text>{" "}
          info@getfitness.space
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            Support:
          </Text>{" "}
          support@getfitness.space
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            Address:
          </Text>{" "}
          46 Kenneth Street, Achara Layout, Enugu, Enugu State, Nigeria.
        </Text>

        <Text>Website: getfitness.space</Text>

        <Text mt={6} textAlign="center" fontSize="sm">
          © 2025 Fitness Space. All rights reserved. | getfitness.space
        </Text>
      </Stack>
    </Container>
  );
}