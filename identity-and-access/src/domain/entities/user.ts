import { Record, Static } from 'runtypes';
import { LoggerService } from '@nestjs/common';
import { TaskEither } from 'fp-ts/lib/TaskEither';

import { UUID } from '@identity-and-access/domain/value-objects/uuid';
import { HashedPassword } from '@identity-and-access/domain/value-objects/password';
import { ContactInformation } from '@identity-and-access/domain/value-objects/contactInformation';

export const UserId = UUID.withBrand('UserId');
export type UserId = Static<typeof UserId>;

export const User = Record({
  id: UserId,
  password: HashedPassword,
  contactInformation: ContactInformation,
});
export type User = Static<typeof User>;

export const verifiedUserEmail = (
  user: User,
  logger: LoggerService,
): TaskEither<Error, User> => {
  return fromUnknow({});
};
