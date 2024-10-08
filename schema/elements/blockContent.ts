import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: "Block Content",
            name: "blockContent",
            type: "array",
            of: [
              defineArrayMember({
                title: "Block",
                type: "block",
                styles: [
                  { title: "H2", value: "h2" },
                  { title: "H3", value: "h3" },
                  { title: "H4", value: "h4" },
                  { title: "H5", value: "h5" },
                  { title: "Normal", value: "p" },
                  { title: "Quote", value: "blockquote" },
                ],
                lists: [
                  { title: "Bullet", value: "bullet" },
                  { title: "Number", value: "number" },
                ],
                marks: {
                  decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                  ],
                  annotations: [
                    {
                      title: "URL",
                      name: "link",
                      type: "object",
                      fields: [
                        {
                          title: "URL",
                          name: "href",
                          type: "url",
                        },
                      ],
                    },
                  ],
                },
              }),
              {
                title: "Image",
                type: "image",
                fields: [
                  {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                  },
                ],
              },
            ],
        
        
})
