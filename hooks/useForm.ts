import { useState } from 'react';

export const useForm = <T extends object>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = (value: unknown, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const reset = () => {
    setState(initState);
  };

  return {
    ...state,
    form: state,
    onChange,
    reset,
  };
};
