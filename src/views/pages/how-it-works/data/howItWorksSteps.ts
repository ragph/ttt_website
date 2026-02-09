export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  note?: string;
  steps: Step[];
}

export const howItWorksSections: Section[] = [
  {
    id: 'topup',
    title: 'How to Top Up',
    subtitle: 'Add credits to your account',
    description:
      'Easily add prepaid credits to your account using various payment methods. Your credits are instantly available for in-app services and transactions.',
    image: '/images/et-topup.png',
    steps: [
      {
        id: 'topup-step-1',
        title: 'Open Credits',
        description:
          'Navigate to your credits by tapping the credits icon in your dashboard or menu.',
      },
      {
        id: 'topup-step-2',
        title: 'Select Top Up',
        description:
          'Choose the "Top Up" option to begin adding credits to your account.',
      },
      {
        id: 'topup-step-3',
        title: 'Enter Amount',
        description:
          'Input the amount you wish to add. You can choose from preset amounts or enter a custom value.',
      },
      {
        id: 'topup-step-4',
        title: 'Confirm Payment',
        description:
          'Review the details and confirm your payment using your preferred payment method.',
      },
    ],
  },
  {
    id: 'payout',
    title: 'How to Payout',
    subtitle: 'Payout your credits',
    description:
      'Receive your earnings and rewards directly to your bank account or local e-wallet. Fast, secure, and hassle-free payouts.',
    // note: 'Important: This payout is processed via Wise. In some cases, Wise requires recipients to manually accept incoming funds.\n\nIf the amount does not reflect immediately, please log in to your Wise account or check your email for an acceptance request.',
    image: '/images/et-payout.png',
    steps: [
      {
        id: 'payout-step-1',
        title: 'Go to Payouts',
        description:
          'Access the Payouts section from your credits or account settings.',
      },
      {
        id: 'payout-step-2',
        title: 'Select Destination',
        description:
          'Choose where you want to receive your credits: bank account, e-wallet, or other supported methods.\nFor WISE transfers, it requires recipients to manually accept incoming funds. If the amount does not reflect immediately, please log in to your Wise account or check your email for an acceptance request',
      },
      {
        id: 'payout-step-3',
        title: 'Submit Request',
        description:
          'Enter the amount to payout, review the fees, and submit your payout request for processing.',
      },
    ],
  },
  {
    id: 'convert',
    title: 'How to Convert',
    subtitle: 'Exchange your credits',
    description:
      'Convert your rewards credits to prepaid credits instantly with zero service fees.',
    image: '/images/et-convert.png',
    steps: [
      {
        id: 'convert-step-1',
        title: 'Open Convert Tool',
        description:
          'Navigate to the Convert section from your dashboard or credits menu.',
      },
      {
        id: 'convert-step-2',
        title: 'Confirm Conversion',
        description:
          'Simply confirm to complete conversion instantly. Use converted credits right away.',
      },
      // {
      //   id: 'convert-step-3',
      //   title: 'Confirm Conversion',
      //   description:
      //     'Review the exchange rate and fees, then confirm to complete the conversion instantly.',
      // },
    ],
  },
];
