import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'


export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
  ],
  
})