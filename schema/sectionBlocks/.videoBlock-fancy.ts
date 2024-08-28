import { defineType } from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'videoId', // Verwijst naar het videoId-object
    },
  ],
  preview: {
    select: {
      title: 'video.service', // Geeft aan of het YouTube of Vimeo is
      media: 'video.thumbnail', // De thumbnail als media
    },
    prepare({ title, media }) {
      return {
        title: `Video (${title})`,
        media,
      };
    }
  }
});