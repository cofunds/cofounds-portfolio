/**
 * Template Registry
 *
 * Central registry for all portfolio templates. This file manages template
 * selection and provides a fallback mechanism for invalid template IDs.
 */

import Template01 from "./template-01";
import Template02 from "./template-02";

/**
 * Template interface defining the structure of a template entry
 */
export interface Template {
  id: string;
  name: string;
  component: React.ComponentType<any>;
}

/**
 * Registry of all available templates
 *
 * Add new templates here by importing them and adding to this object.
 * The key should match the template ID from the API.
 */
export const TEMPLATES: Record<string, Template> = {
  "template-01": {
    id: "template-01",
    name: "Classic Portfolio",
    component: Template01,
  },
  "template-02": {
    id: "template-02",
    name: "Modern Portfolio",
    component: Template02,
  },
};

/**
 * Get a template by ID
 *
 * @param templateId - The ID of the template to retrieve
 * @returns The template object containing component and config, or undefined if not found
 *
 * @example
 * const template = getTemplate('template-02');
 * if (template) {
 *   const TemplateComponent = template.component;
 * }
 */
export function getTemplate(templateId?: string): Template | undefined {
  // If no template ID provided, return undefined
  if (!templateId) {
    return;
  }

  // Return requested template or undefined if not found
  return TEMPLATES[templateId];
}

/**
 * Get list of all available template IDs
 *
 * @returns Array of template IDs
 */
export function getAvailableTemplateIds(): string[] {
  return Object.keys(TEMPLATES);
}

/**
 * Check if a template ID exists
 *
 * @param templateId - The template ID to check
 * @returns True if template exists, false otherwise
 */
export function templateExists(templateId: string): boolean {
  return templateId in TEMPLATES;
}

/**
 * Get all templates with their metadata
 *
 * @returns Array of template objects
 */
export function getAllTemplates(): Template[] {
  return Object.values(TEMPLATES);
}
