import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'volunteerApplication',
  title: 'Volunteer Applications',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', type: 'string' }),
    defineField({ name: 'lastName', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'date', type: 'string', title: 'Availability Date' }),
    defineField({ name: 'hours', type: 'string', title: 'Hours per Week' }),
    defineField({ name: 'interests', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'submittedAt', type: 'datetime', initialValue: () => new Date().toISOString() })
  ]
})
