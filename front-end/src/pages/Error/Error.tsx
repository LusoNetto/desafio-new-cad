import type { typeError } from './types/ErrorType';

const Error = ({ pageOfError }: typeError) => {
  return (
    <>
      <p>Ocorreu um erro ao carregar a pagina {pageOfError}</p>
    </>
  );
};

export default Error;
