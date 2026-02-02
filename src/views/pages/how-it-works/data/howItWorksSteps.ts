export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

export const howItWorksSections: Section[] = [
  {
    id: 'topup',
    title: 'How to Top Up',
    subtitle: 'Add credits to your wallet in 4 easy steps',
    steps: [
      {
        id: 'topup-step-1',
        title: 'Open Wallet',
        description:
          'Navigate to your wallet by tapping the wallet icon in your dashboard or menu.',
      },
      {
        id: 'topup-step-2',
        title: 'Select Top Up',
        description:
          'Choose the "Top Up" option to begin adding funds to your account.',
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
    subtitle: 'Withdraw your funds in 3 simple steps',
    steps: [
      {
        id: 'payout-step-1',
        title: 'Go to Payouts',
        description:
          'Access the Payouts section from your wallet or account settings.',
      },
      {
        id: 'payout-step-2',
        title: 'Select Destination',
        description:
          'Choose where you want to receive your funds: bank account, e-wallet, or other supported methods.',
      },
      {
        id: 'payout-step-3',
        title: 'Submit Request',
        description:
          'Enter the amount to withdraw, review the fees, and submit your payout request for processing.',
      },
    ],
  },
  {
    id: 'convert',
    title: 'How to Convert',
    subtitle: 'Exchange between currencies or assets in 3 steps',
    steps: [
      {
        id: 'convert-step-1',
        title: 'Open Convert Tool',
        description:
          'Navigate to the Convert section from your dashboard or wallet menu.',
      },
      {
        id: 'convert-step-2',
        title: 'Select Assets',
        description:
          'Choose the asset or currency you want to convert from and the target asset you want to receive.',
      },
      {
        id: 'convert-step-3',
        title: 'Confirm Conversion',
        description:
          'Review the exchange rate and fees, then confirm to complete the conversion instantly.',
      },
    ],
  },
];
