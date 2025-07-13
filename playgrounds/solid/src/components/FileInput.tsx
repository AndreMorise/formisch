import clsx from 'clsx';
import { createMemo, JSX } from 'solid-js';
import { InputErrors } from './InputErrors';
import { InputLabel } from './InputLabel';

type FileInputProps = {
  class?: string;
  name: string;
  label?: string;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
  input: File | File[] | null | undefined;
  errors: [string, ...string[]] | null;
  ref: (element: HTMLInputElement) => void;
  onFocus: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

/**
 * File input field that users can click or drag files into. Various
 * decorations can be displayed in or around the field to communicate the entry
 * requirements.
 */
export function FileInput(props: FileInputProps) {
  // Create memoized value of selected files
  const getFiles = createMemo(() =>
    props.input
      ? Array.isArray(props.input)
        ? props.input
        : [props.input]
      : []
  );

  return (
    <div class={clsx('px-8 lg:px-10', props.class)}>
      <InputLabel
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <label
        class={clsx(
          'relative flex min-h-[96px] w-full items-center justify-center rounded-2xl border-[3px] border-dashed border-slate-200 p-8 text-center focus-within:border-sky-600/50 hover:border-slate-300 md:min-h-[112px] md:text-lg lg:min-h-[128px] lg:p-10 lg:text-xl dark:border-slate-800 dark:focus-within:border-sky-400/50 dark:hover:border-slate-700',
          !getFiles()?.length && 'text-slate-500'
        )}
      >
        {getFiles()?.length
          ? `Selected file${props.multiple ? 's' : ''}: ${getFiles()
              .map((file) => file?.name)
              .join(', ')}`
          : `Click or drag and drop file${props.multiple ? 's' : ''}`}
        <input
          {...props}
          class="absolute h-full w-full cursor-pointer opacity-0"
          type="file"
          id={props.name}
          aria-invalid={!!props.errors}
          aria-errormessage={`${props.name}-error`}
        />
      </label>
      <InputErrors name={props.name} errors={props.errors} />
    </div>
  );
}
