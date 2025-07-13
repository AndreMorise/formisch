import clsx from 'clsx';
import { JSX, Show } from 'solid-js';
import { InputErrors } from './InputErrors';

type CheckboxProps = {
  class?: string;
  name: string;
  label?: string;
  value?: string;
  input: boolean | undefined;
  required?: boolean;
  errors: [string, ...string[]] | null;
  ref: (element: HTMLInputElement) => void;
  onFocus: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

/**
 * Checkbox that allows users to select an option. The label next to the
 * checkbox describes the selection option.
 */
export function Checkbox(props: CheckboxProps) {
  return (
    <div class={clsx('px-8 lg:px-10', props.class)}>
      <label class="flex select-none space-x-4 font-medium md:text-lg lg:text-xl">
        <input
          {...props}
          class="mt-1 h-4 w-4 cursor-pointer lg:mt-1 lg:h-5 lg:w-5"
          type="checkbox"
          id={props.name}
          value={props.value}
          checked={props.input}
          aria-invalid={!!props.errors}
          aria-errormessage={`${props.name}-error`}
        />
        <span>{props.label}</span>{' '}
        <Show when={props.required}>
          <span class="ml-1 text-red-600 dark:text-red-400">*</span>
        </Show>
      </label>
      <InputErrors name={props.name} errors={props.errors} />
    </div>
  );
}
