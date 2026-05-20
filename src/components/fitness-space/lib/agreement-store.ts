// lib/agreement-store.ts
type AgreementState = {
  terms: boolean;
  privacy: boolean;
};

let agreementListeners: ((state: AgreementState) => void)[] = [];
let currentAgreementState: AgreementState = { terms: false, privacy: false };

export const updateAgreementState = (terms: boolean, privacy: boolean) => {
  currentAgreementState = { terms, privacy };
  
  // Call all listeners
  agreementListeners.forEach(listener => listener(currentAgreementState));
  
  // Dispatch custom event for components not using the listener pattern
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('fitness-space:agreement-changed', {
      detail: { terms, privacy }
    }));
  }
};

export const getAgreementState = (): AgreementState => {
  return currentAgreementState;
};

export const subscribeToAgreementState = (listener: (state: AgreementState) => void) => {
  agreementListeners.push(listener);
  return () => {
    agreementListeners = agreementListeners.filter(l => l !== listener);
  };
};