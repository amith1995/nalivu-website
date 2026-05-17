import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'originStory',
      title: 'Origin Story',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'paragraphs', type: 'array', of: [{ type: 'text' }] },
        { 
          name: 'stats', 
          type: 'array', 
          of: [
            { 
              type: 'object', 
              fields: [
                { name: 'label', type: 'string' },
                { name: 'value', type: 'string' }
              ]
            }
          ] 
        },
        {
          name: 'image',
          type: 'object',
          fields: [
            { name: 'caption', type: 'string' },
            { name: 'subCaption', type: 'string' },
            { name: 'tag', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'values',
      title: 'Mission & Values',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'title', type: 'string' },
        { 
          name: 'items', 
          type: 'array', 
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', description: 'Emoji icon' },
                { name: 'title', type: 'string' },
                { name: 'description', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'foundersHeader',
      title: 'Founders Section Header',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'title', type: 'string' }
      ]
    }),
    defineField({
      name: 'mainFounder',
      title: 'Featured Founder',
      type: 'object',
      fields: [
        { name: 'initials', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'bio', type: 'text' }
      ]
    }),
    defineField({
      name: 'founders',
      title: 'Co-Founders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'initials', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'title', type: 'string', description: 'e.g., Co-founder' },
            { name: 'bio', type: 'text' }
          ]
        }
      ]
    }),
    defineField({
      name: 'whyNalivu',
      title: 'Why Nalivu Section',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        {
          name: 'checks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'detail', type: 'string' }
              ]
            }
          ]
        },
        {
          name: 'glance',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'value', type: 'string' },
                { name: 'highlight', type: 'boolean' }
              ]
            }
          ]
        }
      ]
    })
  ]
})
