import React from "react";

interface SelectFieldProps {
  label: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  onChange,
  value,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <select className="form-input" onChange={onChange} value={value || ""}>
      <option value="">Selecione</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

interface NumberFieldProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  value?: string | number;
  placeholder?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  onChange,
  min = 0,
  max,
  step = 1,
  value,
  placeholder,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type="number"
      min={min}
      max={max}
      step={step}
      className="form-input"
      onChange={onChange}
      value={value || ""}
      placeholder={placeholder}
    />
  </div>
);

interface TextFieldProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  onChange,
  value,
  placeholder,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type="text"
      className="form-input"
      onChange={onChange}
      value={value || ""}
      placeholder={placeholder}
    />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  onChange,
  value,
  placeholder,
  rows = 4,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <textarea
      className="form-input min-h-[100px] resize-none"
      onChange={onChange}
      value={value || ""}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

interface RangeFieldProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeField: React.FC<RangeFieldProps> = ({
  label,
  onChange,
  value = 0,
  min = 0,
  max = 10,
  step = 1,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="range-slider flex-1"
        onChange={onChange}
      />
      <span className="w-10 text-sm text-right text-primary font-semibold">
        {value}
      </span>
    </div>
  </div>
);

interface ToggleButtonsProps {
  label: string;
  value: "sim" | "nao" | "";
  onChange: (value: "sim" | "nao") => void;
  yesVariant?: "destructive" | "primary";
}

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  label,
  value,
  onChange,
  yesVariant = "destructive",
}) => (
  <div>
    <p className="form-label">{label}</p>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange("sim")}
        className={`toggle-btn ${
          value === "sim"
            ? yesVariant === "destructive"
              ? "toggle-btn-yes-active"
              : "toggle-btn-neutral-active"
            : "toggle-btn-inactive"
        }`}
      >
        Sim
      </button>
      <button
        type="button"
        onClick={() => onChange("nao")}
        className={`toggle-btn ${
          value === "nao" ? "toggle-btn-no-active" : "toggle-btn-inactive"
        }`}
      >
        Não
      </button>
    </div>
  </div>
);

interface CheckboxListProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  label,
  options,
  selected,
  onChange,
}) => (
  <div>
    <label className="form-label">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onChange(opt)}
            className="w-4 h-4 rounded border-border bg-input accent-primary"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);
