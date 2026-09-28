// Open positions for the public Careers page (jewettconstruction.com/careers).
//
// HR opens and closes roles by turning options on or off in the "What position
// are you interested in?" dropdown of the HubSpot "Careers" form. A HubSpot form
// shows a chosen subset of its contact property's options, so the property still
// lists closed roles — the form definition is the source of truth.
//
// No imports and type-only TypeScript, so open-positions.test.mjs can load this
// file directly under Node's type stripping.

export const CAREERS_FORM_ID = 'e5503aed-a204-4192-92ed-a9d00bfb96dd';
export const POSITION_FIELD = 'strong_what_position_are_you_interested_in___strong_';

interface FormOption {
  label?: string;
  value?: string;
  displayOrder?: number;
}

interface FormField {
  name?: string;
  options?: FormOption[];
}

export interface FormDefinition {
  fieldGroups?: { fields?: FormField[] }[];
}

// Job titles in the order the form shows them, or null when the form no longer
// has the position field (renamed or removed in HubSpot) so the caller can log
// it instead of silently showing no openings.
export function extractOpenPositions(form: FormDefinition, fieldName: string = POSITION_FIELD): string[] | null {
  const fields = (form?.fieldGroups ?? []).flatMap((group) => group.fields ?? []);
  const field = fields.find((f) => f.name === fieldName);
  if (!field) return null;
  return [...(field.options ?? [])]
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((option) => (option.label ?? option.value ?? '').trim())
    .filter(Boolean);
}
