import { TaskEither, chain, right } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { LoggerService } from '@nestjs/common';
import { RuntypeBase } from 'runtypes/lib/runtype';

export const fromUnknown = <Data>(
  unknownValue: unknown,
  validator: RuntypeBase<Data>,
  logger: LoggerService,
  dataKind: string,
): TaskEither<Error, Data> => {
  return pipe(
    right(unknownValue),
    chain(validateWith(validator)),
    handleLog(logger),
  );
};
