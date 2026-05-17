import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Homepage Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Headline',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ]
})
