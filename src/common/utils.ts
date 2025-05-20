/**
 * Common utility functions
 */

export function log(...messages: any[]) {
  if (process.env.LOG_LEVEL === "debug") {
    console.log(...messages);
  }
}

export function processValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }
  
  if (typeof value === 'bigint' || (typeof (value as any).toString === 'function' && typeof (value as any).toJSON === 'undefined')) {
    return value.toString();
  }
  
  if (Array.isArray(value)) {
    return value.map(processValue);
  }
  
  if (typeof value === 'object' && value !== null) {
    const result: { [key: string]: unknown } = {};
    const obj = value as { [key: string]: unknown };
    for (const key in obj) {
      if (typeof obj[key] !== 'function' && !key.startsWith('_') && key !== 'parent' && key !== 'functionInvocationScopes') {
        result[key] = processValue(obj[key]);
      }
    }
    return result;
  }
  
  return value;
}
