/**
 * Converts {{=param}} syntax to {{ param }} for compatibility with template engine
 */
export function preprocessTemplate(str) {
  return str.replace(/\{\{=(.+?)\}\}/g, "{{$1}}");
}

/**
 * Simple condition evaluator (for booleans/expressions)
 */
export function evaluateCondition(template, context) {
  const expr = preprocessTemplate(template).replace(/\{\{\s*(\w+)\s*\}\}/g, "$1");
  const fn = new Function(...Object.keys(context), `return ${expr}`);
  return fn(...Object.values(context));
}

/**
 * Simple variable interpolation with strict mode
 * Throws an error if a variable is not found in context
 */
export function renderTemplate(template, context) {
  const preprocessed = preprocessTemplate(template);
  return preprocessed.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    if (!(key in context)) {
      throw new Error(`Unknown template variable: "${key}"`);
    }
    return context[key];
  });
}
