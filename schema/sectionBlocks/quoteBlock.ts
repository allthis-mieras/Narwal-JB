import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'quote',                 // Selecteert de quote als titel
    },
    prepare({ title }) {
      return {
        title: title || 'No Quote',  // Geeft een fallback als er geen quote is
        subtitle: 'Quote Block',        // Stelt de subtitel in als "Quote Block"
      };
    }
  }
});