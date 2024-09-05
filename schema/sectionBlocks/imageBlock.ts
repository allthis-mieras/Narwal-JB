import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Voor betere controle over het focuspunt van afbeeldingen
      },
      
      
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption for the image',
    }),
  ],
  preview: {
    select: {
      title: 'alt',                 // Selecteert de alt-tekst als titel
      media: 'image',               // Selecteert de afbeelding voor de thumbnail
    },
    prepare({ title, media }) {
      return {
        title: title || 'No Alt Text',  // Geeft een fallback als er geen alt-tekst is
        subtitle: 'Image Block',        // Stelt de subtitel in als "Image Block"
        media,                          // Stelt de afbeelding in als thumbnail
      };
    }
  }
});