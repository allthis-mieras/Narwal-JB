import {CogIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: CogIcon,
  fields: [
    {
      name: 'discoverable',
      type: 'boolean',
      initialValue: true,
    },
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'array',
      name: 'menuLinks',
      title: 'Menu Links',
      of: [{ type: `menuLink` }],
    },
  ],
});