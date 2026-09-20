import { useState, type FormEvent } from 'react'
import { FiSave, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { mockCategories } from '../../data/categories'
import type { Level } from '../../types/course'
import {
  emptyFormValues,
  type CourseFormValues,
} from './courseFormHelpers'

const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced']

interface CourseFormProps {
  mode: 'create' | 'edit'
  initialValues?: CourseFormValues
  onSubmit: (values: CourseFormValues) => Promise<void> | void
  onCancel?: () => void
  submitting?: boolean
}

interface FormErrors {
  title?: string
  description?: string
  thumbnail?: string
  price?: string
  general?: string
}

const URL_RE = /^https?:\/\/.+/i

export function CourseForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
}: CourseFormProps) {
  const navigate = useNavigate()
  const [values, setValues] = useState<CourseFormValues>(
    initialValues ?? emptyFormValues(),
  )
  const [errors, setErrors] = useState<FormErrors>({})

  function set<K extends keyof CourseFormValues>(
    key: K,
    value: CourseFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!values.title.trim()) e.title = 'Title is required.'
    else if (values.title.trim().length < 8)
      e.title = 'Title must be at least 8 characters.'
    if (!values.description.trim())
      e.description = 'Short description is required.'
    else if (values.description.trim().length < 30)
      e.description = 'Description must be at least 30 characters.'
    if (values.thumbnail && !URL_RE.test(values.thumbnail))
      e.thumbnail = 'Thumbnail must be a valid http(s) URL.'
    if (!values.isFree && values.price <= 0)
      e.price = 'Price must be greater than 0, or mark the course as free.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {errors.general && (
        <div role="alert" className="alert alert-error py-3 text-sm">
          {errors.general}
        </div>
      )}

      {/* Basic info */}
      <section className="card-edulearn space-y-5">
        <h2 className="text-lg font-bold">Basic information</h2>

        <div className="form-control">
          <label htmlFor="cf-title" className="label">
            <span className="label-text font-medium">Title</span>
          </label>
          <input
            id="cf-title"
            type="text"
            value={values.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. Modern React with TypeScript"
            className={`input input-bordered w-full ${
              errors.title ? 'input-error' : ''
            }`}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title}</span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="cf-desc" className="label">
            <span className="label-text font-medium">Short description</span>
            <span className="label-text-alt text-base-content/60">
              {values.description.length}/200
            </span>
          </label>
          <textarea
            id="cf-desc"
            rows={3}
            value={values.description}
            onChange={(e) => set('description', e.target.value.slice(0, 200))}
            placeholder="A one or two sentence summary shown on course cards."
            className={`textarea textarea-bordered w-full ${
              errors.description ? 'textarea-error' : ''
            }`}
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.description}
              </span>
            </label>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="cf-long" className="label">
            <span className="label-text font-medium">
              Long description (optional)
            </span>
          </label>
          <textarea
            id="cf-long"
            rows={5}
            value={values.longDescription}
            onChange={(e) => set('longDescription', e.target.value)}
            placeholder="A detailed description shown on the course page."
            className="textarea textarea-bordered w-full"
          />
        </div>
      </section>

      {/* Media */}
      <section className="card-edulearn space-y-5">
        <h2 className="text-lg font-bold">Media</h2>

        <div className="flex flex-col sm:flex-row gap-5">
          <img
            src={
              values.thumbnail ||
              'https://picsum.photos/seed/placeholder/600/400'
            }
            alt=""
            className="w-full sm:w-48 aspect-video rounded-xl object-cover shrink-0 bg-base-200"
          />
          <div className="flex-1">
            <label htmlFor="cf-thumb" className="label">
              <span className="label-text font-medium">Thumbnail URL</span>
            </label>
            <input
              id="cf-thumb"
              type="url"
              value={values.thumbnail}
              onChange={(e) => set('thumbnail', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={`input input-bordered w-full ${
                errors.thumbnail ? 'input-error' : ''
              }`}
            />
            {errors.thumbnail ? (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.thumbnail}
                </span>
              </label>
            ) : (
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Leave blank to auto-generate a placeholder image.
                </span>
              </label>
            )}
          </div>
        </div>
      </section>

      {/* Classification */}
      <section className="card-edulearn space-y-5">
        <h2 className="text-lg font-bold">Classification</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="form-control">
            <label htmlFor="cf-cat" className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              id="cf-cat"
              value={values.categoryId}
              onChange={(e) => set('categoryId', e.target.value)}
              className="select select-bordered w-full"
            >
              {mockCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="cf-level" className="label">
              <span className="label-text font-medium">Level</span>
            </label>
            <select
              id="cf-level"
              value={values.level}
              onChange={(e) => set('level', e.target.value as Level)}
              className="select select-bordered w-full"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="cf-tags" className="label">
            <span className="label-text font-medium">
              Tags (comma-separated)
            </span>
          </label>
          <input
            id="cf-tags"
            type="text"
            value={values.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="React, TypeScript, Vite"
            className="input input-bordered w-full"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="card-edulearn space-y-5">
        <h2 className="text-lg font-bold">Pricing</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.isFree}
            onChange={(e) => set('isFree', e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="font-medium">Make this course free</span>
        </label>

        {!values.isFree && (
          <div className="form-control">
            <label htmlFor="cf-price" className="label">
              <span className="label-text font-medium">Price (USD)</span>
            </label>
            <input
              id="cf-price"
              type="number"
              min={0}
              step={0.01}
              value={values.price}
              onChange={(e) => set('price', Number(e.target.value))}
              className={`input input-bordered w-full max-w-xs ${
                errors.price ? 'input-error' : ''
              }`}
            />
            {errors.price && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.price}
                </span>
              </label>
            )}
          </div>
        )}
      </section>

      {/* Outcomes + Requirements */}
      <section className="card-edulearn grid sm:grid-cols-2 gap-5">
        <div className="form-control">
          <label htmlFor="cf-outcomes" className="label">
            <span className="label-text font-medium">
              What students will learn
            </span>
            <span className="label-text-alt text-base-content/60">
              One per line
            </span>
          </label>
          <textarea
            id="cf-outcomes"
            rows={6}
            value={values.outcomes}
            onChange={(e) => set('outcomes', e.target.value)}
            placeholder={'Build real projects\nMaster core concepts\nWrite production code'}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="cf-req" className="label">
            <span className="label-text font-medium">Requirements</span>
            <span className="label-text-alt text-base-content/60">
              One per line
            </span>
          </label>
          <textarea
            id="cf-req"
            rows={6}
            value={values.requirements}
            onChange={(e) => set('requirements', e.target.value)}
            placeholder={'A computer with internet\nNo prior experience needed'}
            className="textarea textarea-bordered w-full"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="btn btn-ghost"
          disabled={submitting}
        >
          <FiX /> Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Saving…
            </>
          ) : (
            <>
              <FiSave />
              {mode === 'create' ? 'Create course' : 'Save changes'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}