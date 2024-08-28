import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'youtube', 'vimeo']}),
    }),
  ],
});