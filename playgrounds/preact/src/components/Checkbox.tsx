import { ReadonlySignal } from '@preact/signals';
import clsx from 'clsx';
import type { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { InputErrors } from './InputErrors';

type CheckboxProps = {
  class?: string;
  name: string;
  label?: string;
  value?: string;
  input: ReadonlySignal<boolean | undefined>;
  required?: boolean;
  errors: ReadonlySignal<[string, ...string[]] | null>;
  ref: (element: HTMLInputElement) => void;
  onFocus: JSX.FocusEventHandler<HTMLInputElement>;
  onInput: JSX.InputEventHandler<HTMLInputElement>;
  onChange: JSX.GenericEventHandler<HTMLInputElement>;
  onBlur: JSX.FocusEventHandler<HTMLInputElement>;
};

/**
 * Checkbox that allows users to select an option. The label next to the
 * checkbox describes the selection option.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, value, input, errors, ...props }: CheckboxProps) => {
    const { name, required } = props;
    return (
      <div class={clsx('px-8 lg:px-10', props.class)}>
        <label class="flex select-none space-x-4 font-medium md:text-lg lg:text-xl">
          <input
            {...props}
            class="mt-1 h-4 w-4 cursor-pointer lg:mt-1 lg:h-5 lg:w-5"
            type="checkbox"
            id={name}
            value={value}
            checked={input}
            aria-invalid={!!errors?.value}
            aria-errormessage={`${name}-error`}
          />
          <span>{label}</span>{' '}
          {required && (
            <span class="ml-1 text-red-600 dark:text-red-400">*</span>
          )}
        </label>
        <InputErrors name={name} errors={errors} />
      </div>
    );
  }
);
