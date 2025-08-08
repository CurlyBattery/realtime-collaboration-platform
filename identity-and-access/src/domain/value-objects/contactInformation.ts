import { Record, Static } from 'runtypes';
import { VerificationCode4 } from '@identity-and-access/domain/value-objects/verificationCode4';
import { Email } from '@notifications/domain/value-objects/email';

export const ContactInformation = Record({
  email: Email,
  verificationCode: VerificationCode4,
  isVerified: Boolean,
});

export type ContactInformation = Static<typeof ContactInformation>;
